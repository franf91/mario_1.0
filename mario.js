export class Mario{

}

export function MarioMovement(mario,game){
    
    if(game.key["ArrowRight"]){
        

        if(mario.getBoundingClientRect().left <= game.rightBoundary){
            game.marioPositionX +=game.distance; 
            mario.style.transform = `translateX(${game.marioPositionX}px)`

        }

       
        if(mario.getBoundingClientRect().left >= game.center  && mario.getBoundingClientRect().left < game.rightBoundary){
            game.position +=game.distance;
            game.container.scrollLeft = game.position;
           
           
        }

    }
    
    if(game.key["ArrowLeft"]){
        
        if(mario.getBoundingClientRect().left > game.leftBoundary){
            game.marioPositionX -=game.distance;
            mario.style.transform = `translateX(${game.marioPositionX}px)`
        }

       
    }

    if(game.key["Shift"]){
        DistanceGravityChange(game,5,5);
    }else{
        DistanceGravityChange(game,1,2);
    }

    if(game.key[" "] && game.jumpPress){
        MarioPositionChange(game,mario,-1);
        game.jumpPress = false;
        game.jumpCeiling = false
    }else if (game.marioPositionY < game.ceiling && !game.jumpCeiling){
        game.jumpCeiling = true;
        MarioPositionChange(game,mario,1);
     
    }else if(game.marioPositionY < game.ground && !game.jumpCeiling){
        MarioPositionChange(game,mario,-1);
      
    }else if (game.marioPositionY < game.ground && game.jumpCeiling){
        MarioPositionChange(game,mario,1);
       
    }else if (!game.key[" "]){
        game.jumpPress = true;
    }
}

function DistanceGravityChange(game,distance,gravity){
    game.distance = distance;
    game.gravity = gravity;
}

function MarioPositionChange(game,mario,sign){
    game.marioPositionY += game.gravity*sign;
    mario.style.transform = `translate(${game.marioPositionX}px,${game.marioPositionY}px)`
}