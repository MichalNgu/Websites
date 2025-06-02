let input = document.querySelector(".input");
let list = document.querySelector(".list");

async function getDataFromServer() {
    const res = await fetch("http://localhost:3000/api/todos");
    const tasks = await res.json();

    list.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completion) li.classList.add("checked");
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.dataset.index = index;
        li.appendChild(span);
        li.dataset.index = index;
        list.appendChild(li);
    });
}

async function addTask() {
    if(input.value === "") {
        alert("nejdříve musíte zadat ukol!");
    }
    else {
        await fetch("http://localhost:3000/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input.value })
        });
        input.value = "";
        getDataFromServer();
    }
}

list.addEventListener("click", async function(e) {
    const index = e.target.dataset.index;
    if (e.target.tagName === "LI") {
        await fetch("http://localhost:3000/api/todos/" + index, {
            method: "PUT"
        });
    }
    else if (e.target.tagName === "SPAN") {
        await fetch("http://localhost:3000/api/todos/" + index, {
            method: "DELETE"
        });
    }
    getDataFromServer();
}, false);

getDataFromServer();