var PLAY = 1;
var END = 0;
var gameState = PLAY;

//var trex, trex_running, trex_collided;
var submarine, submarineImage;
var ground, invisibleGround, groundImage;

//var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

var bg, bgImage;

var fishGroup;

function preload(){
  groundImage = loadImage("sandBg.png");
  
  submarineImage=loadImage("submarineImage.png");
  
  obstacle1 = loadImage("fish1.png");
  obstacle2 = loadImage("fish2.png");
  obstacle3 = loadImage("fish3.png");
  obstacle4 = loadImage("fish4.png");
  obstacle5 = loadImage("fish5.png");
  obstacle6 = loadImage("fish6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  bgImage = loadImage("waterBackground.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var message = "This is a message";
 console.log(message)

 bg= createSprite(width/2, height/2, windowWidth, windowHeight);
 bg.addImage(bgImage);
 bg.scale= 3.5;

  submarine = createSprite(200,height-200,20,50);
  submarine.addImage(submarineImage);
  submarine.scale= 0.5;
   
  ground = createSprite(width/2,height-100,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=1;
  ground.x = ground.width /2;
  ground.visible= false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,height-100,400,10);
  invisibleGround.visible = false;
  
  fishGroup= createGroup();
  
  submarine.setCollider("rectangle",0,0,submarine.width,submarine.height);
  submarine.debug = false;
  
  score = 0;
  
}

function draw() {
  
  background(180);
 
  if (bg.x < 0){
      
   bg.x= width/2;
  } 
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    bg.velocityX = -6;
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }

    if (keyDown("up")){
      submarine.y = submarine.y -5;
    }

    if (keyDown("down")){
      submarine.y = submarine.y +5;
    }
      
    //spawn the fish
    spawnFish();
    
    if(fishGroup.isTouching(submarine)){
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      submarine.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
      fishGroup.setLifetimeEach(-1);
    
      fishGroup.setVelocityXEach(0);
       
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  drawSprites();
   //displaying score
   stroke("black");
   text("Score: "+ score, width - 100,50);
}

function reset(){
  gameState=PLAY;
  score=0;
  fishGroup.destroyEach(); 
}


function spawnFish(){
  if (frameCount % 200 === 0) {
    var obstacle= createSprite(width,120,40,10);
    obstacle.y = Math.round(random(80, height-100));
    //generate random obstacles
   var rand = Math.round(random(1,6));
   switch(rand) {
     case 1: obstacle.addImage(obstacle1);
             break;
     case 2: obstacle.addImage(obstacle2);
             break;
     case 3: obstacle.addImage(obstacle3);
             break;
     case 4: obstacle.addImage(obstacle4);
             break;
     case 5: obstacle.addImage(obstacle5);
             break;
     case 6: obstacle.addImage(obstacle6);
             break;
     default: break;
   }
    obstacle.scale = 0.3;
    obstacle.velocityX = -(6+score/100);
    
    //assign lifetime to the variable
    obstacle.lifetime = 500;
    
    //add each cloud to the group
    fishGroup.add(obstacle);
  }
   
}

