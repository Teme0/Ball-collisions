"use strict";
function drawObjects(){

    


    for (let i=0; i<projectiles.length; i++){
        projectiles[i].show();
        projectiles[i].y+=projectiles[i].vy;
        if(projectiles[i].y<0 ){
            projectiles.splice(i,1);
    
          }
      }

    for (let i=0; i<objects.length; i++){
        objects[i].show();
      }
  
      for (let i=0; i<balls.length; i++){
      
        balls[i].show();
        

        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        
        wallCollision(balls[i]);
        
        let removed2=false;
        let removed1=false;
        //if(!balls[i].color){
        
           removed1=  playerCollision(balls[i],i);
           
        //}
        
        if(!removed1){
            removed2 =projCollision(balls[i],i,balls);
        }
        
           if(!removed1 && !removed2){
             if(balls[i].x>width*2 || balls[i].x<0 || balls[i].y>height*2 || balls[i].y<0){
                balls.splice(i,1);
                
                }
            }
          
        
        
      }
      player.show();
}

