
/**
 * Shuffle array array with a given intensity (Higher intensity means better shuffling but slower)
 * @param array
 * @param intensity
 * @returns {*} The shuffled array
 */
shuffle = function(array,intensity)
{
    var len=array.length;
    var shuffles=len*intensity;
    for(var i=0;i<shuffles;i++)
    {
        var wallSlice=array.pop();
        var pos = Math.floor(Math.random() * (len-1));
        array.splice(pos,0,wallSlice);
    }
    return array;
}

/**
 * Compare the z value of a and b (to sort on for example)
 * @param a
 * @param b
 * @returns {number}
 */
function depthCompare(a,b) {
    if (a.z < b.z)
        return 1;
    if (a.z > b.z)
        return -1;
    return 0;
}
/**
 * Insert a child at the correct position
 * @param stage the stage to add to
 * @param child the child to add
 */
function insertSortedChild(stage,child)
{
    var z=child.z;

    var low=0;
    var high=stage.children.length-1;
    while(low<=high) {
        var mid = Math.ceil((low + high) / 2);

        if (stage.children[mid].z<z)
        {
            high=mid-1;
        }
        else
        {
            low=mid+1;
        }
    }
    stage.addChildAt(child,low);
    //console.log(stage.children);
}
/**
 * Return signum of x
 * @param x
 * @returns {number}
 */
function sign(x)
{
    if(x==0) return 0;
    if(x<0) return -1;
    if(x>0) return 1;
}
/**
 * Return the number of digits in the given number
 * @param number
 * @returns {number}
 */
function digitCount(number)
{
    return number.toString().length;
}

/**
 * Return a random argument given to this funciton
 * @returns {*}
 */
function choose(choice1,choice2,choice3,etc)
{
    var choice=Math.random()*(arguments.length);
    return arguments[Math.floor(choice)];
}

/**
 * Check if me is in set you.
 * @param me
 * @param you
 * @returns {boolean}
 */
function isIn(me,you)
{
    for(var i in you)
    {
        if(you[i]==me)
        {
            return true;
        }
    }
    return false;
}

/**
 * Check if two lists are identical
 * @param list1
 * @param list2
 * @returns {boolean}
 */
function isSame(list1,list2)
{
    if(list1.length!=list2.length)
    {
        return false;
    }
    for(var i=0;i<list1;i++)
    {
        if(list1[i]!=list2[i])
        {
            return false;
        }
    }
    return true;
}