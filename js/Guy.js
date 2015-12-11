/**
 * This is the guy, he inherits from Sprite.
 * @param x
 * @param y
 * @constructor 
 */
Guy = function (spawnX,spawnY, callback)
{
    PIXI.Sprite.call(this);
	this.spawnX = spawnX;
	this.spawnY = spawnY;
    this.x=spawnX;
    this.y=spawnY;
	this.callback = callback;
	
	this.dead = false;
	this.jumpReleased = true;
	this.doubleJumped = false;
    
    this.hspeed=0.0;
    this.vspeed=0.0;

    this.texture = PIXI.Texture.fromFrame("guy.png");
    this.pivot = {x:0.5*this.width,y:this.height};
};
Guy.constructor = Guy;
Guy.prototype = Object.create(PIXI.Sprite.prototype);

Guy.WIDTH = 10;
Guy.HEIGHT = 18;

/**
 * The Guy's update loop.
 * @param mult
 */
Guy.prototype.update = function(mult)
{
	// Check whether we're dead or finish.
	if(!this.dead && this.checkDeadly(this.x, this.y))
	{
		this.dead = true;
		this.callback("death", this.x, this.y);
	}
	
	if(this.checkFinish(this.x, this.y))
	{
		this.callback("finish", this.x, this.y);
	}
	
	if(!this.dead)
	{
		if(KeyHandler.getInstance().isPressed(KeyHandler.D) || KeyHandler.getInstance().isPressed(KeyHandler.RIGHT))
		{
			this.hspeed=100;
			this.scale={x:1,y:1};
		}
		if(KeyHandler.getInstance().isPressed(KeyHandler.A) || KeyHandler.getInstance().isPressed(KeyHandler.LEFT))
		{
			this.hspeed=-100;
			this.scale={x:-1,y:1};
		}
		
		if(this.checkOnWall(this.x, this.y))
		{
			this.doubleJumped = false;
		}
		
		if(this.jumpReleased && (KeyHandler.getInstance().isPressed(KeyHandler.W) || KeyHandler.getInstance().isPressed(KeyHandler.UP)))
		{
			this.jumpReleased = false;
			if(this.checkOnWall(this.x, this.y))
			{
				this.vspeed=-350;
				this.doubleJumped = false;
			}
			else if(!this.doubleJumped)
			{
				this.vspeed=-350;
				this.doubleJumped = true;
			}
		}
		
		if(!this.jumpReleased && !(KeyHandler.getInstance().isPressed(KeyHandler.W) || KeyHandler.getInstance().isPressed(KeyHandler.UP)))
		{
			this.jumpReleased = true;
		}
	}
	
    //Friction
    this.hspeed*=Math.pow(.1,mult);
    //Gravity
    this.vspeed+=mult*500;

    // Collision checking
    if(!this.checkInWall(this.x+this.hspeed * mult,this.y))
    {
            this.x+=this.hspeed * mult;
    }
    else
    {
            var step;
            var steps;
            step=sign(this.hspeed);
            steps=0;
            while(!this.checkInWall(this.x+steps,this.y))
            {
                    steps+=step;
            }
            this.x+=steps-step;
            this.hspeed=0;
    }
    
    if(!this.checkInWall(this.x,this.y + this.vspeed * mult))
    {
            this.y+=this.vspeed * mult;
    }
    else
    {
            var step;
            var steps;
            step=sign(this.vspeed);
            steps=0;
            while(!this.checkInWall(this.x,this.y+steps))
            {
                    steps+=step;
            }
            this.y+=steps-step;
            this.vspeed=0;
    }
};

Guy.prototype.respawn = function()
{
	this.x = this.spawnX;
	this.y = this.spawnY;
	
	this.hspeed = 0;
	this.vspeed = 0;
	
	this.dead = false;
}

Guy.prototype.checkDeadly = function(x, y)
{
	return main.currentMap.pixelDeadly(x - Guy.WIDTH/2, y) 
            || main.currentMap.pixelDeadly(x + Guy.WIDTH/2, y) 
            || main.currentMap.pixelDeadly(x - Guy.WIDTH/2, y - Guy.HEIGHT) 
            || main.currentMap.pixelDeadly(x + Guy.WIDTH/2, y - Guy.HEIGHT);
}

Guy.prototype.checkFinish = function(x, y)
{
	return main.currentMap.pixelFinish(x - Guy.WIDTH/2, y) 
            || main.currentMap.pixelFinish(x + Guy.WIDTH/2, y) 
            || main.currentMap.pixelFinish(x - Guy.WIDTH/2, y - Guy.HEIGHT) 
            || main.currentMap.pixelFinish(x + Guy.WIDTH/2, y - Guy.HEIGHT);
}

Guy.prototype.checkInWall = function(x, y)
{
    return main.currentMap.pixelInWall(x - Guy.WIDTH/2, y) 
            || main.currentMap.pixelInWall(x + Guy.WIDTH/2, y) 
            || main.currentMap.pixelInWall(x - Guy.WIDTH/2, y - Guy.HEIGHT) 
            || main.currentMap.pixelInWall(x + Guy.WIDTH/2, y - Guy.HEIGHT);
}

Guy.prototype.checkOnWall = function(x, y)
{
    return main.currentMap.pixelInWall(x - Guy.WIDTH/2, y + 1) || main.currentMap.pixelInWall(x + Guy.WIDTH/2, y + 1);
}