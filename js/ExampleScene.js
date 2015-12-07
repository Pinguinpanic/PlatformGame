ExampleScene = function()
{
    PIXI.DisplayObjectContainer.call(this);

    this.drawables=[];

    FileHandling.loadMap("fun",function(map) {ExampleScene.map=map});
    this.loadResources();
};

ExampleScene.constructor = ExampleScene;
ExampleScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

/**
 * Load all the resources needed in this scene, calling doneLoading afterwards
 */
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

/**
 * Start the scene, this happens after it's done loading the resources so it doesn't try to draw stuff that isn't there
 * yet.
 */
ExampleScene.prototype.doneLoading = function()
{
    //Setup the scene very ugly here
    main.currentMap = new Map(ExampleScene.map, this);
	spawn = main.currentMap.getSpawnPoint();
	this.guy = new Guy(spawn[0] * 32 + 16, (spawn[1] + 1) * 32, this.guyCallback.bind(this));
    this.addDrawable(this.guy);

    this.prevTime=Date.now();
    this.mainLoop();
};

ExampleScene.prototype.guyCallback = function(eventType, x, y)
{
	switch(eventType)
	{
		case "death":
			alert("you died loser");
			this.guy.resetToSpawn();
			break;
		case "finish":
			alert("look at you being all awesome and shit, nice!");
			this.guy.resetToSpawn();
			break;
		default:
			console.warn("Unhandled event occured: '" + eventType + "'");
			break;
	}
};

/**
 * Do the main loop bwoop bwoop.
 */
ExampleScene.prototype.mainLoop = function()
{
    window.setTimeout(this.mainLoop.bind(this),1000/Main.FPS);
    var now=Date.now();
    var deltaTime=(now-this.prevTime);
    //Make sure deltatime is at least 1ms to prevent divide by zero errors
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

/**
 * Add a drawable object to this scene. Adding it to the DisplayObjectTree and to the update loop.
 * @param drawable
 * @returns {boolean}
 */
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