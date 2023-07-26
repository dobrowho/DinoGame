import { incrementCostumProperty, getCostumProperty, setCostumProperty } from "./updateCostumProperty.js";

// Constants
const dinoElem = document.querySelector('[data-dino]');
const worldElem = document.querySelector('[data-world]');
const JUMP_SPEED = .45;
const GRAVITY = .0015; 
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

// Variables
let isJumping;
let dinoFrame;
let currentTimeFrame;
let yVelocity;

// Dino functions
export function setupDino()
{
    isJumping = false;

    dinoFrame = 0;
    currentTimeFrame = 0;
    yVelocity = 0;

    setCostumProperty(dinoElem, "--bottom", 0);

    document.removeEventListener('keydown', onJump);
    document.addEventListener('keydown', onJump);
}

export function updateDino(delta, speedScale)
{
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRects()
{
    return dinoElem.getBoundingClientRect();
}

export function setDinoLose()
{
    dinoElem.src = './resources/dino-lose.png';
}

function handleRun(delta, speedScale)
{
    if(isJumping)
    {
        dinoElem.src = './resources/dino-stationary.png';
        return;
    }

    if(currentTimeFrame >= FRAME_TIME)
    {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
        dinoElem.src = `./resources/dino-run-${dinoFrame}.png`;
        currentTimeFrame -= FRAME_TIME;
    }

    currentTimeFrame += delta * speedScale;
}

function handleJump(delta)
{
    if(!isJumping)
    {
        return;
    }

    incrementCostumProperty(dinoElem, "--bottom", yVelocity * delta);

    if(getCostumProperty(dinoElem, "--bottom") <= 0)
    {
        setCostumProperty(dinoElem, "--bottom", 0);
        isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}

function onJump(e)
{
    if(e.code !== "Space")
    {
        return;
    }

    if(isJumping)
    {
        return;
    }

    yVelocity = JUMP_SPEED;
    isJumping = true;
}

worldElem.addEventListener('touchstart', () =>
{
    if(isJumping)
    {
        return;
    }

    yVelocity = JUMP_SPEED;
    isJumping = true;
});