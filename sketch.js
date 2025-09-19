let playerSprite;
let floor;
let jumpSwitch = false;
let backgroundImg;
let plataformas;
let gravity = 500;
let key;
let uWin;
let winSwitch = false;
let obstacles;
let obstaclesSwitch = false;
let heart;
let lives = 3;
let gameOver;
let gameOverSwitch = false;
let botiquin;

function preload(){
backgroundImg = loadImage("assets/Back_1.png");
uWin = loadImage("assets/Back_2.png");
heart = loadImage("assets/Heart_1.png");
gameOver = loadImage("assets/Back_3.png");
}

function setup() {
    new Canvas(windowWidth, windowHeight);
    playerSprite = new Sprite();
    playerSprite.addAni('standing', 'assets/Standing.png');
    playerSprite.addAni('left','assets/Walking_Left_1.png','assets/Walking_Left_2.png','assets/Walking_Left_3.png');
    playerSprite.addAni('right','assets/Walking_Right_1.png','assets/Walking_Right_2.png','assets/Walking_Right_3.png')
    playerSprite.addAni('jumping', 'assets/Jumping_1.png','assets/Jumping_2.png');
    playerSprite.addAni('waiting', 'assets/Waiting.png');
    playerSprite.addAni('falling', 'assets/Falling.png');
    playerSprite.x= 800;
    playerSprite.y= 400;
    playerSprite.mass = 1;
    playerSprite.scale = 5;
    playerSprite.h= 75;
    playerSprite.w= 40;
    playerSprite.debug = false;
    floor = new Sprite(width/2,windowHeight+10,windowWidth,50,STATIC);
    floor.opacity = 0;

    world.gravity.y = gravity;

    key = new Sprite();
    key.addAni('key','assets/Key.png');
    key.x = 60;
    key.y = 100;
    key.static = true;
    key.scale = 0.2;
    key.w= 25;
    key.h= 60;
    key.debug= false;

    botiquin = new Sprite();
    botiquin.addAni('botiquin','assets/Botiquin.png');
    //botiquin.x = 550;
    //botiquin.y = 350;
    botiquin.x= -1000;
    botiquin.y= -1000;
    botiquin.scale = 0.3;
    botiquin.static= true;
    botiquin.h= 65;
    botiquin.w= 60;
    botiquin.debug= false;

    plataformas = new Group();
    plataformas.color = 'red';

   
    while (plataformas.length < 3) {
        let plataforma = new plataformas.Sprite();
        plataforma.x = plataformas.length * 220;
        plataforma.y = plataformas.length * height/6+200;
        plataforma.addAni('plataforma','assets/plataform_1.png');
        plataforma.scale = 0.5;
        plataforma.debug = false;
        plataforma.width = 100;
        plataforma.static = true;
        plataformas.h= 45;
        plataformas.w= 165;
    }
    print(plataformas[0])

    obstacles = new Group();
    while (obstacles.length < 3){

        let obstacle = new obstacles.Sprite();
        obstacle.x = obstacles.length * 250;
        obstacle.y = -800 * obstacles.length;
        obstacle.scale = 0.2;
        obstacle.addAni('obstaculo','assets/Obstacle.png');
        obstacle.static = 0;
        obstacle.gravityScale = 0.01;
        obstacle.h= 50;
        obstacle.w= 50;
        obstacle.radius= 20;
        obstacle.debug= false;
        obstacle.rotation= 0;
    }

    obstacles[0].x = 550;
    obstacles[1].x = 330;
    obstacles[2].x = 100;

    print(obstacles[0]);
}

function update() {
   image(backgroundImg,0,0,windowWidth,windowHeight);
      playerSprite.rotation = 0;

//Sistema de Vidas
   if(lives == 3){
       image(heart,width-100,50,50,50);
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 2){
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 1){
       image(heart,width-200,50,50,50);
   }

   if(playerSprite.collides(obstacles)){
       lives -= 1;
   }

   if(lives == 0){
       gameOverSwitch = true;
   }
   if(lives == 1){
    botiquin.x = 550;
    botiquin.y = 350;
   }
   if(lives == 3){
    botiquin.x= -1000;
    botiquin.y= -1000;
   }
   if(playerSprite.collides(botiquin)){
    lives = 3;

   }

//sistema de Colisiones

    if (playerSprite.collides(floor)||playerSprite.collides(plataformas)) {
        //playerSprite.velocity.y = 0;
        jumpSwitch = true;
    }

    if(playerSprite.collides(plataformas[2])){
        plataformas[2].position.x += random(-5,5);
   
    }
    if(playerSprite.collides(plataformas[1])){
        plataformas[1].position.x += random(-5,5);
       
    }
    if(playerSprite.collides(plataformas[0])){
        plataformas[0].position.x += random(-5,5);
       
    }


//    if(playerSprite.collides(plataformas)){
//        obstaclesSwitch = true;
//    }else{
//        obstaclesSwitch = false;
//    }

//    if(obstaclesSwitch == true){
//        obstacles[0].static = false;
//        obstacles[1].static = false;
//        obstacles[2].static = false;
//    }
    for(var i = 0; i<obstacles.lenght;i++){

   }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(floor)){
            obstacles[i].rotation = 0;
            obstacles[i].angle = 0;
            obstacles[i].y = -800;
            //obstacles[i].rotation = 0;
            obstacles[0].x = 550;
            obstacles[1].x = 330;
            obstacles[2].x = 100;
        }
    }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(key)){
            obstacles[i].rotation = 0;
            obstacles[i].angle = 0;
            obstacles[i].y = -800;
            //obstacles[i].rotation = 0;
            obstacles[0].x = 550;
            obstacles[1].x = 330;
            obstacles[2].x = 100;
        }
    }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(plataformas)){
            obstacles[i].rotation = 0;
            obstacles[i].angle = 0;
            obstacles[i].y = -800;
            //obstacles[i].rotation = 0;
            obstacles[0].x = 550;
            obstacles[1].x = 330;
            obstacles[2].x = 100;
        }
    }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(playerSprite)){
            obstacles[i].rotation = 0;
            obstacles[i].angle = 0;
            obstacles[i].y = -800;
            //obstacles[i].rotation = 0;
            obstacles[0].x = 550;
            obstacles[1].x = 330;
            obstacles[2].x = 100;
        }
    }
    

    //key Interaction

    if(playerSprite.collides(key)){
        print("Encontraste la llave!");
        winSwitch = true;
       
    }
    if(winSwitch){
        image(uWin,0,0,width,height);
        for(var i = 0;i<3;i++){
            plataformas[i].position.x = -500;
            obstacles[i].position.x = -1000;
        }
        key.position.x = -500;
        botiquin.position =-900;
    }
    //playerSprite.speed = 3;

    if (kb.released('d')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('a')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('w')) {
        playerSprite.changeAni('standing');
    }

    if (kb.pressing('w')&&jumpSwitch==true) {
        playerSprite.velocity.y = -50;
        playerSprite.changeAni('jumping');
        jumpSwitch = false;
       
    }  else if (kb.pressing('a')) {
        playerSprite.velocity.x = -10;
        playerSprite.changeAni('left');
    } else if (kb.pressing('d')) {
        playerSprite.velocity.x = 10;
        playerSprite.changeAni('right');
    } else {
      playerSprite.speed = 0;
    }

//Mecánica final del juego
    if(gameOverSwitch){
       image(gameOver,0,0,width,height);
       plataformas[0].x = -1000;
       plataformas[1].x = -1000;
       plataformas[2].x = -1000;
       playerSprite.x = -1000;
       key.x = -1000;
       botiquin.x= -2000;
       obstacles[0].x = -1000;
       obstacles[1].x = -1000;
       obstacles[2].x = -1000;
   }

}
