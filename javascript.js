

//----------- Global variables ------------
//--------- Game Objects --------------
let Snake = {head : {x:0 , y:0} , body : []};
let Apple = {x : 0 , y:0 };

//--------- Game States ---------------
let snakeMovement = "right";
let Score = 0;

//-------- conatiner------------
let width = 50;
let height = 50;
let boxSize = 10;
let finalWidth = boxSize * width;
let finalHeight = boxSize * height;

let gameStateInfoHeight = 30;


//--------- Utility Functions ------------
function isCollide(object1 , object2){
  if(object1.x == object2.x && object1.y == object2.y)
    return true;
  return false;
}
function isHeadCollide(position){
  if(isCollide(Snake.head , position))
    return true;
  return false;
}
function isAppleCollideWithBody(){
  if(isCollide(Snake.head , Apple))
    return true;
  for(let bodyDot =0 ; bodyDot <  Snake.body.length ; bodyDot++)
  {
    if(isCollide(bodyDot , Apple))
      return true;
  }
  return false;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
//------ Spawn Functions --------------
function spawnApple()
{
  do{
    Apple.x = getRndInteger(0 , width);
    Apple.y = getRndInteger(0 , height);
  }
  while(isAppleCollideWithBody());
  Apple.x *= boxSize;
  Apple.y *= boxSize;
  document.getElementById("apple").style.transform = 'translate(' +Apple.x +'px ,'+Apple.y +'px )';
}
function addBodyDot()
{
  let snakeBody = document.createElement('div');
  snakeBody.className = "snakeBody";
  document.getElementById('container').appendChild(snakeBody);
  Snake.body.push({x:0 , y:0});
}
//-------- update functions --------------
function moveSnake(event){
  //------ bug ----
  //-- if we press two keys at the same time then snake can move opposite to its current direction
    if(event.key == "ArrowDown")
    {
      if(snakeMovement == "up")
        return;
      snakeMovement = "down";
    }
    else if(event.key == "ArrowUp")
    {
      if(snakeMovement == "down")
        return;
      snakeMovement = "up";
    }
    else if(event.key == "ArrowLeft")
    {
      if(snakeMovement == "right")
        return;
      snakeMovement = "left";
    }
    else if(event.key == "ArrowRight")
    {
      if(snakeMovement == "left")
        return;
      snakeMovement = "right";
    }
    // alert(event.key);
    // alert(translateStr);
  }
  function translateSnake()
{
  if(snakeMovement == "right")
  {
    Snake.head.x += boxSize ;
    if(Snake.head.x >= finalWidth)
    {
      Snake.head.x = 0;
    }      
  }
  else if(snakeMovement == "left")
  {
    Snake.head.x -= boxSize ;
    if(Snake.head.x < 0)
    {
      Snake.head.x = finalWidth;
    }
  }
  else if(snakeMovement == "up")
  {
    Snake.head.y -= boxSize ;
    if(Snake.head.y < 0)
    {
      Snake.head.y = finalHeight;
    }
  }
  else if(snakeMovement == "down")
  {
    Snake.head.y += boxSize ;
    if(Snake.head.y >= finalHeight)
    {
      Snake.head.y = 0;
    }
  }
document.getElementById('snake').style.transform = 'translate(' +Snake.head.x +'px ,'+Snake.head.y +'px )';
}
function moveBody(snakeOldHead)
{
  for(let bodyDot = Snake.body.length-1 ; bodyDot >  0 ; bodyDot--)
  {
    Snake.body[bodyDot].x = Snake.body[bodyDot-1].x;
    Snake.body[bodyDot].y = Snake.body[bodyDot-1].y;
  }
  Snake.body[0].x = snakeOldHead.x;
  Snake.body[0].y = snakeOldHead.y;
}
function printBody()
{
  let snakeBody = document.getElementsByClassName("snakeBody");
  for(let bodyDot =0 ; bodyDot < snakeBody.length  ; bodyDot++)
  {
    console.log("bodyDot["+bodyDot+"].x = " + Snake .body[bodyDot].x);
    snakeBody[bodyDot].style.transform = 'translate(' +Snake.body[bodyDot].x +'px ,'+Snake.body[bodyDot].y +'px )';

  }
}
function updateBody(snakeOldHead)
{
  moveBody(snakeOldHead);
  printBody();
}
function updateScore()
{
  document.getElementById("score-value").innerHTML = Score;
}



//--------------- Game Start --------------
document.getElementById("game-state-info").style.width = finalWidth+"px";
document.getElementById("game-state-info").style.height= gameStateInfoHeight+"px";

document.getElementById("container").style.width = finalWidth+"px";
document.getElementById("container").style.height= finalHeight+"px";

document.getElementById("snake").style.width = boxSize+"px";
document.getElementById("snake").style.height= boxSize+"px";

document.getElementById("apple").style.width = boxSize+"px";
document.getElementById("apple").style.height= boxSize+"px";

spawnApple();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();
addBodyDot();


//---------- starting Game Loop ---------------
document.addEventListener("keydown", moveSnake);
setInterval(gameLoop , 100);

//--------------- Game Loop ------------------
function gameLoop()
{
  let snakeOldHead = {x : Snake.head.x  , y : Snake.head.y} ;
  translateSnake();
  updateBody(snakeOldHead);
  if(isHeadCollide(Apple))
  {
    spawnApple();
    addBodyDot();
    Score++;
    updateScore();
    
  }
  
}

  