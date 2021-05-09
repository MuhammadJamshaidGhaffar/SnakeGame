


let position = {x:480 , y:0};
let snakeMovement = "right";
let maxRight = parseInt( document.getElementById('container').style.width);
setInterval(translateSnake , 100);


document.addEventListener("keydown", moveSnake);




function moveSnake(event){
    if(event.key == "ArrowDown")
    {
        snakeMovement = "down";
    }
    else if(event.key == "ArrowUp")
    {
        snakeMovement = "up";
    }
    else if(event.key == "ArrowLeft")
    {
        snakeMovement = "left";
    }
    else if(event.key == "ArrowRight")
    {
        snakeMovement = "right";
    }
    // alert(event.key);
    // alert(translateStr);
  }


  function translateSnake()
  {
      if(snakeMovement == "right")
      {
        position.x += 10 ;
        if(position.x >= maxRight)
        {
            position.x = 0;
        }
            
      }
      else if(snakeMovement == "left")
      {
        position.x -= 10 ;
      }
      else if(snakeMovement == "up")
      {
        position.y -= 10 ;
      }
      else if(snakeMovement == "down")
      {
        position.y += 10 ;
      }
    let translateStr = 'translate(' +position.x +'px ,'+position.y +'px )';
    document.getElementById('snake').style.transform = translateStr;
  }
  