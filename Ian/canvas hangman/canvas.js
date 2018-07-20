//remove the button and this event listener
//instead, when the user makes a wrong guess
//call incorrectAnswer() function
document.querySelector("button").addEventListener("click", incorrectAnswer);
////////////////////////////////////////////////////

//game
var numberOfIncorrectGuesses = 0;

function incorrectAnswer(){
		++numberOfIncorrectGuesses;
    updateCanvas();
    if (numberOfIncorrectGuesses === draw.length-1){
    		setTimeout(function(){
        		alert("Game over!");
        		numberOfIncorrectGuesses = 0;
        		updateCanvas();
        }, 1);
    }
}

//global variables
var canvas = document.querySelector("canvas");
		ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    
var draw = [
	drawScaffold,
  drawHead,
  drawBody,
  drawRightLeg,
  drawLeftLeg,
  drawRightArm,
  drawLeftArm
];

function updateCanvas(){
		ctx.clearRect(0, 0, width, height);
		for (let i=0; i<=numberOfIncorrectGuesses; i++){
    		draw[i]();
    }
}

function drawRightArm(){
		ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width/2, height*2.6/7);
    ctx.lineTo(width/2 + width/25, height*3.5/7);
    ctx.stroke();
}

function drawLeftArm(){
		ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width/2, height*2.6/7);
    ctx.lineTo(width/2 - width/25, height*3.5/7);
    ctx.stroke();
}

function drawRightLeg(){
		ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2 + width/25, height*2/3);
    ctx.stroke();
}

function drawLeftLeg(){
		ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2 - width/25, height*2/3);
    ctx.stroke();
}

function drawBody(){
    ctx.lineWidth = 2;
		ctx.beginPath();
    ctx.moveTo(width/2, height*1.25/5 + height/10);
    ctx.lineTo(width/2, height/2);
    ctx.stroke();
}

function drawHead(){
		var radius = height/20;
		ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width/2, height*1.25/5 + radius, radius, 0, Math.PI*2);
    ctx.stroke();
}
    
function drawScaffold(){
		ctx.lineWidth = 5;
    //base
    ctx.beginPath();
    ctx.moveTo(width/3, height*4/5);
    ctx.lineTo(width*4/5, height*4/5);
    ctx.stroke();
    //scaffold
    ctx.beginPath();
    ctx.moveTo(width*3.5/5, height*4/5);
    ctx.lineTo(width*3.5/5, height/5);
    ctx.lineTo(width/2, height/5);
    ctx.lineTo(width/2, height*1.25/5);
    ctx.stroke();
}

updateCanvas();