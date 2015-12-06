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
    }
    return "nothing";
};