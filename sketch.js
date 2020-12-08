
var monkey , monkey_running, ground;
var bananaImage, rockImage;
var foodGroup, rockGroup;
var score, monkeyImage, bannana;
var PLAY = 435
var END = 238
var gameState;

function preload(){ 
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bannanaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bannanaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png")
}

function setup() {
  createCanvas(400,400);
  
  //ground
  ground = createSprite(300, 380, 800, 5);
  ground.x = ground.width /2;
  
  monkey = createSprite(35, 370, 15, 15);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.09;
  
  foodGroup = new Group();
  rockGroup = new Group();
  
  score = 0;
  
  gameState = PLAY;
}

function draw() {
  background("white");
  
  text("Bananas Eaten:" + score, 200, 30);
  
  monkey.collide(ground);
  
  if (gameState === PLAY) {
  ground.velocityX = -4;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.velocityY = monkey.velocityY + 1.4;
  
  if (keyDown("space") && monkey.y >= 348) {
    monkey.velocityY = -20;
  }
  
  if (monkey.isTouching(foodGroup)) {
    score=score+1;
    foodGroup.destroyEach();
  }

  bannanaBoi();
  rocky();
    
  if (monkey.isTouching(rockGroup)) {
    gameState = END
  }//end
  }
  else if (gameState === END) {
    rockGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    rockGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    monkey.velocityY = 0;
  }

  drawSprites();
}

function bannanaBoi () {
  if (frameCount % 100 === 0) {
    bannana = createSprite(405, 300, 10, 10);
    bannana.y = Math.round(random(200, 280));
    bannana.addImage(bannanaImage);
    bannana.velocityX = -(5 + score/4)
    bannana.scale=0.1;
    
    bannana.lifetime = 110;
    
    foodGroup.add(bannana);
  }
}

function rocky () {
  if (frameCount % 250 === 0) {
    var rock = createSprite(415,360, 15, 15);
    rock.addImage(rockImage);
    rock.scale=0.1;
    rock.velocityX = -(5 + score/4)
    rock.setCollider("circle", 0, 0, 35);
    
    
    rock.lifetime = 110;
    
    rockGroup.add(rock);//rock
  }
}
//hi