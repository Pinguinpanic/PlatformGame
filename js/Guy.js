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
    if(KeyHandler.getInstance().isPressed(68))
    {
        this.hspeed=100;
        this.scale={x:1,y:1};
    }
    if(KeyHandler.getInstance().isPressed(65))
    {
        this.hspeed=-100;
        this.scale={x:-1,y:1};
    }
    if(KeyHandler.getInstance().isPressed(87))
    {
        if(this.y>=400)
        {
            this.vspeed=-350;
        }
    }
    //Friction
    this.hspeed*=Math.pow(.1,mult);
    //Gravity
    this.vspeed+=mult*500;

    //Actual movement
    this.x+=this.hspeed*mult;
    this.y+=this.vspeed*mult;

    if(this.y>400)
    {
        this.y=400;
        this.vspeed=0;
    }
};
