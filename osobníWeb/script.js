function scrollToElement(elementSelector, instance = 0) {
    const element = document.querySelectorAll(elementSelector);
    if (element.length > instance) {
        element[instance].scrollIntoView({ behavior: 'smooth', block: "start" });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

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
    scrollToElement(".colum"); 
});

console.log(`Scrolling to: ${elementSelector}, instance: ${instance}`);


