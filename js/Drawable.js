/**
 * A drawable is any object that can be drawn on the screen. It has an Draw function that is called when it is to be
 * drawn on the screen. It has an update function that is ran in the main game loop to update the object.
 * @constructor
 */
Drawable = function()
{
};

/**
 * Update this object to it's next state given a certain time passed.
 * @param dt The time passed in s since the last update was called. e.g for how many s in the future this object
 * should be updated
 */
Drawable.prototype.update=function(dt)
{

};