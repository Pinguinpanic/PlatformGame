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
        this.hspeed=4
    }
    if(KeyHandler.getInstance().isPressed(65))
    {
        this.hspeed=-4;
    }
    this.hspeed*=Math.pow(.5,mult);
    this.x+=this.hspeed;
    this.y+=this.vspeed;
};
