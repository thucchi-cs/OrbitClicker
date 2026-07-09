const needle = document.getElementById("needle");
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

changeSpeed(timeSpeed)

timeSpeed = 1
setTimeout(() => changeSpeed(timeSpeed), 3000)

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space') && (!event.repeat)) {
        angleSpeed *= -1;
    }
})