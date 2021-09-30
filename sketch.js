let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let nX,nY;
let r,l;
let state = false;
var message = [];
let d;
 
function setup() {
  createCanvas(640, 480);
  l = new Side(0,0,250,480);
  r = new Side(640-250,0,250,480);
  
  d = createDiv('this');
  
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    nX = poses[0].pose.keypoints[0].position.x;
    nY = poses[0].pose.keypoints[0].position.y;
    noseX = lerp(noseX, nX, 0.6);
    noseY = lerp(noseY, nY, 0.6);
  }
}

function modelReady() {
  console.log('model ready');
  state = true;
}

function draw() {
  frameRate(1);
  translate(width,0);
  scale(-1.0,1.0);
  image(video, 0, 0);
  
  l.show();
  r.show();
  
  GetMessage(nX);
  
  fill(255, 0, 0);
  ellipse(noseX, noseY, 50,50);

}


function GetMessage(x){
  let st = true;
  let ls = true;
  let rs = true;
  if(state == true){
   if(x > 250 && x < 390){
       d.html(message);
  }else if(x > 0 && x < 250 && rs == true){
       message.push(1);
    rs = false;
  }else if(x > 250 && x < width && ls == true){
       message.push(0);
    ls = false;
  }
}
}

// function keyPressed(){
//   if(key == ' '){
//      GetMessage(nX);
//   }
// }
