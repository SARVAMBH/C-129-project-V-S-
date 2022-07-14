song1 = "";
song2 = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreLeftWrist = 0;
status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.position(600,250)
    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video , modelLoaded);
    PoseNet.on('pose' , gotPoses);
}

function draw() {
    image(video,0,0,600,500);
    fill("#ffff00");
    stroke("#ffff00");
    status = true;
    if(scoreLeftWrist > 0.2) {
        circle(LeftWristX,LeftWristY,20);
        InNumberLeftWristY = Number(LeftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " +volume;
        song.setVolume(volume);
        song2.stop();
        }
        if(status = false) {
            song.play(song1);
        }
}

function modelLoaded()
{
    console.log("PoseNet is Initialized!");
}

function gotPoses(results) 
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " +scoreLeftWrist);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + LeftWristX + "LeftWristY = " + LeftWristY);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + RightWristX + "RightWristY = " + RightWristY);
    }
}