// Imports
import { incrementCostumProperty, setCostumProperty, getCostumProperty } from "./updateCostumProperty.js"

// Variables
const SPEED = .05;
const groundElems = document.querySelectorAll('[data-ground]');

export function setupGround()
{
    setCostumProperty(groundElems[0], "--left", 0);
    setCostumProperty(groundElems[1], "--left", 300);
}

export function updateGround(delta, speedScale)
{
    groundElems.forEach(ground =>
        {
            incrementCostumProperty(ground, "--left", delta * speedScale * SPEED * (-1));

            if(getCostumProperty(ground, "--left") <= -300)
            {
                incrementCostumProperty(ground, "--left", 600);
            }
        });
}