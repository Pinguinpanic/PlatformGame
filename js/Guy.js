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
    this.count = 0;

    //Movement variables
    this.hspeed=0.0;
    this.vspeed=0.0;
    this.dashkey=0;
    this.dashtime=Guy.DASHTIMEOUT;
    this.doublejump=false;

    this.texture = PIXI.Texture.fromFrame("guy.png");
    this.pivot = {x:0.5*this.width,y:this.height-1};
};
Guy.constructor = Guy;
Guy.prototype = Object.create(PIXI.Sprite.prototype);

Guy.WIDTH = 10;
Guy.HEIGHT = 18;

Guy.DASHTIMEOUT = 10;
Guy.SPEED=10;
Guy.DASHIMPULSE=40;
Guy.JUMPIMPULSE=10;
Guy.POUNDIMPULSE=0.3;
Guy.GRAVITY=0.5;

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


    this.guyPhysics();

    //Little magic number hocusp ocus for that smooth camera
    var cam=Camera.getInstance();
    cam.setViewPort(
        (cam.viewPortX*4+this.x-Main.SCREENWIDTH/2)/5+this.hspeed*1.5,
        (cam.viewPortY*4+this.y-Main.SCREENHEIGHT/2)/5+this.vspeed*1.5
    );
    cam.setAngle(((cam.angle*6- (.6*sign(this.hspeed)*Math.sqrt(Math.abs(this.hspeed))))/7)*-0.17);

};
Guy.prototype.guyPhysics = function()
{
    //Guy.DASHTIMEOUT = 20;
    //Guy.SPEED=10;
    //Guy.JUMPIMPULSE=10;
    //Guy.POUNDIMPULSE=0.3;
    //Guy.GRAVITY=0.5;
    //
    //this.hspeed=0.0;
    //this.vspeed=0.0;
    //this.dashkey=0;
    //this.doublejump=false;
    var kh=KeyHandler.getInstance();

    this.dashtime+=1;

    if(!this.checkInWall(this.x,this.y + 1))
    {
        console.log("Gravity");
        this.vspeed+=Guy.GRAVITY;

        //Downward movement thing
        if((kh.isPressed(KeyHandler.S) || kh.isPressed(KeyHandler.DOWN)) && !this.dead)
        {
            this.vspeed+=Guy.POUNDIMPULSE;
        }

        if(!this.checkInWall(this.x,this.y+this.vspeed))
        {
            this.y+=this.vspeed;
        }
        else
        {
            this.y=Math.floor(this.y);
            var checkStep = sign(this.vspeed);
            while(!this.checkInWall(this.x,this.y+checkStep))
            {
                this.y+=checkStep;
            }
            this.vspeed=0;
        }
    }
    else
    {
        this.doublejump=true;
        this.vspeed=0;
        //HACKS HACKS Make sure we hit the ground TODO: FIX
        this.y-=1;
        while(!this.checkInWall(this.x,this.y+1))
        {
            this.y++;
        }
    }

    //Don't go here if we're dead
    if(this.dead)
    {
        kh.justReset();
        return;
    }
    //DO Impulse
    if(kh.justPressed(KeyHandler.D) || kh.justPressed(KeyHandler.RIGHT)) {
        console.log("Click registered");
        if (this.dashtime < Guy.DASHTIMEOUT && this.dashkey == 1)
        {
            this.hspeed+=Guy.DASHIMPULSE;
            //TODO: ADD EVENT COUNTER AND GFX

            console.log("Dash");
        }
        this.dashtime = 0;
        this.dashkey = 1;
    }
    if(kh.justPressed(KeyHandler.A) || kh.justPressed(KeyHandler.LEFT)) {
        console.log("Click registered");
        if (this.dashtime < Guy.DASHTIMEOUT && this.dashkey == -1)
        {
            this.hspeed-=Guy.DASHIMPULSE;
            //TODO: ADD EVENT COUNTER AND GFX

            console.log("Dash");
        }
        this.dashtime = 0;
        this.dashkey = -1;
    }

    if(kh.isPressed(KeyHandler.D)||kh.isPressed(KeyHandler.RIGHT))
    {
        this.hspeed=(Guy.SPEED+this.hspeed*3)/4;
        this.scale={x:1,y:1};
    }
    else if(kh.isPressed(KeyHandler.A)||kh.isPressed(KeyHandler.LEFT))
    {
        this.hspeed=(-Guy.SPEED+this.hspeed*3)/4;
        this.scale={x:-1,y:1};
    }
    else
    {
        //Do friction
        this.hspeed*=0.6;
        if(Math.abs(this.hspeed)<.5)
        {
            this.hspeed=0;
        }
    }
    if(!this.checkInWall(this.x+this.hspeed,this.y))
    {
        this.x+=this.hspeed;
    }
    else
    {
        console.log("Hit wall");
        this.x=Math.floor(this.x);
        var checkStep = sign(this.hspeed);
        while(!this.checkInWall(this.x+checkStep,this.y))
        {
            this.x+=checkStep;
        }
        this.hspeed=0;
    }

    if(kh.justPressed(KeyHandler.W) || kh.justPressed(KeyHandler.UP) || kh.justPressed(KeyHandler.SPACE))
    {
        if(!this.checkInWall(this.x,this.y+1) && this.doublejump)
        {
            this.doublejump=false;
            this.vspeed=-Guy.JUMPIMPULSE*.9;
            this.y-=1;
            //TODO: EVENT COUNTER AND GFX
        }
        else if(this.checkInWall(this.x,this.y+1))
        {
            this.vspeed=-Guy.JUMPIMPULSE
            this.y-=1;
            this.doublejump=true;
            //TODO: EVENT COUNTER AND GFX;
        }
    }


    kh.justReset();
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