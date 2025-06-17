//variavel personagens
var pc
var pc_img

var cena = 2

//Variaveis jogo de corrida
var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

//

//Variaveis jogo de culinaria
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4,fruit5, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
//



function preload() {
  //jogo principal
  //backgroundImage1 = loadImage("");
  //backgroundImage2 = loadImage("");
  //pc_img=loadAnimation("")

  //Jogo corrida
   pathImg = loadImage("./CorridaImagens/Road.png");
  mainRacerImg1 = loadAnimation("./CorridaImagens/cavalo1.png","./CorridaImagens/cavalo2.png","./CorridaImagens/cavalo3.png","./CorridaImagens/cavalo4.png","./CorridaImagens/cavalo5.png","./CorridaImagens/cavalo6.png","./CorridaImagens/cavalo7.png","./CorridaImagens/cavalo8.png");
  mainRacerImg2= loadAnimation("./CorridaImagens/cavalo caido.png");
  
  oppPink1Img = loadAnimation("./CorridaImagens/npc1.png","./CorridaImagens/npc2.png","./CorridaImagens/npc3.png","./CorridaImagens/npc4.png","./CorridaImagens/npc5.png","./CorridaImagens/npc6.png","./CorridaImagens/npc7.png","./CorridaImagens/npc8.png");
  oppPink2Img = loadAnimation("./CorridaImagens/cavalo caido2.png");
  
  oppYellow1Img = loadAnimation("./CorridaImagens/hamburguer.png")
  
  oppRed1Img = loadAnimation("./CorridaImagens/npc1.png","./CorridaImagens/npc2.png","./CorridaImagens/npc3.png","./CorridaImagens/npc4.png","./CorridaImagens/npc5.png","./CorridaImagens/npc6.png","./CorridaImagens/npc7.png","./CorridaImagens/npc8.png");
  oppRed2Img = loadAnimation("./CorridaImagens/cavalo caido2.png");
  
  cycleBell = loadSound("./CorridaImagens/bell.mp3");
  gameOverImg = loadImage("./CorridaImagens/gameOver.png");
  //

  //Jogo de culinaria
   knifeImage = loadImage("./CulinariaImagens/MãoAberta.png");
  monsterImage = loadAnimation("./CulinariaImagens/alien1.png","./CulinariaImagens/alien2.png")
  fruit1 = loadImage("./CulinariaImagens/Pão.png");
  fruit2 = loadImage("./CulinariaImagens/Queijo.png");
  fruit3 = loadImage("./CulinariaImagens/Tomate.png");
  fruit4 = loadImage("./CulinariaImagens/Carne.png");
  fruit5 = loadImage("./CulinariaImagens/Alface.png");
  gameOverImage = loadImage("./CulinariaImagens/fimdeJogo.png")
  
  gameOverSound = loadSound("./CulinariaImagens/gameover.mp3")
  knifeSwooshSound = loadSound("./CulinariaImagens/knifeSwoosh.mp3")
  //


}

function setup() {
 createCanvas(1200,500);
 //moviemnto
 pc = createSprite(50,450,20,30);

  //Jogo de Corrida
  path=createSprite(100,250);
  path.addImage(pathImg);
  path.velocityX = -5;

  path.visible = false

  mainCyclist  = createSprite(120,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;

  mainCyclist.visible = false

  mainCyclist.debug = false

  mainCyclist.setCollider("rectangle",0,0,40,40);
  
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  
    
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  //

  //Jogo de Culinaria
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.4
  
    knife.setCollider("rectangle",0,0,40,40);

    score=0;
    fruitGroup=createGroup();
    monsterGroup=createGroup();
  //

}

function draw() 
{  
  //Jogo da "Morte"
  if(cena === 1){
    background("black");
    
   
  
  }
  //Corrida
  if(cena === 2){
    textSize(20);
  fill(255);
  text("Distance: "+ distance,100,30);

  path.visible = true
  mainCyclist.visible = true

  path.scale = 1
  mainCyclist.scale = 1
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 125 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    }else {
      redCyclists();
    }
     
  }
  if (World.frameCount % 200 == 0) {
    if (select_oppPlayer == 2) {
      yellowCyclists();
    } 
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
     player1.scale = 0.17
     player1.x = mainCyclist.x + 250
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      yellowCG.destroyEach()
      distance += 1
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
      player3.scale = 0.17
      player3.x = mainCyclist.x + 250
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    mainCyclist.scale = 0.2

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
  }
 }

  //Culinaria
  if(cena === 3){
     background("lightblue")
    if(gameState===PLAY){
    
    fruits();
    Monster();
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
       knifeSwooshSound.play();

       score=score+2;
      
    }
    else
    {
      if(monsterGroup.isTouching(knife)){
        gameState=END;

        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knife.addImage(gameOverImage);
        knife.scale=1;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  textSize(25);
  text("Pontuação: "+ score,250,50);
  }
  //Quiz
  if(cena === 4){
    
    
  }
  //Fim do Jogo
  if(cena === 5){
    
    
  }
  
  
  //comportamentos fora do estado de jogo
  textSize(10);
  text (mouseX + "," + mouseY, mouseX, mouseY)
  drawSprites();
}

//Jogo de Corrida
function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.5;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.1;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.5;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
 }
//

//Jogo de Culinaria
function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(1200,450,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,250,20,20);
    fruit.x = 0    

    fruit.velocityX= (7+(score/4));
     
     //fruit.debug=true;
     r=Math.round(random(1,5));
    if (r == 1) {
      fruit.addImage(fruit1);
      fruit.scale = 0.5
    } else if (r == 2) {
      fruit.addImage(fruit2);
      fruit.scale = 0.09
    } else if (r == 3) {
      fruit.addImage(fruit3);
      fruit.scale = 0.2
    } else if (r == 5) {
      fruit.addImage(fruit5);
      fruit.scale = 0.09
    }else {
      fruit.addImage(fruit4);
      fruit.scale = 0.09
    }
    
    
    fruit.y=Math.round(random(50,450));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
//