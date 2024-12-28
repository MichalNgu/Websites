let heading = document.getElementById("text")
let speed = document.getElementById("speed")
let text = "dostal si močko"
let idLetter = 1
let delay = 500 / speed.value

function writeText() {
    heading.innerText = text.slice(0, idLetter)
    idLetter++

    // vyresetuje text zpatky na 1
    if (idLetter > text.length) {
        idLetter = 1
    }
    
    setTimeout(writeText, delay)
}

writeText()

speed.addEventListener("input", function(i){
    delay = 500 / i.target.value
})