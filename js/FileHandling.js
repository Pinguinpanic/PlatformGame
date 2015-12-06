function FileHandling()
{

}

FileHandling.loadFile = function(fileName,callBack)
{
    var file = new XMLHttpRequest();
    file.open("GET",fileName,true);
    file.onreadystatechange = function ()
    {
        // Makes sure the document is ready to parse.
        if (file.readyState === 4)
        {
            // Makes sure the file exists.
            if (file.status === 200)
            {
                var allText = file.responseText;
                callBack(allText);
            }
        }
    };
    file.send(null);
};

FileHandling.loadMap=function(fileName,callBack)
{
    FileHandling.loadFile("maps/"+fileName+".map",function(map){
        //PARSE MAP HERE
        var lines = map.split("\n");
        var data=[];
		
		data.mapSize = lines[0].split(",");
		data.mapSize[0] = parseInt(data.mapSize[0]);
		data.mapSize[1] = parseInt(data.mapSize[1]);
		
		if(lines.length != data.mapSize[1] + 1)
		{
			console.error("Y dimension of map '" + fileName + "' not correct (Indicated: " + (data.mapSize[1] + 1) + ", actual: " + lines.length + ")");
			return;
		}
		
        for(var l=0;l<data.mapSize[1];l++){
            var line=lines[l + 1];
			
			if(line.length != data.mapSize[0])
			{
				console.error("X dimension of map '" + fileName + "' not correct (line " + l + ")");
				return;
			}
			
            data[l]=[];
            for(var i=0;i<data.mapSize[0];i++)
            {
                data[l][i]=line[i];
            }
        }
        callBack(data);
    });
};