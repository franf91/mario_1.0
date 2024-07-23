
const gameContainer = document.getElementById("game-container");
const mario = document.getElementById("mario");

let leftGameBoundary = gameContainer.getBoundingClientRect().left;
let rightGameBoundary = gameContainer.getBoundingClientRect().left + gameContainer.getBoundingClientRect().width

let keys = {};
let move = 0;
let move2 = 0;
let move3 = 0;
let distance = 3;
let gravity = 2;
let jumpPress = true;
let jumpCeiling = false;


window.addEventListener("resize",()=>{
    leftGameBoundary = gameContainer.getBoundingClientRect().left;
})


window.addEventListener("keydown",(event)=>{
    keys[event.key] = true;
    
});

window.addEventListener("keyup",(event)=>{
    keys[event.key] = false;
});

function MarioMovement(){

    if(keys["ArrowRight"]){
        
        if(mario.getBoundingClientRect().left < rightGameBoundary){
            move +=distance; 
            mario.style.transform = `translateX(${move}px)`
            console.log(rightGameBoundary);
        }
       
    
        if(mario.getBoundingClientRect().left >= leftGameBoundary + 200){
            move2 +=distance;
            gameContainer.scrollLeft = move2;
        }

        //console.log("move right", move);
        console.log("position Left",mario.getBoundingClientRect().left);
        
    }
    
    if(keys["ArrowLeft"]){
        
        if(mario.getBoundingClientRect().left > leftGameBoundary){
            move -=distance;
            mario.style.transform = `translateX(${move}px)`
        }


       // console.log("move left", move);
        console.log("position Left",mario.getBoundingClientRect().left);
       
    }

    if(keys["Shift"]){
        distance = 5;
        gravity = 5;
    }else{
        distance = 1;
        gravity = 2;
    }

    // not completed
    if(keys[" "] && jumpPress){
        move3 -=gravity;
        mario.style.transform = `translate(${move}px,${move3}px)`
        jumpPress = false;
        jumpCeiling = false
    }else if (move3 < - 96 && !jumpCeiling){
        jumpCeiling = true;
        move3 += gravity;
        mario.style.transform = `translate(${move}px,${move3}px)`
    }else if(move3 < 0 && !jumpCeiling){
        move3 -= gravity;
        mario.style.transform = `translate(${move}px,${move3}px)`
    }else if (move3 < 0 && jumpCeiling){
            move3 += gravity;
            mario.style.transform = `translate(${move}px,${move3}px)`
    }else if (!keys[" "]){
        jumpPress = true;
    }

    requestAnimationFrame(MarioMovement);
}


requestAnimationFrame(MarioMovement);

