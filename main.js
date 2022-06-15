song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristX = 0;
ScoreleftWrist = 0;
ScorerightWrist = 0;
song_1_Status = "";
song_2_Status = "";

function setup(){
   canvas = createCanvas(600,500);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
}
function preload(){
   song_1 = loadSound("on my way.mp3");
   song_2 = loadSound("stay.mp3")
}
function draw(){
   image(video, 0, 0, 600, 500);
   song_1_Status = song_1.isPlaying();
   song_2_Status = song_2.isPlaying();
   fill("orange")
   stroke("red")
   if(ScoreleftWrist>0.2){
   circle(leftWristX, leftWristY, 20);
   song_1.stop();
      if(song_2_Status = false){
      song_2.play();
      document.getElementById("song").innerHTML = "playing - Stay";
   }
}
   if(ScorerightWrist>0.2){
   circle(rightWristX, rightWristY, 20);
   song_2.stop();
      if(song_1_Status = false){
      song_1.play();
      document.getElementById("song").innerHTML = "playing - On my way";
   }
}
}
function play(){
   song.play();
   song.setVolume(1);
   song.rate(1);
}

function gotPoses(results){
   if(results.length>0){
      console.log(results);
      ScoreleftWrist = results[0].pose.keypoints[9].score;
      leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('leftWristX = ' + leftWristX + 'leftWristY =' + leftWristY);
        ScorerightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('rightWristX = ' + rightWristX + 'rightWristY = ' + rightWristY);
   }
}
function modelLoaded(){
   console.log("poseNet is initallised");
}