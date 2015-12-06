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

FileHandling.loadMap=function(fileName)
{
    FileHandling.loadFile("maps/"+fileName+".map",function(map){
        //PARSE MAP HERE
        console.log(map);
    });
};