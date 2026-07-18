const toRadians = (degree) => {
    return degree * (Math.PI / 180);
};

const needle = document.getElementById("needle");
const diskRadius = Math.round(document.getElementById("disk").offsetHeight / 2);
const star = document.getElementById("star");
const scoreDisp = document.getElementById("score");
const starRadius = Math.round(star.offsetWidth / 2);
const angles = [180, 153, 139, 125, 110, 71, 56, 42, 27, 0, 333, 318, 304, 289, 250, 235, 221, 206];
let starSetAngle = 180;
let starSetIndex = angles.indexOf(starSetAngle);
let starAngle;
let angleSpeed = 2;
let timeSpeed = 35;
let angle = 0;
let play = false;
let lose = false;
let score = 0

const rotate = () => {
    angle += angleSpeed;
    angle %= 360;
    if (angle < 0) {
        angle = 360 + angle;
    }
    needle.style.transform = `rotate(${angle}deg)`;
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
                    console.log("boooo");
                    lose = true;
                }
            } else {
                if ((Math.abs(starAngle-angle) < 20) && (angle < (starAngle - 10))) {
                    play = false;
                    console.log("boooo2");
                    lose = true;
                }
                if (starAngle === 0) {
                    if ((angle > 340) && (angle < 350)) {
                        play = false;
                        console.log("boooo2");
                        lose = true;
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
    // console.log(`angle: ${starSetAngle}`)
    // console.log(`index: ${starSetIndex}`)
    // console.log(`normal: ${angles}`)
    // console.log(`good  : ${goodAngles}`)
    starSetAngle = goodAngles[Math.floor(Math.random() * goodAngles.length)];
    starSetIndex = angles.indexOf(starSetAngle);
    // console.log(starSetAngle);
    let x = Math.round((diskRadius - starRadius) * Math.cos(toRadians(starSetAngle)));
    let y = Math.round((diskRadius - starRadius) * Math.sin(toRadians(starSetAngle)));
    // console.log(`x: ${x}`)
    // console.log(`y: ${y}`)
    x = (x<0)? x+(starRadius*2): (x==0) ? x: x-(starRadius*2);
    y = (y<0)? y+(starRadius*2): (y==0) ? y: y-(starRadius*2);
    star.style.left = `${(diskRadius-starRadius)-5+y}px`;
    star.style.top = `${(diskRadius-starRadius)-5+x}px`;

    starAngle = starSetIndex * 20;
    console.log(`starAngle: ${starAngle}`);
}

spawnStar()

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space') && (!event.repeat)) {
        if (!play && !lose) {   
            play = true
            changeSpeed(timeSpeed)
            // timeSpeed = 10
            // setTimeout(() => changeSpeed(timeSpeed), 3000)
        } else {
            angleSpeed *= -1;
            console.log(`needle: ${angle}`);
            // console.log(`star: ${starAngle}`);
            if (starAngle > 0) {
                if (Math.abs(starAngle - angle) <= 10) {
                    console.log("YAY");
                    spawnStar();
                    score++;
                    scoreDisp.innerHTML = `Score: ${score}`;
                } else {
                    play = false;
                    lose = true;
                    console.log("aw")
                }
            } else {
                if ((Math.abs(starAngle - angle) <= 10) || Math.abs(360 - angle) <= 10) {
                   console.log("YAY");
                    spawnStar();
                    score++;
                    scoreDisp.innerHTML = `Score: ${score}`;
                } else {
                    play = false;
                    lose = true;
                    console.log("aw")
                }
            }
        }
    }
})