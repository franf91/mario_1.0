
import { MarioMovement} from "./mario.js";

const gameContainer = document.getElementById("game-container");
const mario = document.getElementById("mario");
const sky = document.getElementById("sky");


const blockPos1 = [350,450, 482, 514, 546, 578,2216,2248,2280,2782,2982,3014,3164,3264,3364,3564,3960,3992,5254,5286,5318,5350];
const blockPos2 = [514,2312,2344,2376,2408,2440,2472,2504,2536,2686,2718,2750,2782,3264,3664,3696,3728,3928,3960,3992,4024];
const tubePos = [700,1000,1300,1600,5104,5654];
const stairPos1 = [4092,4124,4156,4188];
const stairPos2 = [4288,4320,4352,4384];
const stairPos3 = [4584,4616,4648,4680,4712];
const stairPos4 = [4808,4840,4872,4904,4936];
const stairPos5 = [5714,5746,5778,5810,5842,5874,5906,5938,5970];

let gameContainerWidth = gameContainer.getBoundingClientRect().width;
let gameContainterBorderWidth = parseInt(getComputedStyle(gameContainer).borderBlockWidth);
let marioWidth = mario.getBoundingClientRect().width;
let gameLeft = gameContainer.getBoundingClientRect().left;
let gameRight = gameLeft + gameContainerWidth - marioWidth - gameContainterBorderWidth ;
let gameCenter = gameLeft + gameContainerWidth/2 - marioWidth/2
let keys = {};
let blocksA = [];
let blocksB= [];
let tubes = [];



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
    gravity:2.5,
    ground:0,
    ceiling:-144,
    rightPress:false,
    leftPress:false,
    jumpPress:false,
    jumpCeiling:false,
    closeBoundary:false,
    topBlock:false,
    blocksA:blocksA,
    blocksB:blocksB,
    tubes:tubes,
    signX:0,
    signY:0

}


for (let i = 0; i < blockPos1.length; i++){
    
    let block = document.createElement('div');
    block.className = 'blockA';
    block.id=`block${i}`;
    block.style.transform = `translateX(${blockPos1[i]}px)`;
    sky.appendChild(block);
    
    blocksA.push(block);

}

for (let i = 0; i < blockPos2.length; i++){
    
    let block = document.createElement('div');
    block.className = 'blockB';
    block.id=`block${i}`;
    block.style.transform = `translateX(${blockPos2[i]}px)`;
    sky.appendChild(block);
    
    blocksA.push(block);

}

for (let i = 0; i < tubePos.length; i++){
    
    let tube = document.createElement('div');
    tube.className = 'tube1';
    tube.id=`tube${i}`;
    tube.style.transform = `translateX(${tubePos[i]}px)`;
    sky.appendChild(tube);
    
    tubes.push(tube);

}
// Stairs going up
for(let i = 0 ; i < stairPos1.length; i++){
   
    for(let j = 0; j < i+1; j++){

        let block = document.createElement('div');
        block.className = `block${stairPos1.length - i}`;
        block.id=`block${stairPos1.length - i}`;
        block.style.transform = `translateX(${stairPos1[stairPos1.length - j - 1]}px)`;
        sky.appendChild(block);
       
   }
}

// Stairs going down
for(let i = 0 ; i < stairPos2.length; i++){
   
    for(let j = 0; j < i+1; j++){

        let block = document.createElement('div');
        block.className = `block${stairPos2.length - i}`;
        block.id=`block${stairPos2.length - i}`;
        block.style.transform = `translateX(${stairPos2[j]}px)`;
        sky.appendChild(block);
       
   }
}

// Stairs going up
for(let i = 0 ; i < stairPos3.length; i++){
   
    for(let j = 0; j < i+1; j++){


        let block = document.createElement('div');
        block.className = `block${stairPos3.length - i}`;
        block.id=`block${stairPos3.length - i}`;
        block.style.transform = `translateX(${stairPos3[stairPos3.length - j - 1]}px)`;
        sky.appendChild(block);
       
   }
}

// Stairs going down
for(let i = 0 ; i < stairPos4.length; i++){
   
    for(let j = 0; j < i+1; j++){

        let block = document.createElement('div');
        block.className = `block${stairPos4.length - i}`;
        block.id=`block${stairPos4.length - i}`;
        block.style.transform = `translateX(${stairPos4[j]}px)`;
        sky.appendChild(block);
       
   }
}

// Stairs going up
for(let i = 0 ; i < stairPos5.length; i++){
   
    for(let j = 0; j < i+1; j++){

        let block = document.createElement('div');
        block.className = `block${stairPos5.length - i}`;
        block.id=`block${stairPos5.length - i}`;
        block.style.transform = `translateX(${stairPos5[stairPos5.length - j - 1]}px)`;
        sky.appendChild(block);
       
   }
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