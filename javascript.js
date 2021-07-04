//all variables
let inputDir={x:0,y:0};
const eatingsound=new Audio('music/food.mp3');
const gameoversound=new Audio('music/gameover.mp3');
const backgroundmusic=new Audio('music/bmusicL.mp3');
let speed=6;
let lastpainttime=0;
let snakeArr=[{x:5,y:8}]
let food={x:6,y:7};
let score=0;
var highestscore;

//Game function
function main(ctime){
    window.requestAnimationFrame(main);
    backgroundmusic.play();
    
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
    
}
function isCollide(){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
            return true;
        }
    }
         // If you bump into the wall
    if(snakeArr[0].x >= 12 || snakeArr[0].x <=0 || snakeArr[0].y >= 12 || snakeArr[0].y <=0){
        return true;
    }
    
    return false;
   }

function gameEngine(){
    //update snake array and food
    //if snake is collided
    if(isCollide())
    {
        gameoversound.play();
        backgroundmusic.pause();
        inputDir={x:0,y:0};
        if(highestscore<score||highestscore==undefined)
        {highestscore=score;
        document.getElementsByClassName('highest')[0].innerHTML='Highest score:'+highestscore;}
        alert("Game over.Press any enter to play again");
        snakeArr=[{x:5,y:5}];
        backgroundmusic.play();
        score=0;
        food={x:Math.floor(Math.random()*11)+2,y:Math.floor(Math.random()*11)+2};
        document.getElementsByClassName('live')[0].innerHTML='Live score:'+score;
       
    }
    
    //if food is eaten
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        eatingsound.play();
        score++;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        food={x:Math.floor(Math.random()*11)+1,y:Math.floor(Math.random()*11)+1}
        document.getElementsByClassName('live')[0].innerHTML='Live score:'+score;
    }
    //moving snake
 
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{//for Each ()method calls a function once for each element in an array
    tailElement=document.createElement('div');//to increase the size of snake
    tailElement.style.gridRowStart=e.y;
    tailElement.style.gridColumnStart=e.x;
    if(index===0)
    {tailElement.classList.add('head');}
    else
    {tailElement.classList.add('tail');}
    board.appendChild(tailElement);//appends a node as last child of a node
    });
    //display food
    foodElement=document.createElement('div');//to increase the size of snake
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}
//main logic starts here
//better than setInterval. It fires main once only
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:1,y:0}
    //movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x=0;
            inputDir.y=-1;
            break;
         case "ArrowDown":   
            console.log('ArrowDown');
            inputDir.x=0;
            inputDir.y=1;
             break;    
         case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x=-1;
            inputDir.y=0;
            break;
         case "ArrowRight":
             
            console.log('ArrowRight');
             inputDir.x=1;
            inputDir.y=0;
             break;   
            default:
            break;
    }
})  


