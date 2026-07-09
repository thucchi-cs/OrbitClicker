const needle = document.getElementById("needle");
let speed = 2;
let angle = 0;

const rotate = () => {
    angle += speed
    needle.style.transform = `rotate(${angle}deg)`;
}

setInterval(() => {
    rotate()
}, 40)