function Main()
{

}
Main.instance=null;

Main.getInstance = function()
{
    if(Main.instance==null)
    {
        Main.instance=new Main();
    }
    return Main.instance;
};


Main.SCREENWIDTH=800;
Main.SCREENHEIGHT=800;

Main.FPS=30;

/**
 * Start the Main thing.
 */
Main.prototype.start=function()
{
    this.stage = new PIXI.Stage(0xFFFFFF,true);

    this.renderer = PIXI.autoDetectRenderer(Main.SCREENWIDTH, Main.SCREENHEIGHT);
    document.body.appendChild(this.renderer.view);

    this.container = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.container);

    //Ugly Add of scene
    this.container.addChild(new ExampleScene());
};

/**
 * Render everything on the current screen.
 */
Main.render = function()
{
    var main=Main.getInstance();
    main.renderer.render(main.stage);
};
/*
$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	//Lets save the cell width in a variable for easy control
	var cw = 16;
	var bw = w/cw;
	var bh = h/cw;

	var up = false;
	var left = false;
	var right = false;
	var down = false;
	var space=false;

	var player = {x: 20, y:20 , hspeed: 0.0, vspeed:0.0};
	var gravity=0.8;
	var groundfriction=0.4;
	var airfriction=0.05;
	var jumpimpulse=15;
	var runspeed=10;
	var halftime=8;

	var blocks=[];

	function init()
	{
		//Create Loop
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 30);

		initMap();
	}
	init();

	function initMap()
	{
		for(var i=0;i<100;i++)
		{
			blocks.push({
				x:Math.round(Math.random()*(w-cw)/cw)*cw,
				y:Math.round(Math.random()*(h-cw)/cw)*cw,
				pulsing:false
			});
		}

	}


	function paint()
	{
		//Draw canvas
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		playerPhysics();
		drawPlayer()

		drawMap();

		ctx.fillStyle = "black";
		ctx.fillText(up+","+left+","+right+","+down,0,h-30);

	}

	function playerPhysics()
	{
		//input
		if(right)
		{
			player.hspeed+=(runspeed-player.hspeed)/(halftime);
		}
		if(left)
		{
			player.hspeed+=(-runspeed-player.hspeed)/(halftime);
		}
		if(up && onGround(player.x,player.y))
		{
			player.vspeed=-((Math.abs(player.hspeed)/runspeed)*.25*jumpimpulse+jumpimpulse*.75);
		}

		//GRAVITY BITCH
		player.vspeed+=gravity;

		//Friction
		if(player.hspeed>= groundfriction)
		{
			if(onGround(player.x,player.y))
			{
				player.hspeed-=groundfriction;
			}
			player.hspeed-=airfriction;
		}
		else if(player.hspeed<=-groundfriction)
		{
			if(onGround(player.x,player.y))
			{
				player.hspeed+=groundfriction;
			}
			player.hspeed+=airfriction;
		}
		else
		{
			player.hspeed=0;
		}
		//Movement
		if(!inWallFixed(player.x+player.hspeed,player.y))
		{
			player.x+=player.hspeed;
		}
		else
		{
			var step;
			var steps;
			step=sign(player.hspeed);
			steps=0;
			while(!inWallFixed(player.x+steps,player.y))
			{
				steps+=step;
			}
			player.x+=steps-step;
			player.hspeed=0;
		}
		//Y
		if(!inWallFixed(player.x,player.y+player.vspeed))
		{
			player.y+=player.vspeed;
		}
		else
		{
			var step;
			var steps;
			step=sign(player.vspeed);
			steps=0;
			while(!inWallFixed(player.x,player.y+steps))
			{
				steps+=step;
			}
			steps-=step;
			player.y+=steps;
			player.vspeed=0;
		}
	}
	function inWallFixed(x,y)
	{
		return inWallSquare(x,y,x+cw,y+cw);
	}
	function inWallSquare(x,y,x2,y2)
	{
		return(inWall(x,y) || inWall(x,y2) || inWall(x2,y) || inWall(x2,y2));
	}
	function inWall(x , y)
	{
		for(var i=0; i<blocks.length; i++)
		{
			var b;
			b=blocks[i];
			if(x>=b.x && x<=b.x+cw && y>=b.y && y<=b.y+cw)
			{
				return true;
			}
		}
		return(x>w || x<0 || y>h || y<0);
	}
	function onGround(x , y)
	{
		return(inWallFixed(x,y+1));
	}
	function drawPlayer()
	{
		ctx.fillStyle = "red";
		ctx.fillRect(player.x, player.y, cw, cw);
	}
	function drawMap()
	{
		for(var i=0; i<blocks.length; i++)
		{
			paint_cell(blocks[i].x,blocks[i].y,"orange");
		}
	}
	//Lets first create a generic function to paint cells
	function paint_cell(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x, y, cw, cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x, y, cw, cw);
	}

	function sign(x)
	{
		return(x/Math.abs(x));
	}

	//Keydown
	$(document).keydown(function(e)
	{
		var key = e.which;
		if(key == "37") left = true;
		else if(key == "38") up = true;
		else if(key == "39") right = true;
		else if(key == "40") down = true;
		else if(key == "32")
		{
			gravity=gravity*-1;
		}
	})
	//Keydown
	$(document).keyup(function(e)
	{
		var key = e.which;
		if(key == "37") left = false;
		else if(key == "38") up = false;
		else if(key == "39") right = false;
		else if(key == "40") down = false;
	})



})
*/