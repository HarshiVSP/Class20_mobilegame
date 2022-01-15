var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacles, obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4, obstacleImage5,obstacleImage6
var gameover, gameoverImg
var restart, restartImg

var newImage;
var score=0
var Play=0
var end=1
var gamestate=Play
var cloudsGroup
var obstaclesGroup
var diesound,jumpsound,checkpointsound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
 obstacleImage1=loadImage("obstacle1.png")
 obstacleImage2=loadImage ("obstacle2.png")
 obstacleImage3=loadImage ("obstacle3.png")
 obstacleImage4=loadImage ("obstacle4.png")
 obstacleImage5=loadImage ("obstacle5.png")
 obstacleImage6=loadImage ("obstacle6.png")
gameoverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
jumpsound=loadSound("jump.mp3")
diesound=loadSound("die.mp3")
checkpointsound=loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

var message=("hello all")
console.log(message)
  trex = createSprite(50,height-50,20,50);
  trex.addAnimation("running", trex_running)
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,height-40,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(3+score/100);

  gameover=createSprite(width/2,height/2,20,20);
gameover.addImage("over", gameoverImg);
gameover.scale=0.5;

restart=createSprite(width/2,height/2+40,15,15);
restart.addImage("restart",restartImg);
restart.scale=0.3;
  
  invisibleGround = createSprite(200,height-30,400,10);
  invisibleGround.visible = false;

  cloudsGroup= new Group();
  obstaclesGroup= new Group();
  trex.debug=false;
  trex.setCollider("circle", 0, 0, 55);
  console.log("Hello"+ 5);

  sessionStorage["HighestScore"]=0
  
}

function draw() {
  background(180);
  textSize(25);
  text("Score:"+score,width/2,height/2-40);
  text("Highestscore:"+sessionStorage["HighestScore"],width/4-100,height/2-40);
  
  
  
  trex.collide(invisibleGround);
  
  
 
  if(gamestate===Play){
    score=score+Math.round(getFrameRate()/60)
    if(keyDown("space")&&trex.y>=height-120){
      trex.velocityY=-10
      jumpsound.play()
    }

    else if(keyDown("up")&&trex.y>=height-120){
      trex.velocityY=-10
      jumpsound.play()
    }


    else if(touches.length>0 &&trex.y>=height-120){
      trex.velocityY=-10
      jumpsound.play()
      touches=[]
    }
gameover.visible=false
restart.visible=false
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  //spawn the clouds
  spawnClouds();
  spawnobstacles();
  if(score>0&&score%100==0){
    checkpointsound.play()
  }
  if(trex.isTouching(obstaclesGroup)){
    gamestate=end
    diesound.play()
  }
  }
  
  else if(gamestate===end){
  ground.velocityX=0
  trex.velocityY=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)
  trex.changeAnimation("collided", trex_collided)
  gameover.visible=true
  restart.visible=true
  if(touches.length>0||mousePressedOver(restart)){
    restartGame()
    touches=[]
  } 
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+40,height-100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random((height-300),(height-400)))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud)
    
    //assigning lifetime to the variable

    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
  }

    function spawnobstacles(){

     
      if(frameCount%40===0){
      obstacles=createSprite(540,height-60,10,40)
      obstacles.velocityX=-(6+score/100)
      obstacles.scale=0.5
      obstacles.lifetime=90
      obstaclesGroup.add(obstacles)
      var rand=Math.round(random(1,6))
      switch(rand){
        case 1: obstacles.addImage(obstacleImage1)
        break;
        case 2: obstacles.addImage(obstacleImage2)
        break;
        case 3: obstacles.addImage(obstacleImage3)
        break;
        case 4: obstacles.addImage(obstacleImage4)
        break;
        case 5: obstacles.addImage(obstacleImage5)
        break;
        case 6: obstacles.addImage(obstacleImage6)
        break;

        default: break

      }
    }
}

function restartGame(){
  gameState=Play;

obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
trex.changeAnimation("running", trex_running)
if(sessionStorage["HighestScore"]<score){
  sessionStorage["HighestScore"]=score
 
}
score=0
}
