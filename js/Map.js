function Map(mapSizeX, mapSizeY, scene)
{
    this.mapSizeX = mapSizeX;
    this.mapSizeY = mapSizeY;
    
    instance=null;
    
    data = [];
    for(x = 0; x <= this.mapSizeX - 1; x++)
    {
        data[x] = [];
        for(y = 0; y <= this.mapSizeY - 1; y++)
        {
            if(x == 0 || x == this.mapSizeX - 1 || y == 0 || y == this.mapSizeY - 1)
            {
                data[x][y] = new MapTile(x * 32, y * 32, "wall");
            }
            else
            {
                data[x][y] = new MapTile(x * 32, y * 32, "");
            }
            
            scene.addDrawable(data[x][y]);
        }
    }
    
    this.getMapTile = function(x, y)
    {
        return data[x][y];
    }
    
    this.checkWithinBounds = function(x, y)
    {
        if(x < 0 || x >= this.mapSizeX || y < 0 || y >= this.mapSizeY)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    
    /**
     * 
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
       
       if(data[mapX][mapY].type == "wall")
       {
           return true;
       }
       else
       {
           return false;
       }
    }
}