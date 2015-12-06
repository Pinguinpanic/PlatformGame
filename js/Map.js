function Map(mapArray, scene)
{

    instance=null;
    
    data = [];
    //MORE CODE AFTER LOCAL INITIALIZATION!!!!!!!!!!!!!!!!!!!!!!!!

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
     * @param mapArray
     */
    this.parseMap=function(mapArray)
    {
		this.mapSizeY = mapArray.length;
		this.mapSizeX = mapArray[0].length;
        for(var x = 0; x < this.mapSizeX; x++)
        {
            data[x] = [];
            for(var y = 0; y < this.mapSizeY; y++)
            {
                data[x][y] = new MapTile(x * 32, y * 32, Map.encode(mapArray[y][x]));
                scene.addDrawable(data[x][y]);
            }
        }
    };

    this.parseMap(mapArray);
}

Map.encode = function(char)
{
    switch(char)
    {
        case 'X':
            return "wall";
    }
    return "nothing";
};