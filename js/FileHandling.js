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
        for(var l=0;l<lines.length-1;l++){
            var line=lines[l];
            data[l]=[];
            for(var i=0;i<line.length;i++)
            {
                data[l][i]=line[i];
            }
        }
        callBack(data);
    });
};