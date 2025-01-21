// Constant Veriables
let inputdir={x:0 , y:0};
let foodsound=new Audio('food.mp3');
let gameoversound=new Audio('gameover.mp3');
let movesound=new Audio('move.mp3');
let musicsound=new Audio('music.mp3');
let speedincreasesound=new Audio('winningacoin.wav');
let highscoreachived=new Audio('levelcomplete.wav');
let bonussound=new Audio('bonus.wav');
let aansound=new Audio('aaaan.mp3');
let moyefullsound=new Audio('moyefull.mp3');
let moyesound=new Audio('moye.mp3');

let lastpainttime=0;
let initialspeed=10;
let speed=initialspeed;
let Score=0;
let speedenhancer=5;
let shouldspeedincrease=true;
let bonus=15;

let snakearr=[
    {x:10,y:9}
];
let food={x:5,y:5};
// Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000 < (1/speed)){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}

function iscollide(sarr){
    for (let i = 1; i <sarr.length; i++) {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y)
        {
            return true;
        }
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0)
    {
        return true;
    }
    return false;
}

 function gameEngine(){
//     // part 1: Updating the snake array and food
    
    // if the snake collides with itself or with the wallsq
    if(iscollide(snakearr))
    {
        // musicsound.pause();
        // moyesound.play();
        gameoversound.play();
        //  aansound.play();
        //  moyesound.play();
        
        inputdir={x:0 , y:0};
        alert("Game Over, Press any key to play Again!");
        if(Score>highscoreval)
        {
            highscoreval=Score;
            localStorage.setItem('hiscore' , JSON.stringify(highscoreval));
            highscore.innerHTML='High Score: ' + highscoreval;
        }
        Score=0;
        document.getElementById('score').innerHTML='Score: ' + Score ;
        snakearr=[{x:13 , y:15}];
        if(shouldspeedincrease){
            speed=initialspeed;
        speedshowing.innerHTML='Speed: ' + speed;
        }
        
        //musicsound.play();
        
    }

    // if the snake has eaten the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x)
    {
        foodsound.play();
        Score+=1;
        // increasing the speed after the speedenhancing interval.
        if(shouldspeedincrease){
            if(Score%speedenhancer===0)
                {
                    speed+=1;
                    speedincreasesound.play();
                }
        }
        speedshowing.innerHTML='Speed: ' + speed;
        score.innerHTML='Score: ' + Score; 
        if(Score===highscoreval+1)
        {
           highscoreachived.play();
        }
        if(Score%bonus==0)
        {
            // bonussound.play();
        }

        snakearr.unshift({x:snakearr[0].x + inputdir.x , y:snakearr[0].y + inputdir.y})
        let a=1;
        let b=17;
        food={x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }

    // moving the snake
      for (let i =snakearr.length-2 ; i >=0 ; i--) {
        snakearr[i+1]={...snakearr[i]};
        
      }
    
      snakearr[0].x += inputdir.x;
      snakearr[0].y += inputdir.y;

      

    // part 2: Display the snake array
    board.innerHTML="";
    snakearr.forEach((e,index) => {
    snakeelement=document.createElement('div');
    snakeelement.style.gridRowStart=e.y;
    snakeelement.style.gridColumnStart=e.x;
    
    if(index===0)
    {
        snakeelement.classList.add('head');
       
    }
    else
    {
        snakeelement.classList.add('snake');
    }
    board.appendChild(snakeelement);

   });

   // Display the Food
   foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);

}

// Main logic starts here
let hiscore=localStorage.getItem('hiscore');
if(hiscore===null)
{
    highscoreval=0;
    localStorage.setItem('hiscore' , JSON.stringify(highscoreval));
    
}
else{
    highscoreval=JSON.parse(hiscore);
    highscore.innerHTML='High Score: ' + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputdir={x:0 , y:1};
    speedshowing.innerHTML='Speed: ' + speed;
     movesound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case 'ArrowDown':
            inputdir.x=0;
            inputdir.y=1;
            break; 
        case 'ArrowLeft':
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case 'ArrowRight':
            inputdir.x=1;
            inputdir.y=0;
            break;    
    
        default:
            break;
    }

})

