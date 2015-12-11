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
	this.dashState = false;
	this.dashDirection = "";
	this.dashTimeout = null;
	
	this.count = 0;
	
    this.hspeed=0.0;
    this.vspeed=0.0;

    this.texture = PIXI.Texture.fromFrame("guy.png");
    this.pivot = {x:0.5*this.width,y:this.height};
};
Guy.constructor = Guy;
Guy.prototype = Object.create(PIXI.Sprite.prototype);

Guy.WIDTH = 10;
Guy.HEIGHT = 18;
Guy.DASHTIMEOUT = 100;

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
			if(this.dashDirection == "left")
			{
				this.dashState = 0;
			}
			
			if(this.dashState == 0 || this.dashState == 1)
			{
				this.hspeed=100;
				this.scale={x:1,y:1};
				
				this.dashDirection = "right";
				this.dashState = 1;
			}
			else if(this.dashState == 2 && this.dashDirection == "right")
			{
				this.dashDirection = "";
				this.hspeed = 2500;
				this.dashState = 3;
				this.counter++;
				
				if(this.dashTimeout != null)
				{
					clearTimeout(this.dashTimeout);
					this.dashTimeout = null;
				}
			}
			else if(this.dashState == 3 && this.hspeed < 100)
			{
				this.hspeed=100;
			}
		}
		else if(KeyHandler.getInstance().isPressed(KeyHandler.A) || KeyHandler.getInstance().isPressed(KeyHandler.LEFT))
		{
			if(this.dashDirection == "right")
			{
				this.dashState = 0;
			}
			
			if(this.dashState == 0 || this.dashState == 1)
			{
				this.hspeed=-100;
				this.scale={x:-1,y:1};
				
				this.dashDirection = "left";
				this.dashState = 1;
			}
			else if(this.dashState == 2 && this.dashDirection == "left")
			{
				this.dashDirection = "";
				this.hspeed = -2500;
				this.dashState = 3;
				this.counter++;
				
				if(this.dashTimeout != null)
				{
					clearTimeout(this.dashTimeout);
					this.dashTimeout = null;
				}
			}
			else if(this.dashState == 3 && this.hspeed > -100)
			{
				this.hspeed=-100;
			}
		}
		else if(this.dashState == 1)
		{
			this.dashState = 2;
			if(this.dashTimeout == null)
			{
				this.dashTimeout = setTimeout(function() {
					this.dashState = 0;
					this.dashTimeout = null;
				}.bind(this), Guy.DASHTIMEOUT);
			}
		}
		else if(this.dashState == 3)
		{
			this.dashState = 0;
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
				this.counter++;
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