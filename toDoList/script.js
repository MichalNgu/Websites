let input = document.querySelector(".input");
let list = document.querySelector(".list");

function addTask() {
    if(input.value === "") {
        alert("nejdříve musíte zadat ukol!");
    }
    else {
        let task = document.createElement("li");
        task.innerHTML = input.value;
        list.appendChild(task);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        task.appendChild(span);
        input.value = "";
        saveData(); 
    }
}

list.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); 
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); 
    }
}, false);
function saveData() {
    let tasks = [];
    list.querySelectorAll("li").forEach(item => {
        tasks.push({
            text: item.childNodes[0].textContent,
            checked: item.classList.contains("checked"),
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

function saveData() {
    let tasks = [];
    list.querySelectorAll("li").forEach(item => {
        tasks.push({
            text: item.childNodes[0].textContent,
            checked: item.classList.contains("checked"),
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

function getData() {
    let savedTasks = JSON.parse(localStorage.getItem("data") || "[]");
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        list.appendChild(li);
    });
}

function getData() {
    let savedTasks = JSON.parse(localStorage.getItem("data") || "[]");
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        list.appendChild(li);
    });
}

getData();