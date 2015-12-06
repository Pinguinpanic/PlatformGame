/**
 * Map object constructor
 * @param {type} mapSizeX
 * @param {type} mapSizeY
 * @param {type} scene The scene in which this map will be displayed
 * @returns {Map}
 */
function Map(mapSizeX, mapSizeY, scene)
{
    this.mapSizeX = mapSizeX;
    this.mapSizeY = mapSizeY;
    
    instance=null;
    
    // Initialize the map
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
    
    /**
     * 
     * @param {type} x
     * @param {type} y
     * @returns {MapTile}
     */
    this.getMapTile = function(x, y)
    {
        return data[x][y];
    }
    
    /**
     * Checks whether the given x and y are witin the bounds of the map grid
     * @param {type} x
     * @param {type} y
     * @returns {Boolean}
     */
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