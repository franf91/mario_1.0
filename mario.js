
export function MarioMovement(mario,game){
    
    let marioLeft = mario.getBoundingClientRect().left;

    if(game.jumpPress && game.key["ArrowRight"] && !game.leftPress){
        game.rightPress = true;
    }

    if(game.jumpPress && game.key["ArrowLeft"] && !game.rightPress){
        game.leftPress = true;
    }


     /* JUMPING MECHANICS */

     //Initial jump press
    if(game.key[" "] && !game.jumpPress){
        game.jumpPress = true;
        MarioPositionChange(game,mario,0,-1);
    }
    // moving up toward game ceiling
    else if(game.jumpPress && game.marioPositionY > game.ceiling && !game.jumpCeiling){
        
        if(marioLeft >= game.rightBoundary  && game.rightPress|| marioLeft <= game.leftBoundary && game.leftPress){
            game.signX = 0;
            game.signY = -1.5;
        }
        else if(game.rightPress && Math.abs(game.marioPositionY - game.ceiling) < Math.abs(game.ceiling)*0.05){
            game.signX = 1;
            game.signY = -0.35;
        }else if(game.leftPress && Math.abs(game.marioPositionY - game.ceiling) < Math.abs(game.ceiling)*0.05){
            game.signX = -1;
            game.signY = -0.35;
        } else if(Math.abs(game.marioPositionY - game.ceiling) < Math.abs(game.ceiling)*0.05){
            game.signX = 0;
            game.signY = -0.35;
        } else if(game.rightPress){
            game.signX = 1;
            game.signY = -1.5;
        }else if (game.leftPress){
            game.signX = -1;
            game.signY = -1.5;
        }
        else if(!game.rightPress){
            game.signX = 0;
            game.signY = -1.5;
        }

        MarioPositionChange(game,mario,game.signX,game.signY);

    }// hit the game ceiling
    else if (game.marioPositionY <= game.ceiling && game.jumpPress && !game.jumpCeiling){
        MarioPositionChange(game,mario,0,0);
        game.jumpCeiling = true;
    }// moving down toward the ground
     else if (game.jumpCeiling && game.marioPositionY < game.ground){
        
        if(marioLeft >= game.rightBoundary  && game.rightPress|| marioLeft <= game.leftBoundary && game.leftPress){
            game.signX = 0;
            game.signY = 1.5;
        }
        else if(game.rightPress && Math.abs(game.marioPositionY - game.ceiling) < Math.abs(game.ceiling)*0.05){
            game.signX = 1;
            game.signY = 0.35;
        } else if(game.leftPress && Math.abs(game.marioPositionY - game.ceiling) < Math.abs(game.ceiling)*0.05){
            game.signX = -1;
            game.signY = 0.35;
        }
        else if(Math.abs(game.marioPositionY - game.ceiling) < Math.abs(game.ceiling)*0.05){
            game.signX = 0;
            game.signY = 0.35;
        }
        else if(game.rightPress) {
            game.signX = 1;
            game.signY = 1.5;
        } else if(game.leftPress){
            game.signX = -1;
            game.signY = 1.5;
        }
        else if(!game.rightPress && !game.leftPress){
            game.signX = 0;
            game.signY = 1.5;  
        }

        MarioPositionChange(game,mario,game.signX,game.signY);

    } // hit the ground
    else if (game.jumpCeiling && game.marioPositionY >= game.ground){
        game.jumpCeiling = false;
        game.jumpPress = false;
        game.rightPress = false;
        game.leftPress = false;
        game.marioPositionY = 0;
        mario.style.transform = `translate(${game.marioPositionX}px,${game.marioPositionY}px)`
    }

    /* MOVING RIGHT AND LEFT ON GROUND MECHANICS */

    // reduces distance when close to right boundary
    if (!game.jumpPress && game.key["ArrowRight"] && (marioLeft < game.rightBoundary) && (game.rightBoundary - marioLeft < game.distance)){
        game.distance = 1;
        game.signX = 1;
        game.signY = 0;
        MarioPositionChange(game,mario,game.signX,game.signY);
    } // movement right
    else if (!game.jumpPress && game.key["ArrowRight"] && (marioLeft < game.rightBoundary)){     
        game.distance = 3;
        game.signX = 1;
        game.signY = 0;
        MarioPositionChange(game,mario,game.signX,game.signY);     
    } // reduces distance when close to left boundary
    else if(!game.jumpPress && game.key["ArrowLeft"] && (marioLeft > game.leftBoundary) && (marioLeft - game.leftBoundary < game.distance)){
        game.distance = 1;
        game.signX = -1;
        game.signY = 0;
        MarioPositionChange(game,mario,game.signX,game.signY);  
    } // movement left
    else if (!game.jumpPress && game.key["ArrowLeft"] &&  (marioLeft > game.leftBoundary)){
        game.distance = 3;
        game.signX = -1;
        game.signY = 0;
        MarioPositionChange(game,mario,game.signX,game.signY);  
    }


     /* SCROLLING GAME WINDOW MECHANICS */
     
    // scrolls right game environment if player left position > game center and player left position < right boundary
    if(!game.key["ArrowLeft"] && (marioLeft  > game.center)  && (marioLeft < game.rightBoundary)){
        game.position +=game.distance*game.signX;
        game.container.scrollLeft = game.position;  
    } 


   
    
    
} 


function MarioPositionChange(game,mario,signX,signY){
    game.marioPositionX +=game.distance*signX;
    game.marioPositionY += game.gravity*signY;
    mario.style.transform = `translate(${game.marioPositionX}px,${game.marioPositionY}px)`
}
