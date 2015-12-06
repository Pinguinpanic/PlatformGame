Guy = function (x,y)
{
    PIXI.Sprite.call(this);
    this.x=x;
    this.y=y;

    this.texture = PIXI.Texture.fromFrame("guy.png");
};
Guy.constructor = Guy;
Guy.prototype = Object.create(PIXI.Sprite.prototype);

Guy.prototype.update = function(mult)
{
    this.x+=10*mult;
};