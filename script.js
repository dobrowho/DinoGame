// Imports
import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRects, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

// Variables
const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreen = document.querySelector('[data-start-screen]');

// Some constants
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = .00001;

// First rezise 
setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale);
// First and single start
document.addEventListener('keydown', handleStart, {once: true});

let lastTime;
let speedScale;
let score;

// Frame function 
function update(time)
{
    if(lastTime == null)
    {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);

    updateSpeedScale(delta);
    updateScore(delta);

    if(checkLose)
    {
        return handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

// Function for lose
function checkLose()
{
    const dinoRect = getDinoRects();
    return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

// Function for verify collision
function isCollision(rect1, rect2)
{
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
}

// Function for update speedScale
function updateSpeedScale(delta)
{
    speedScale += delta * SPEED_SCALE_INCREASE;
}

// Update score
function updateScore(delta)
{
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
}

// Move ground and animation start
// Once at start
function handleStart()
{
    lastTime = null;
    speedScale = 1;
    score = 0;

    setupGround();
    setupDino();
    setupCactus();

    startScreen.classList.add("hide");
    window.requestAnimationFrame(update);
}

// Handle lose
function handleLose()
{
    setDinoLose();
    
    setTimeout(() =>
    {
        document.addEventListener('keydown', handleStart, { once: true });
        startScreen.classList.remove("hide");
    }, 100);
}

// Rezise game
function setPixelToWorldScale()
{
    let worldToPixelScale;

    if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
    {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    }
    else
    {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}