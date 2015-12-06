/**
 * THIS IS AN EXAMPLE OBJECT WHERE DRAWABLES SHOULD BE BASED ON
 */

/**
 * A drawable is any object that can be drawn on the screen. It has an Draw function that is called when it is to be
 * drawn on the screen. It has an update function that is ran in the main game loop to update the object.
 *
 * It inherits from DisplayObject since it should be an object that can be added to the PIXI tree.
 * @constructor
 */
Drawable = function()
{
    PIXI.DisplayObject.call(this);
};
Drawable.constructor = Drawable;
Drawable.prototype = Object.create(PIXI.DisplayObject.prototype);

/**
 * Update this object to it's next state given a certain time passed.
 * @param dt The time passed in s since the last update was called. e.g for how many s in the future this object
 * should be updated
 */
Drawable.prototype.update=function(dt)
{

};