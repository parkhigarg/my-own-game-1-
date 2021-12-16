//                       ASURA MARDAN
//                        Level:- 1
//                    Jump Robby Jump

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;

var asuraMardan, levelNo, instruction, youWon, nextLevel;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav");
  collidedSound = loadSound("assets/sounds/collided.wav");
  
  backgroundImg = loadImage("assets/backgroundImg.png");
  
  trex_running = loadAnimation("assets/hanumanji.png");
  trex_collided = loadAnimation("assets/hanumanji.png");
  groundImage= loadImage("assets/ground.png");

  //groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("assets/cloud.png");
  
  obstacle1 = loadImage("assets/obstacle.png");
  obstacle2 = loadImage("assets/obstacle.png");
  obstacle3 = loadImage("assets/obstacle.png");
  obstacle4 = loadImage("assets/obstacle.png");
  
  gameOverImg = loadImage("assets/retry.png");
  restartImg = loadImage("assets/hojaa.png");
  
  asuraMardanImg = loadImage("assets/Asura Mardan.png");

  //55levelNoImg = loadImage("assets/l1.png");

  instructionImg = loadImage("assets/instruction.png");

  youWonImg = loadImage("assets/youWon.png");

  //55nextLevelImg = loadImage("assets/nextLevel.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  asuraMardan= createSprite(410,40);
  asuraMardan.addImage(asuraMardanImg);
  asuraMardan.scale=0.2;

  //55levelNo = createSprite(800,45);
  //55levelNo.addImage(levelNoImg);
  //55levelNo.scale=0.88;

  instruction= createSprite(1050,55);
  instruction.addImage(instructionImg);
  instruction.scale=0.40;
  
  trex = createSprite(180,410);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('rectangle',0,0,1500,2500);
  trex.scale = 0.15
  //trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";


  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  ground.setCollider('rectangle',0,0,width*50,height/2+60)
  //ground.debug=true;
  gameOver = createSprite(683,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(680,315);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.09;
  restart.scale = 0.09;
  


  gameOver.visible = false;
  restart.visible = false;

  youWon = createSprite(683,250);
  youWon.addImage(youWonImg);
  
  //55nextLevel = createSprite(680,315);
  //55nextLevel.addImage(nextLevelImg);
  
  youWon.scale = 0.08;
  //nextLevel.scale = 0.06;

  youWon.visible = false;
  //55nextLevel.visible = false;

  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 8*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-430) {
      jumpSound.play( )
      trex.velocityY = -15;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(ground);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        collidedSound.play()
        gameState = END;
        obstaclesGroup.destroyEach();
        
    }
    if(score == 500){
      gameState=END 
      youWon.visible=true;
      //55nextLevel.visible=true;
      gameOver.visible = false;
      restart.visible = false;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
      
    }
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  text(mouseX + ',' + mouseY, 33, 23);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 800;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(1300,370,20,30);
    obstacle.setCollider('circle',0,0,55)
    //obstacle.debug = true
  
    obstacle.velocityX = -(6 + 29*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
