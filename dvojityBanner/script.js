const container = document.querySelector(".container")
const left = document.querySelector(".slide-left")
const right = document.querySelector(".slide-right")
const up = document.querySelector(".up")
const down = document.querySelector(".down")
const slidesL = right.querySelectorAll("div").length

let numActive = 0

left.style.top = `-${(slidesL-1) * 100 }vh`

up.addEventListener("click", function(){
    changeSlide("up")
})

down.addEventListener("click", function(){
    changeSlide("down")
})

function changeSlide(direction){
    const sliderH = container.clientHeight
    
    if(direction === "up"){
        numActive++
        if(numActive > slidesL-1){
            numActive = 0
        }
    } else {
        numActive--
        if(numActive < 0){
            numActive = slidesL - 1
        }
    }

    right.style.transform = `translateY(-${sliderH * numActive}px)`
    left.style.transform = `translateY(${sliderH * numActive}px)`
}