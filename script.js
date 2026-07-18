const toRadians = (degree) => {
    return degree * (Math.PI / 180);
};

const needle = document.getElementById("needle");
const diskRadius = Math.round(document.getElementById("disk").offsetHeight / 2);
const star = document.getElementById("star");
const scoreDisp = document.getElementById("score");
const directions = document.getElementById("directions");
const starRadius = Math.round(star.offsetWidth / 2);
const angles = [180, 153, 139, 125, 110, 71, 56, 42, 27, 0, 333, 318, 304, 289, 250, 235, 221, 206];
let starSetAngle = 180;
let starSetIndex = angles.indexOf(starSetAngle);
let starAngle;
let angleSpeed = 2;
let timeSpeed = 30;
let angle = 0;
let play = false;
let lose = false;
let game = false;
let score = 0;
const bgColor = "white";

const rotate = () => {
    angle += angleSpeed;
    angle %= 360;
    if (angle < 0) {
        angle = 360 + angle;
    }
    needle.style.transform = `rotate(${angle}deg)`;
}

function changeColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}

let intervalID;
const changeSpeed = (timeout) => {
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        if (play) {
            rotate()
            if (angleSpeed > 0) {
                if ((Math.abs(starAngle-angle) < 20) && (angle > (starAngle + 10))) {
                    play = false;
                    lose = true;
                    changeColor('red');
                    setTimeout(() => {changeColor(bgColor)}, 300); 
                }
            } else {
                if ((Math.abs(starAngle-angle) < 20) && (angle < (starAngle - 10))) {
                    play = false;
                    lose = true;
                    changeColor('red');
                    setTimeout(() => {changeColor(bgColor)}, 300); 
                }
                if (starAngle === 0) {
                    if ((angle > 340) && (angle < 350)) {
                        play = false;
                        lose = true;
                        changeColor('red');
                        setTimeout(() => {changeColor(bgColor)}, 300); 
                    }
                }
            }
        }
    }, timeout);
}

const spawnStar = () => {
    let goodAngles = angles.slice(0);
    if (starSetIndex === 0) {
        goodAngles.splice(0, 2);
        goodAngles.splice(-1, 1);
    } else if (starSetIndex === angles.length-1) {
        goodAngles.splice(starSetIndex-1,2);
        goodAngles.splice(0,1);
    } else {
        goodAngles.splice(starSetIndex-1,3);
    }
    starSetAngle = goodAngles[Math.floor(Math.random() * goodAngles.length)];
    starSetIndex = angles.indexOf(starSetAngle);
    let x = Math.round((diskRadius - starRadius) * Math.cos(toRadians(starSetAngle)));
    let y = Math.round((diskRadius - starRadius) * Math.sin(toRadians(starSetAngle)));
    x = (x<0)? x+(starRadius*2): (x==0) ? x: x-(starRadius*2);
    y = (y<0)? y+(starRadius*2): (y==0) ? y: y-(starRadius*2);
    star.style.left = `${(diskRadius-starRadius)-5+y}px`;
    star.style.top = `${(diskRadius-starRadius)-5+x}px`;

    starAngle = starSetIndex * 20;
}

spawnStar()

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space') && (!event.repeat)) {
        if (!game) {
            directions.style.opacity = 0;
            game = true;
        } else if (!play && !lose) {   
            play = true;
            changeSpeed(timeSpeed);
        } else if (!play && lose) {
            starSetAngle = 180;
            starSetIndex = angles.indexOf(starSetAngle);
            starAngle;
            angleSpeed = 2;
            timeSpeed = 30;
            angle = 0;
            play = false;
            lose = false;
            score = 0;
            needle.style.transform = `rotate(0deg)`;
            spawnStar();
            scoreDisp.innerHTML = `Score: ${score}`;
        } else {
            angleSpeed *= -1;
            if (starAngle > 0) {
                if (Math.abs(starAngle - angle) <= 10) {
                    spawnStar();
                    score++;
                    if ((score % 5 === 0) && (timeSpeed > 10)) {
                        timeSpeed -= 10
                        changeSpeed(timeSpeed)
                    }
                    scoreDisp.innerHTML = `Score: ${score}`;
                } else {
                    play = false;
                    lose = true;
                    changeColor('red');
                    setTimeout(() => {changeColor(bgColor)}, 300); 
                }
            } else {
                if ((Math.abs(starAngle - angle) <= 10) || Math.abs(360 - angle) <= 10) {
                    spawnStar();
                    score++;
                    if ((score % 5 === 0) && (timeSpeed > 10)) {
                        timeSpeed -= 10
                        changeSpeed(timeSpeed)
                    }
                    scoreDisp.innerHTML = `Score: ${score}`;
                } else {
                    play = false;
                    lose = true;
                    changeColor('red');
                    setTimeout(() => {changeColor(bgColor)}, 300); 
                }
            }
        }
    }
})