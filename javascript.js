

//----------- Global variables ------------
//--------- Game Objects --------------
let Snake = {head : {x:0 , y:0} , body : []};
let Apple = {x : 0 , y:0 };

//--------- Game States ---------------
let snakeMovement = "right";
let Score = 0;
let gameStatus = "Not Running";

//-------- conatiner------------
let width = 50;
let height = 50;
let boxSize = 10;
let finalWidth = boxSize * width;
let finalHeight = boxSize * height;

let gameStateInfoHeight = 30;

//----------- Setting up width and height ------------------
document.getElementById("game-state-info").style.width = finalWidth+"px";
document.getElementById("game-state-info").style.height= gameStateInfoHeight+"px";

document.getElementById("container").style.width = finalWidth+"px";
document.getElementById("container").style.height= finalHeight+"px";

document.getElementById("snake").style.width = boxSize+"px";
document.getElementById("snake").style.height= boxSize+"px";

document.getElementById("apple").style.width = boxSize+"px";
document.getElementById("apple").style.height= boxSize+"px";

//--------- Utility Functions ------------
function isCollided(object1 , object2){
  if(object1.x == object2.x && object1.y == object2.y)
    return true;
  return false;
}
function isHeadCollided(position){
  if(isCollided(Snake.head , position))
    return true;
  return false;
}
function isHeadCollidedWithBody()
{
  for(let bodyDot = 0  ; bodyDot < Snake.body.length ; bodyDot++){
    if(isHeadCollided(Snake.body[bodyDot]))
      return true;
  }
  return false;
}
function isAppleCollidedWithBody(){
  if(isCollided(Snake.head , Apple))
    return true;
  for(let bodyDot =0 ; bodyDot <  Snake.body.length ; bodyDot++)
  {
    if(isCollided(bodyDot , Apple))
      return true;
  }
  return false;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
//------- Input Detection Functions --------------
function changeSnakeDirection(event){
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
      
  }
function gameNotRunningKeysDetection(event)
{
  if(event.key == "Enter")
  {
    gameRestart();
    
  }
}
//------ Spawn Functions --------------
function spawnApple()
{
  do{
    Apple.x = getRndInteger(0 , width);
    Apple.y = getRndInteger(0 , height);
  }
  while(isAppleCollidedWithBody());
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
function removeBody()
{
  let snakeBody =  document.getElementsByClassName('snakeBody');
  for(let i=0 ; i<snakeBody.length ; i++)
  {
    snakeBody[i].parentNode.removeChild(snakeBody[i]);
  }
  alert("removed Body");
}

//-------- update functions --------------

function updateBody(snakeOldHead)
{
  translateBody(snakeOldHead);
  printBody();
}
function updateScore()
{
  document.getElementById("score-value").innerHTML = Score;
}
//---------- Movement Functions----------------
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
}
function translateBody(snakeOldHead)
{
  for(let bodyDot = Snake.body.length-1 ; bodyDot >  0 ; bodyDot--)
  {
    Snake.body[bodyDot].x = Snake.body[bodyDot-1].x;
    Snake.body[bodyDot].y = Snake.body[bodyDot-1].y;
  }
  Snake.body[0].x = snakeOldHead.x;
  Snake.body[0].y = snakeOldHead.y;
}
//------------- Print Functions -----------------
function printSnakeHead()
{
  document.getElementById('snake').style.transform = 'translate(' +Snake.head.x +'px ,'+Snake.head.y +'px )';
}

function printBody()
{
  let snakeBody = document.getElementsByClassName("snakeBody");
  for(let bodyDot =0 ; bodyDot < snakeBody.length  ; bodyDot++)
  {
    snakeBody[bodyDot].style.transform = 'translate(' +Snake.body[bodyDot].x +'px ,'+Snake.body[bodyDot].y +'px )';

  }
}
function printSnake(){
  printSnakeHead();
  printBody();
}

//------------- Game Logic---------------
function gameLoop()
{
  //---------- Moving Snake ---------------
  let snakeOldHead = {x : Snake.head.x  , y : Snake.head.y} ;
  translateSnake();
  if(isHeadCollided(Apple))
  {
    spawnApple();
    Score++;
    updateScore();
    addBodyDot();
  }
  else if(isHeadCollidedWithBody())
  {
    
    gameOver();
    return;
  }
  // ---------- Printing --------------
  printSnakeHead();
  updateBody(snakeOldHead);
}

function gameOver()
{
  clearInterval(threadId);
  gameStatus = "Not Running";
  document.getElementById('game-over-text').style.opacity = "1";
  document.removeEventListener("keydown", changeSnakeDirection);
  document.addEventListener("keydown", gameNotRunningKeysDetection);
}
function gameRestart()
{
  //----------- Removing GameOver Text ----------------
  document.getElementById('game-over-text').style.opacity = "0";
  // ----- seeting up listeners ---------------
  document.removeEventListener("keydown", gameNotRunningKeysDetection);
  document.addEventListener("keydown", changeSnakeDirection);
  //------- Resetting Variables-------------
  Snake = {head : {x:0 , y:0} , body : []};
  Apple = {x : 0 , y:0 };
  snakeMovement = "right";
  Score = 0;
  //--------- Deleting Spawned Objects ---------------------
  removeBody();
  //----------- Running Game Again --------------
  main();
      
}

function main()
{
  //--------------
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
  //---------- starting Game Loop ---------------
  gameStatus = "Running";
  document.addEventListener("keydown", changeSnakeDirection);
  threadId =  setInterval(gameLoop , 100);
}

main();
  