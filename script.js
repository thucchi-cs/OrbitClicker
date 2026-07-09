const toRadians = (degree) => {
    return degree * (Math.PI / 180);
};

const needle = document.getElementById("needle");
const diskRadius = Math.round(document.getElementById("disk").offsetHeight / 2);
const star = document.getElementById("star");
const starRadius = Math.round(star.offsetWidth / 2);
let starSetAngle = 180;
let starAngle;
let angleSpeed = 2;
let timeSpeed = 35;
let angle = 0;

const rotate = () => {
    angle += angleSpeed
    needle.style.transform = `rotate(${angle}deg)`;
}

let intervalID;
const changeSpeed = (timeout) => {
    clearInterval(intervalID);
    intervalID = setInterval(() => rotate(), timeout);
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
    // starSetAngle = Math.floor(Math.random() * (0 - 360 + 1) + 360);
    starSetAngle = getRandomStarAngle();
    // starSetAngle = 35;
    console.log(starSetAngle);
    let x = Math.round((diskRadius - starRadius) * Math.cos(toRadians(starSetAngle)));
    let y = Math.round((diskRadius - starRadius) * Math.sin(toRadians(starSetAngle)));
    console.log(`x: ${x}`)
    console.log(`y: ${diskRadius-5+y}`)
    x = (x<0)? x+(starRadius*2): (x==0) ? x: x-(starRadius*2);
    y = (y<0)? y+(starRadius*2): (y==0) ? y: y-(starRadius*2);
    star.style.left = `${(diskRadius-starRadius)-5+y}px`;
    star.style.top = `${(diskRadius-starRadius)-5+x}px`;

    starAngle = (360 - (starSetAngle - 180)) % 360;
    console.log(`star: ${starAngle}`);
}

changeSpeed(timeSpeed)

timeSpeed = 20
setTimeout(() => changeSpeed(timeSpeed), 3000)

spawnStar()

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space') && (!event.repeat)) {
        angleSpeed *= -1;
        spawnStar()
    }
})