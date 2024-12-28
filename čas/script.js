let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let time = new Date();

//console.log(time);
//console.log(time.getHours());
//console.log(time.getMinutes());
//console.log(time.getSeconds());

setInterval(() => {
    time = new Date();
    hrs.innerHTML = (time.getHours() < 10) ? "0" + time.getHours() : time.getHours();
    min.innerHTML = (time.getMinutes() < 10) ? "0" + time.getMinutes() : time.getMinutes();
    sec.innerHTML = (time.getSeconds() < 10) ? "0" + time.getSeconds() : time.getSeconds();
}, 1000);
