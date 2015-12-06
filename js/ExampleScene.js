ExampleScene = function()
{
    PIXI.DisplayObjectContainer.call(this);

    this.drawables=[];

    this.loadResources();
};

ExampleScene.constructor = ExampleScene;
ExampleScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

ExampleScene.prototype.loadResources = function()
{
    //Set Assets to Load
    var assetsToLoad = ['resources/Main.json'];

    //Set Scaling mode for graphics
    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
    //Setup loader with given assets and doneLoading on complete
    var loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.doneLoading.bind(this);
    //Load that shit!
    loader.load();
};

ExampleScene.prototype.doneLoading = function()
{
    //Setup the scene very ugly here
    this.addDrawable(new Guy(50,50));

    this.prevTime=Date.now();
    this.mainLoop();
};

ExampleScene.prototype.mainLoop = function()
{
    window.setTimeout(this.mainLoop.bind(this),1000/Main.FPS);
    var now=Date.now();
    var deltaTime=(now-this.prevTime);
    //Make sure deltatime is at least 1 to prevent divide by zero errors
    deltaTime=Math.max(deltaTime,1);
    //Translate to seconds from ms
    deltaTime/=1000.0;
    this.prevTime=Date.now();

    for(d in this.drawables)
    {
        this.drawables[d].update(deltaTime);
    }

    Main.render();
};

ExampleScene.prototype.addDrawable=function(drawable)
{
    if(isIn(drawable,this.drawables))
    {
        return false;
    }
    this.drawables.push(drawable);
    this.addChild(drawable);
    return true;
};