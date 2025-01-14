const typed = new Typed('.auto-type', {
    strings: ['Web Designer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

function scrollToElement(elementSelector, instance = 0) {
    const element = document.querySelectorAll(elementSelector);
    if (element.length > instance) {
        element[instance].scrollIntoView({ behavior: 'smooth',});
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");

link1.addEventListener("click", (event) => {
    event.preventDefault(); 
    scrollToElement(".container h2:first-of-type"); 
});

link2.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement(".projects");
});

link3.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement(".contact-container"); 
});

link4.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement(".colum"); 
});
//console.log(`Scrolling to: ${elementSelector}, instance: ${instance}`)

const scrollUp = document.getElementById("scroll-up");

window.onscroll = () => {
    if (window.scrollY > 1100) {
        scrollUp.style.display = "block";
    } else {
        scrollUp.style.display = "none";
    }
}
scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});	