function MapTile(x, y, type)
{
    PIXI.Sprite.call(this);
    
    this.x = x;
    this.y = y;
    this.type = type;
    
    if(this.type != "")
    {
        this.texture = PIXI.Texture.fromFrame(this.type + ".png");
    }
    
    this.update = function()
    {}
}

MapTile.constructor = MapTile;
MapTile.prototype = Object.create(PIXI.Sprite.prototype);