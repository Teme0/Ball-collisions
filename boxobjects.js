"use strict";

function createPlayer(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
 
     this.show = function(){
         rect(this.x,this.y,this.w,this.h);
         
     }
 
 }

 function createProjectile(obj,x,y,r,vy){
    player=obj;
    this.x=x;
    this.y=y;
    this.r =r;
    this.vy=vy;
    this.show = function(){
        push();
        fill(0, 0, 0);
        circle(this.x,this.y,this.r);
        pop();
    }
 
 }


function createObj(x,y,w,h){
   this.x=x;
   this.y=y;
   this.w=w;
   this.h=h;

    this.show = function(){
        rect(this.x,this.y,this.w,this.h);
        
    }

}

function createCircle(x,y,r,vx,vy,color){
    this.x=x;
    this.y=y;
    this.r =r;
    this.vx=vx;
    this.vy=vy;
    this.color=color;
    this.color1=random(255);
    this.color2=random(255);
    this.color3=random(255);
    this.show = function(){
        push();
        
        if(this.color){
            fill(255, 0, 0);
        }else{
            fill(0, 255, 0);
        }
        fill(this.color1, this.color2, this.color3);
        circle(this.x,this.y,this.r);
       
        pop();
    }

}

function wallCollision(obj){
    if( obj.x+obj.r > width-edgeHeight || obj.x-obj.r < edgeHeight){
        obj.vx*=-1;
        obj.color=!obj.color;
    }
    if( obj.y+obj.r > height-edgeHeight || obj.y-obj.r < edgeHeight){
        obj.vy*=-1;
        obj.color=!obj.color;
    }
    
}
function playerCollision(obj,i){


    let closestX = (obj.x<player.x ? player.x :(obj.x > player.x+player.w ? player.x+player.w: obj.x));
    let closestY = (obj.y<player.y ? player.y :(obj.y > player.y+player.h ? player.y+player.h: obj.y));
    let distX = closestX - obj.x;
    let distY = closestY - obj.y;
    if((distX*distX +distY*distY)<= obj.r*obj.r){
        splitFunction(obj,i);
        ballWeight--;
        return true;
    }
}

function projCollision(ball,i,balls){
    let removed = false;
    for (let j=0; j<projectiles.length; j++){
     
        if(sqrt(Math.pow((projectiles[j].x - ball.x),2) + Math.pow((projectiles[j].y - ball.y),2)) < projectiles[j].r+ball.r ){
                
                    splitFunction(ball,i);
                 
                    ballWeight--;
                
                 
                 projectiles.splice(j,1);
                 ball.color=210;
                 removed = true;
                 break;
        }
    }
    return removed;
}

function splitFunction(ball,i){
    if(ball.r>reduceAmount){
    let circl = new createCircle(ball.x,ball.y,ball.r-reduceAmount,ball.vx*-1,ball.vy,true);
    balls.push(circl);
    circl = new createCircle(ball.x,ball.y,ball.r-reduceAmount,ball.vx,ball.vy,true);
    balls.push(circl);
}
    balls.splice(i,1);
    
}