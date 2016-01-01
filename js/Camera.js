
Camera = function()
{
    this.viewPortX=0;
    this.viewPortY=0;
    this.xShake=0;
    this.yShake=0;

    this.curX=0;
    this.curY=0;

    this.angle=0;

    this.scene=null;
};

Camera.instance=null;

Camera.getInstance = function()
{
    if(Camera.instance==null)
    {
        Camera.instance=new Camera();
    }
    return Camera.instance;
};

Camera.DAMPENING=0.9;

Camera.prototype.setFocus = function(scene)
{
    this.scene=scene;
};

Camera.prototype.setViewPort = function(viewPortX,viewPortY)
{
    this.viewPortX=viewPortX;
    this.viewPortY=viewPortY;
};

Camera.prototype.setAngle = function(angle)
{
    this.angle=angle;
}

Camera.prototype.shake = function (xShake,yShake)
{
    this.xShake=xShake;
    this.yShake=yShake;
};

Camera.prototype.shakeAdd = function (xShake,yShake)
{
    this.xShake+=xShake;
    this.yShake+=yShake;
};

Camera.prototype.update = function()
{
    this.xShake*=Camera.DAMPENING;
    this.yShake*=Camera.DAMPENING;

    this.curX=-this.xShake+Math.random()*2*this.xShake;
    this.curY=-this.yShake+Math.random()*2*this.yShake;

    this.scene.x=-this.getViewPortX();
    this.scene.y=-this.getViewPortY();
    this.scene.rotation=this.angle;
};

Camera.prototype.getViewPortX = function()
{
    return Math.floor(this.viewPortX+this.curX+.5) | 0;
};
Camera.prototype.getViewPortY = function()
{
    return Math.floor(this.viewPortY+this.curY +.5) | 0;
};

Camera.prototype.translate = function(x,y)
{
    this.viewPortX+=x;
    this.viewPortY+=y;
};