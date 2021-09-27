  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var boundary1, boundary2;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  ghost.setCollider("rectangle",0,50,200,210)

  boundary1 = createSprite(40, 300, 100, 600 )

  boundary2 = createSprite(560, 300, 100, 600 )
  
}


function draw() {
  background(255);  
  
  //ghost.debug = true;

  if (gameState === "play") {
    
    ghost.x = World.mouseX;

    if(keyDown("space")){
  
      // write a code to move up when space is pressed
      ghost.velocityY = -5;

    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
      if (tower.y > 600) {
        tower.y = height/2;
      }

      spawnDoors();

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity 
      if (climbersGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
      }
      
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
      if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
        ghost.destroy();
        gameState = "end";
      }
      
      
      ghost.collide(boundary1);
      ghost.collide(boundary2);

      

  drawSprites();
}
  if (gameState === "end"){
    background ("black")
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    
  }
   boundary1.visible = false;
   boundary2.visible = false; 

}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    //add the random function
    door.x=Math.round(random(20,580))
    door.x =  climber.x;
    
    
    //

    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    ghost.depth = door.depth+1;
     

    
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
    doorsGroup.lifetime = 300;
    climbersGroup.lifetime = 300;
    invisibleBlockGroup.lifetime = 300;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

