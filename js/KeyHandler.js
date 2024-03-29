keysDeactivated=false;

function KeyHandler()
{
    document.addEventListener("keydown",this.keyDownHandler.bind(this),false);
    document.addEventListener("keyup",this.keyUpHandler.bind(this),false);


    this.keys={};
    this.keys[0]=false;

    this.justKeyed={};
    this.justKeyed[0]=false;

    this.lastKey=null;
}

KeyHandler.W = 87;
KeyHandler.A = 65;
KeyHandler.S = 83;
KeyHandler.D = 68;

KeyHandler.UP = 38;
KeyHandler.DOWN = 40;
KeyHandler.LEFT = 37;
KeyHandler.RIGHT = 39;

KeyHandler.SPACE = 32;

KeyHandler.instance=null;

KeyHandler.getInstance=function()
{
    if(KeyHandler.instance==null)
    {
        KeyHandler.instance=new KeyHandler();
    }
    return KeyHandler.instance;
};

KeyHandler.prototype.keyDownHandler = function(event)
{
    if(keysDeactivated)
    {
        return;
    }
    if(!this.isPressed(event.keyCode))
    {
        this.justKeyed[event.keyCode]=true;
    }
    this.keys[event.keyCode]=true;
    this.lastKey=event.keyCode;
};

KeyHandler.prototype.keyUpHandler = function(event)
{
    this.keys[event.keyCode]=false;
};
KeyHandler.prototype.isPressed = function(keyCode)
{
    if(this.keys[keyCode]!=null)
    {
        return this.keys[keyCode];
    }
    return false;
};

KeyHandler.prototype.anyPressed = function()
{
    for(var i in this.keys)
    {
        if(this.keys[i])
        {
            return true;
        }
    }
    return false;
};

/**
 * Check if a button has been "just pressed" meaning this is the first step the key went from pressed to unpressed. Use
 * justReset every step to be fresh for catching new pressed.
 * @param keyCode
 * @returns {*}
 */
KeyHandler.prototype.justPressed = function(keyCode)
{
    if(this.justKeyed[keyCode]!=null)
    {
        return this.justKeyed[keyCode];
    }
    return false;
};

KeyHandler.prototype.justReset = function()
{
    this.justKeyed={};
    this.justKeyed[0]=false;
};

//Disable spacebar.
window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};