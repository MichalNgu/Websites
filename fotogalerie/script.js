const slides = document.querySelectorAll('.slide')

slides.forEach(function(oneSlide){
    oneSlide.addEventListener("click", function(){
        deleteActive()
        oneSlide.classList.add('active')
    })
})

function deleteActive(){
    slides.forEach(function(mySlide){
        mySlide.classList.remove('active')
    })
}