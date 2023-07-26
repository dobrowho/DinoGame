// Some bullshittin' functions
// I understood them too
export function getCostumProperty(elem, prop)
{
    // return property prop from element elem
    // in float 
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCostumProperty(elem, prop, value)
{
    // setting value of prop field of elem
    elem.style.setProperty(prop, value);
}

export function incrementCostumProperty(elem, prop, inc)
{
    // set costum property or
    // increment costum property
    setCostumProperty(elem, prop, getCostumProperty(elem, prop) + inc);

}