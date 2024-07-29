
import { MarioMovement } from "./mario.js";

const gameContainer = document.getElementById("game-container");
const mario = document.getElementById("mario");

let gameContainerWidth = gameContainer.getBoundingClientRect().width;
let marioWidth = mario.getBoundingClientRect().width;
let gameLeft = gameContainer.getBoundingClientRect().left;
let gameRight = gameLeft + gameContainerWidth - marioWidth;
let gameCenter = gameLeft + gameContainerWidth/2 - marioWidth/2
let keys = {};


const game = {
    key:keys,
    leftBoundary:gameLeft,
    rightBoundary:gameRight,
    center:gameCenter,
    container: gameContainer,
    distance:3,
    marioPositionX:0,
    marioPositionY:0,
    position:0,
    gravity:2,
    ground:0,
    ceiling:-96,
    jumpPress:true,
    jumpCeiling:false
}

window.addEventListener("resize",()=>{
    game.leftBoundary = gameContainer.getBoundingClientRect().left;
})

window.addEventListener("keydown",(event)=>{
    keys[event.key] = true;
    
});

window.addEventListener("keyup",(event)=>{
    keys[event.key] = false;
});

function PlayerMovement(){
    MarioMovement(mario,game);
    requestAnimationFrame(PlayerMovement);
}

requestAnimationFrame(PlayerMovement);