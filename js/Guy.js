/**
 * This is the guy, he inherits from Sprite.
 * @param x
 * @param y
 * @constructor 
 */
Guy = function (x,y)
{
    PIXI.Sprite.call(this);
    this.x=x;
    this.y=y;
    
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