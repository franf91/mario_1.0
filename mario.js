
export function MarioMovement(mario,game){
    
    let marioLeft = mario.getBoundingClientRect().left;

    

    // keeps player from moving in either direction when both keys are pressed
    if(game.key["ArrowRight"] && game.key["ArrowLeft"]){
        game.pressRight = false;
        game.pressLeft = false;
        console.log("game.key[ArrowRight],marioLeft,game.center,game.rightBoundary",game.key["ArrowRight"],marioLeft,game.center,game.rightBoundary)
    }else if (game.key["ArrowRight"] && (marioLeft < game.rightBoundary) && (game.rightBoundary - marioLeft < game.distance)){
        game.distance = 1;
        game.closeBoundary = true;
        MarioPositionChange(game,mario,1,0);
    }else if (game.key["ArrowRight"] && (marioLeft < game.rightBoundary)){
        game.closeBoundary = false;
        MarioPositionChange(game,mario,1,0);
    }else if(game.key["ArrowLeft"] && (marioLeft > game.leftBoundary) && (marioLeft - game.leftBoundary < game.distance)){
        game.distance = 1;
        game.closeBoundary = true;
        MarioPositionChange(game,mario,-1,0);
    }
    else if (game.key["ArrowLeft"] &&  (marioLeft > game.leftBoundary)){
        game.closeBoundary = false;
        MarioPositionChange(game,mario,-1,0);
    }

    // scrolls right game environment if player left position > game center and player left position < right boundary
    if(game.key["ArrowRight"] && (marioLeft  > game.center)  && (marioLeft < game.rightBoundary)){
        game.position +=game.distance;
        game.container.scrollLeft = game.position;  
    }
    //console.log("game.key[ArrowRight],marioLeft,game.center,game.rightBoundary",game.key["ArrowRight"],marioLeft,game.center,game.rightBoundary)

    /*
    // moves player right unless > right boundary
    if(game.key["ArrowRight"]&& !game.jumpPress  && (marioLeft< game.rightBoundary)){
       MarioPositionChange(game,mario,1,0);
       game.pressRight = true;
    }

    // press right when player in the air
    if(game.key["ArrowRight"] && game.jumpPress){
        game.pressRight = true;
    }

    // scrolls right game environment if player left position > game center and player left position < right boundary
    if(game.key["ArrowRight"] && (marioLeft  >= game.center)  && (marioLeft < game.rightBoundary)){
        game.position +=game.distance;
        game.container.scrollLeft = game.position;  
    }

    // moves player left unless < left boundary
    if(game.key["ArrowLeft"] && !game.jumpPress &&  (marioLeft > game.leftBoundary)){
       MarioPositionChange(game,mario,-1,0);
       game.pressLeft = true;
    }

    // press left when player in the air
    if(game.key["ArrowLeft"] && game.jumpPress){
        game.pressLeft = true;
    }*/

    
    if(game.key["Shift"] && !game.closeBoundary && !game.jumpPress){
        DistanceGravityChange(game,6,5);
    }else{
        DistanceGravityChange(game,1,2);
    } 

    /*

    for(const block of game.blocks1){
       
        
        let topDiff = block.getBoundingClientRect().top - mario.getBoundingClientRect().top;
        let leftDiff = Math.abs(block.getBoundingClientRect().left - mario.getBoundingClientRect().left);
        
        /*
        // if player hits bottom block
        if (topDiff < 0 && topDiff > - 29   && leftDiff <= 29){
             MarioPositionChange(game,mario,1);
             game.jumpCeiling = true;
             break;
        }

        // if player is on top of block
        if (topDiff > 0 && topDiff <=29  && leftDiff <= 29){
            game.topBlock = true;
            break;
         }else{
            game.topBlock = false;
         }
        
    } 

    /*
    // space bar press when player is on the ground
    if(game.key[" "] && !game.jumpPress){
        game.jumpPress = true;
        game.jumpCeiling = false; 
        MarioPositionChange(game,mario,-1);
    }// player hits game ceiling and changes direction
    else if (game.marioPositionY <= game.ceiling && !game.jumpCeiling){
        game.jumpCeiling = true;
        MarioPositionChange(game,mario,1);
    }// player moving up toward the game ceiling
    else if(game.marioPositionY > game.ceiling && game.marioPositionY != 0  && !game.jumpCeiling && !game.topBlock){
        MarioPositionChange(game,mario,-1);
    }// player moving down towards the ground
    else if (game.marioPositionY < game.ground && game.jumpCeiling && !game.topBlock){
        MarioPositionChange(game,mario,1);   
    }else if (!game.key[" "]){
        game.jumpPress = false;
    }*/

    


    // initial press of space bar from ground
    if(game.key[" "] && !game.jumpPress){
        game.jumpPress = true;
    }
    // player moving up (without pressing right or left)
    else if (game.jumpPress && (game.marioPositionY > game.ceiling) && !game.jumpCeiling){
        MarioPositionChange(game,mario,0,-1);
    }// player hit maximum allowable height (without pressing right or left)
    else if (game.marioPositionY <= game.ceiling){
        MarioPositionChange(game,mario,0,1); 
        game.jumpCeiling = true;
    }// player moving down (without pressing right or left)
    else if(game.jumpCeiling && (game.marioPositionY < game.ground)){
        MarioPositionChange(game,mario,0,1);
    }// player hit the ground
    else if (game.marioPositionY >= game.ground && !game.key[" "] ){
        game.jumpCeiling = false;
        game.jumpPress = false;
        game.pressRight = false;
        game.pressLeft = false;
    } 
 
} 

function DistanceGravityChange(game,distance,gravity){
    game.distance = distance;
    game.gravity = gravity;
}

function MarioPositionChange(game,mario,signX,signY){
    game.marioPositionX +=game.distance*signX;
    game.marioPositionY += game.gravity*signY;
    mario.style.transform = `translate(${game.marioPositionX}px,${game.marioPositionY}px)`
}