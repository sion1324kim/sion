var petals = [];
var midpetals = [];
var innerpetals = [];
// The original status of the pedals is still.
var mode = "still";
var mic;
// variables for control three layers
var onFirst = false;
var onSecond = false;
var onThird = false;
var petalPic = "말이 씨가 된다";
var petalPic_arr = [];
let myFont;

//preload images
function preload() {
  stemPic = loadImage("stem.png");
  mouthPic = loadImage("mouth.png");
  myFont = loadFont('myFont.otf');
}

function setup() {
  textFont(myFont);
	mic = new p5.AudioIn();
  mic.start();
    createCanvas(windowWidth, windowHeight);
    noStroke();
  let petalPics = petalPic.split(" ");
  
//the loop of the petals to reach the number set
    var count = 15;
    var span = PI*2/count;
	for (var i = 0; i < count; i++) {
// put the object of petals into the array of petals
		   petals.push(new Petal(windowWidth/2,windowHeight/2+100,span*i,i));
       midpetals.push(new Midpetal(windowWidth/2,windowHeight/2+100,span*i,i));
       innerpetals.push(new Innerpetal(windowWidth/2,windowHeight/2+100,span*i,i));
	}
}

function draw() {
    background(80);
  fill(255,255,255,255);
  //the location of "말이 씨가 된다"
  textAlign(CENTER,TOP);
  textSize(50);
  text("말이 씨가 된다", windowWidth/2, windowHeight/4);
  textAlign(TOP,CENTER);
  textSize(15);
	  micLevel = mic.getLevel()*100; //get microphone volume
  	//the location and size of dandelion stem
	//add rotation to create swinging with breeze effect
	  translate(windowWidth/2-20, windowHeight);
	  rotate(sin(frameCount/100)/40);
		translate(-windowWidth/2+20, -windowHeight);
    image(stemPic, windowWidth/2-26, windowHeight/2+73, 40, 300);
  image(mouthPic, windowWidth/2-60, windowHeight/2+70, 120, 60)
	
	// set three different conditions for three layers of petals
	//if microphone's volume reachs 50, onFirst is executed
	//if microphone's volume reachs 70, onSecond is executed
	//if microphone's volume reachs 80, onThird is executed
	if (micLevel > 30){
		onFirst = true;
	}
	if (micLevel > 50){
		onSecond = true;
	}
	if (micLevel > 70){
		onThird = true;
	}
	//the object of petals
	for (var i = 0; i < petals.length; i++) {
        if (mode=="move1"){
            petals[i].move();
          
        }else if(mode=="move2"){
            midpetals[i].move();
            petals[i].move();  
        }else if(mode=="move3"){
            innerpetals[i].move();
            midpetals[i].move();
            petals[i].move();  
        }
        petals[i].draw();
        midpetals[i].draw();
        innerpetals[i].draw();   
    }
	
if (onFirst == true) {
	mode = "move1";
  }
if (onSecond == true) {
	mode = "move2";
  }
if (onThird == true) {
	mode = "move3";
  }
}
 
function Petal(xs,ys,rot,index) {
//define the parameters of the petals
  var x, y;
	this.index=index
  this.xBegin = xs;
  this.yBegin = ys;
  this.xDis = random(50,100);
  this.xSpeed = random(0,2);
  this.xTheta = random(360);
  this.ox = this.xBegin;
  this.oy = this.yBegin;
  this.rotateT = -rot;
  this.size = random(20, 50);
  this.ySpeed = this.size / 80;
  this.sizeYT = random(360);
  this.sizeYSpeed = this.size / 50;
  this.sizeYScale = 0;
  this.draw = function() {
    fill(255,255,255,150);
    push();		
//translate ordinate system
    translate(this.ox, this.oy);
    rotate(this.rotateT);
		rotate(sin(frameCount/(40+noise(index)*50)+noise(index))/16);
    
//draw the shape
    beginShape();
    x = 0;
    y = 3;
    textSize(10)
    text(petalPic, x, y, this.size*3*0.35, this.size*4*0.35);
    endShape(CLOSE);
    pop();
  };

//define the move method of object pedal by variation in x and y
  this.move = function() {
    this.xBegin -= this.xDis * 0.05;
    this.ox = this.xBegin;
    this.oy -= this.ySpeed * random(1, 3);
    this.xTheta += this.xSpeed; 
    this.sizeYT += this.sizeYSpeed;
    this.sizeYScale = abs(sin(radians(this.sizeYT)));
    if (this.ox < 0) {
      this.xDis = this.xDis*-1
    }
    if (this.ox > width) {
      this.xDis = this.xDis*-1
    }
    if (this.oy < 0) {
      this.ySpeed = this.ySpeed*-1
    }
    if (this.oy > height) {
      this.ySpeed = this.ySpeed*-1
    }
  }
}

function Midpetal(xs,ys,rot) {
//define the parameters of the petals
  var x, y;
  this.xBegin = xs;
  this.yBegin = ys;
  this.xDis = random(50,100);
  this.xSpeed = random(1.5, 1.8);
  this.xTheta = random(360);
  this.ox = this.xBegin;
  this.oy = this.yBegin;
  this.rotateT = rot*1.5;
  this.size = random(50,100);
  this.ySpeed = this.size / 80;
  this.sizeYT = random(360);
  this.sizeYSpeed = this.size / 50;
  this.sizeYScale = 0;
  this.draw = function() {
    fill(255,255,255,150);
    push();
//translate ordinate system
    translate(this.ox, this.oy);
    rotate(this.rotateT);	
      
//draw the shape
		beginShape();
    x = 0;
    y = 3;
    text(petalPic, x, y, this.size*3*0.3, this.size*4*0.3);
    endShape(CLOSE);
    pop();
  };

 //define the move method of object petal by variation in x and y
  this.move = function() {
    this.xBegin += this.xDis * 0.04
    this.ox = this.xBegin;
    this.oy -= this.ySpeed* random(1, 3);
    this.xTheta += this.xSpeed; 
    this.sizeYT += this.sizeYSpeed;
    this.sizeYScale = abs(sin(radians(this.sizeYT)));
    if (this.ox < 0) {
      this.xDis = this.xDis*-1
    }
    if (this.ox > width) {
      this.xDis = this.xDis*-1
    }
    if (this.oy < 0) {
      this.ySpeed = this.ySpeed*-1
    }
    if (this.oy > height) {
      this.ySpeed = this.ySpeed*-1
    }
  }
}

function Innerpetal(xs,ys,rot) {
//define the parameters of the petals
  var x, y;
  this.xBegin = xs;
  this.yBegin = ys;
  this.xDis = random(50,100);
  this.xSpeed = random(1.5, 1.8);
  this.xTheta = random(360);
  this.ox = this.xBegin;
  this.oy = this.yBegin;
  this.rotateT = rot*2;
  this.size = 100;
  this.ySpeed = this.size / 80;
  this.sizeYT = random(360);
  this.sizeYSpeed = this.size / 50;
  this.sizeYScale = 0;
  this.draw = function() {
    fill(255,255,255,150);
    push();
//translate ordinate system
    translate(this.ox, this.oy);
    rotate(this.rotateT);
      
//draw the shape
		beginShape();
    x = 0;
    y = 3;
    text(petalPic, x, y, this.size*3*0.3, this.size*4*0.3);
    endShape(CLOSE);
    pop();
  };
	
 //define the move method of object pedal by variation in x and y
  this.move = function() {
    this.xBegin += this.xDis * 0.02
    this.ox = this.xBegin;
    this.oy -= this.ySpeed* random(1, 3);
    this.xTheta += this.xSpeed; 
    this.sizeYT += this.sizeYSpeed;
    this.sizeYScale = abs(sin(radians(this.sizeYT)));
    if (this.ox < 0) {
      this.xDis = this.xDis*-1
    }
    if (this.ox > width) {
      this.xDis = this.xDis*-1
    }
    if (this.oy < 0) {
      this.ySpeed = this.ySpeed*-1
    }
    if (this.oy > height) {
      this.ySpeed = this.ySpeed*-1
    }
  }
}

//tried to use keyTyped to control the petals
function keyTyped() {
  if (key == 'a') {
    mode = "move1";
  }
	if (key == 's') {
    mode = "move2";
  }
	if (key == 'd') {
    mode = "move3";
  }
}