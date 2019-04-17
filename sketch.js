"use strict";


function preload() {
  
}

var objects=[];
var balls=[];
var projectiles=[];
var player;
var projdelay=false;
var reduceAmount =20;
var edgeHeight=50;
var label;
var ballRadius=150;
var ballWeight=0;
var weightCalc=0;

function setup() {
  var canvas = createCanvas(1100, 600);

  player = new createPlayer(width/2,height-edgeHeight-51,50,50);

  let box = new createObj(0,0,width-1,edgeHeight);
  objects.push(box);
  box = new createObj(0,height-edgeHeight-1,width-1,edgeHeight);
  objects.push(box);
  box = new createObj(0,edgeHeight,edgeHeight,height-edgeHeight*2-1);
  objects.push(box);
  box = new createObj(width-edgeHeight-1,edgeHeight,edgeHeight,height-edgeHeight*2-1);
  objects.push(box);

 


//setInterval(asd , 1000);

}

function mouseClicked() {
  if(mouseX > edgeHeight+ballRadius && mouseX <width-edgeHeight-ballRadius && mouseY>edgeHeight+ballRadius && mouseY<height-edgeHeight-ballRadius){
  //function start() {
  let circl = new createCircle(mouseX,mouseY,ballRadius,3,3);
  //let circl = new createCircle(200,200,150,3,3);
  balls.push(circl);

  if(ballRadius%reduceAmount!=0 && ballRadius>reduceAmount){
    weightCalc++;
  }else if(ballRadius<reduceAmount){
    weightCalc++;
  }
  ballWeight+=((Math.pow(2, Math.floor((ballRadius/reduceAmount-1))+1+weightCalc)))-1;
  weightCalc=0;
  }
}

function keyPressed() {
  if (keyIsDown(68)) {  //d
    if(player.x<width-edgeHeight-player.w){
    player.x+=5;
    }
  }
  if (keyIsDown(65)) { //a
    if(player.x>edgeHeight){
    player.x-=5;
    }
  }
  if (keyIsDown(32)) { //space
    if(!projdelay){
    projdelay=true;
    setTimeout(shootDelay, 30);
    let proj = new createProjectile(player,player.x+(player.w/2),player.y-5,5,-5);
    projectiles.push(proj);
    }
  }
  if (keyIsDown(87)) { //w
    if(player.y>edgeHeight){
      player.y-=5;
      }
  }
  if (keyIsDown(83)) { //s
    if(player.y+1<height-edgeHeight-player.h){
      player.y+=5;
      }
  }

}

function shootDelay() {
  projdelay=false;
}

function draw() {

    background(200); 
    drawObjects();
   keyPressed();
   textSize(32);
   text("Balls: "+balls.length, edgeHeight*2, edgeHeight/2+11);
   text("Weight: "+ballWeight, edgeHeight*2+20+textWidth("Balls: "+balls.length, edgeHeight*2, edgeHeight/2+11), edgeHeight/2+11);
   
  }
