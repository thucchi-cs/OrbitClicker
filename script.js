const toRadians = (degree) => {
    return degree * (Math.PI / 180);
};

const needle = document.getElementById("needle");
const diskRadius = Math.round(document.getElementById("disk").offsetHeight / 2);
const star = document.getElementById("star");
const starRadius = Math.round(star.offsetWidth / 2);
const angles = [180, 153, 139, 125, 110, 71, 56, 42, 27, 0, 333, 318, 304, 289, 250, 235, 221, 206];
let starSetAngle = 180;
let starAngle;
let angleSpeed = 2;
let timeSpeed = 35;
let angle = 0;
let play = true;

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
    intervalID = setInterval(() => {if (play) {rotate()}}, timeout);
}

const getRandomStarAngle = () => {
    let angle = starSetAngle;
    while (Math.abs(starSetAngle-angle) < 45) {
        angle = Math.floor(Math.random() * ((starSetAngle-180) - (starSetAngle+180) + 1) + (starSetAngle+180));
    }
    angle = (angle<0) ? 360+angle: angle;
    return angle % 360;
}

const spawnStar = () => {
    let goodAngles = angles.slice(0);
    let starSetIndex = angles.indexOf(starSetAngle);
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
    // console.log(starSetAngle);
    let x = Math.round((diskRadius - starRadius) * Math.cos(toRadians(starSetAngle)));
    let y = Math.round((diskRadius - starRadius) * Math.sin(toRadians(starSetAngle)));
    // console.log(`x: ${x}`)
    // console.log(`y: ${y}`)
    x = (x<0)? x+(starRadius*2): (x==0) ? x: x-(starRadius*2);
    y = (y<0)? y+(starRadius*2): (y==0) ? y: y-(starRadius*2);
    star.style.left = `${(diskRadius-starRadius)-5+y}px`;
    star.style.top = `${(diskRadius-starRadius)-5+x}px`;

    starAngle = (360 - (starSetAngle - 180)) % 360;
    // console.log(`starAngle: ${starAngle}`);
}

changeSpeed(timeSpeed)

timeSpeed = 20
setTimeout(() => changeSpeed(timeSpeed), 3000)

spawnStar()

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space') && (!event.repeat)) {
        angleSpeed *= -1;
        // console.log(`needle: ${angle}`);
        // console.log(`star: ${starAngle}`);
        if (starAngle >= 8) {
            // play = false
            // if (Math.abs(starAngle - angle) <= 8) {
            //     console.log("YAY");
            // } else {
            //     console.log("aw")
            // }
        }
        spawnStar();
    }
})