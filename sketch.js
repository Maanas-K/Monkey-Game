//game developped by Maanas K
//developped on 14/12/20, updated on 18/12/20

//global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0;

var gameState=1;
var play=1;
var end=0;

function preload(){
  
  //to load walking  animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
 
  //to load banna and rock images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(500,300);
  
  //creating monkey
  monkey=createSprite(50,250,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
 // monkey.debug=true;
 
  
  //cring ground
  ground=createSprite(250,280,1000,10);
  ground.shapeColor="maroon"
  ground.velocityX=-4;
  
  //groups
  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background(rgb(135,206,235));
  
  //reseting score
   if(ground.x<ground.x/2){
    ground.x=250;
  }
  
  //to make monkey stay on ground
  monkey.collide(ground);
  
 if(gameState==play){
   
   //calling in functions
  createBanana();
  
  createRocks();
  
  //making monkey jump 
  if(keyDown("space")&&monkey.y>200){
    monkey.velocityY=-13;
    
  }
   //gravity
  monkey.velocityY=monkey.velocityY+0.7;
  
   //scoring sytem
   survivalTime=survivalTime+ Math.round(getFrameRate()/60);
  
   //to incraese score if monkey touches banana    
  if(bananaGroup.isTouching(monkey)){
    survivalTime=survivalTime+10
    bananaGroup.destroyEach();
  }
  
   //to end game
  if(obstacleGroup.isTouching(monkey)){
    
    gameState=end;
  }
 }else
 
 if(gameState==end){
   
   //to stop the game
   ground.velocityX=0;
   
   monkey.velocityY=0;
   
   //to make banana and rock stay on screen
   bananaGroup.setLifetimeEach(-1);
   bananaGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   obstacleGroup.setVelocityXEach(0);
   
   //game over text
   textSize(22);
   text("Game Over",50,50);
   text("Press R to reset",50,75);
   
   //reset button
   if(keyDown("r")||keyDown("R")){
     gameState=play;
     survivalTime=0;
     bananaGroup.destroyEach();
     obstacleGroup.destroyEach();
   }
   
   
 }
 
 //score text
  textSize(16);
  text("Survival Time:"+survivalTime,350,50);
  

  
  
  drawSprites();
}

//to create  bananas
function createBanana(){
  
  if(frameCount%80==0){
    banana=createSprite(500,175,20,20);
    banana.y=Math.round(random(110,160));
    banana.addImage(bananaImage);
    banana.scale=0.08;
    
    banana.velocityX=-6;
    banana.lifetime=85;
    
    bananaGroup.add(banana);
    //banana.debug=true;
    banana.setCollider("rectangle",0,0,500,250)
  }
  
   
   
   
}

//to create obstacles
function createRocks(){
  if(frameCount%150==0){
    obstacle=createSprite(450,240,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    obstacle.velocityX=-(8+survivalTime/40);
    
   // obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,320,320,45)
    
    obstacle.lifetime=75;
    
    obstacleGroup.add(obstacle);
  }
    
}




