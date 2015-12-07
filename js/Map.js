function Map(mapArray, scene)
{
    this.getMapTile = function(x, y)
    {
        return data[x][y];
    };

    this.checkWithinBounds = function(x, y)
    {
        return !(x < 0 || x >= this.mapSizeX || y < 0 || y >= this.mapSizeY);
    };
    
    /**
     * Checks whether the given pixel is within a wall
     * @param {type} realX
     * @param {type} realY
     * @returns {Boolean}
     */
    this.pixelInWall = function(realX, realY)
    {
       mapX = Math.floor(realX / 32);
       mapY = Math.floor(realY / 32);
       
       if(!this.checkWithinBounds(mapX, mapY))
       {
           return true;
       }
       
       return data[mapX][mapY].type == "wall";
    };
	
	/**
	 * Checks whether the given pixel is deadly, i.e. whether you are killed when you are at this point.
	 * Currently only checks for spike, later it might also check for, for instance, being too low or other deadly objects
	 * @param {type} realX
	 * @param {type} realY
	 * @returns {Boolean}
	 */
	this.pixelDeadly = function(realX, realY)
	{
       mapX = Math.floor(realX / 32);
       mapY = Math.floor(realY / 32);
       
       if(!this.checkWithinBounds(mapX, mapY))
       {
           return true;
       }
       
       return data[mapX][mapY].type == "spike";
	}
	
	/**
	 * Checks whether the given pixel is the finish
	 * Currently only checks for spike, later it might also check for, for instance, being too low or other deadly objects
	 * @param {type} realX
	 * @param {type} realY
	 * @returns {Boolean}
	 */
	this.pixelFinish = function(realX, realY)
	{
       mapX = Math.floor(realX / 32);
       mapY = Math.floor(realY / 32);
       
       if(!this.checkWithinBounds(mapX, mapY))
       {
           return true;
       }
       
       return data[mapX][mapY].type == "finish";
	}

    /**
     * Prase an array of a map
     * @param mapData
     */
    this.parseMap=function(mapData)
    {
		this.mapSizeY = mapData.mapSize[1];
		this.mapSizeX = mapData.mapSize[0];
        for(var x = 0; x < this.mapSizeX; x++)
        {
            data[x] = [];
            for(var y = 0; y < this.mapSizeY; y++)
            {
                data[x][y] = new MapTile(x * 32, y * 32, Map.encode(mapData[y][x]));
				if(mapData[y][x] == 'S')
				{
					if(spawnPoint != null)
					{
						console.error("Spawnpoint already set!");
						continue;
					}
					
					spawnPoint = [x, y];
				}
				
                scene.addDrawable(data[x][y]);
            }
        }
		
		if(spawnPoint == null)
		{
			console.error("Spawnpoint not set!");
		}
    };
	
	this.getSpawnPoint = function()
	{
		return spawnPoint;
	}
	
	// INITIALIZATION
    data = [];
	spawnPoint = null;

    this.parseMap(mapArray);
}

Map.encode = function(char)
{
    switch(char)
    {
        case 'X':
            return "wall";
		case 'P':
			return "spike";
		case 'F':
			return "finish";
		case 'S':
			return "nothing"; //return "spawn" <- when texture has been added
		case '.':
			return "nothing";
		default:
			console.warn("Unknown character encountered in map: " + char);
			return "nothing";
    }
};