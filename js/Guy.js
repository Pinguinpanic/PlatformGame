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
    
    this.hspeed=0.0;
    this.vspeed=0.0;

    this.texture = PIXI.Texture.fromFrame("guy.png");
    this.pivot = {x:0.5*this.width,y:this.height};
};
Guy.constructor = Guy;
Guy.prototype = Object.create(PIXI.Sprite.prototype);


/**
 * The Guy's update loop.
 * @param mult
 */
Guy.prototype.update = function(mult)
{
	// Check whether we're dead or finish.
	if(this.checkDeadly(this.x, this.y))
	{
		this.callback("death", this.x, this.y);
	}
	
	if(this.checkFinish(this.x, this.y))
	{
		this.callback("finish", this.x, this.y);
	}
	
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
    if(KeyHandler.getInstance().isPressed(KeyHandler.W) || KeyHandler.getInstance().isPressed(KeyHandler.UP))
    {
        if(this.checkOnWall(this.x, this.y))
        {
            this.vspeed=-350;
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

Guy.prototype.resetToSpawn = function()
{
	this.x = this.spawnX;
	this.y = this.spawnY;
	
	this.hspeed = 0;
	this.vspeed = 0;
}

Guy.prototype.checkDeadly = function(x, y)
{
	return main.currentMap.pixelDeadly(x - this.width/2, y) 
            || main.currentMap.pixelDeadly(x + this.width/2, y) 
            || main.currentMap.pixelDeadly(x - this.width/2, y - this.height) 
            || main.currentMap.pixelDeadly(x + this.width/2, y - this.height);
}

Guy.prototype.checkFinish = function(x, y)
{
	return main.currentMap.pixelFinish(x - this.width/2, y) 
            || main.currentMap.pixelFinish(x + this.width/2, y) 
            || main.currentMap.pixelFinish(x - this.width/2, y - this.height) 
            || main.currentMap.pixelFinish(x + this.width/2, y - this.height);
}

Guy.prototype.checkInWall = function(x, y)
{
    return main.currentMap.pixelInWall(x - this.width/2, y) 
            || main.currentMap.pixelInWall(x + this.width/2, y) 
            || main.currentMap.pixelInWall(x - this.width/2, y - this.height) 
            || main.currentMap.pixelInWall(x + this.width/2, y - this.height);
}

Guy.prototype.checkOnWall = function(x, y)
{
    return main.currentMap.pixelInWall(x - this.width/2, y + 1) || main.currentMap.pixelInWall(x + this.width/2, y + 1);
}