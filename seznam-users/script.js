const list = document.querySelector(".user-list")
const input = document.querySelector(".inputF")
const userList = []

getData()

input.addEventListener("input", function(i){
    dataFilter(i.target.value) 
})

async function getData(){
    const response = await fetch("https://randomuser.me/api/?results=50")
    const data = await response.json()
    list.innerHTML = ""
    
    data.results.forEach(function(user){
       const li = document.createElement("li")

        li.innerHTML =`
        <li>
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h3>${user.name.first} ${user.name.last}</h3>
                <span>${user.location.country}</span>
            </div>
        </li>
        `

        list.appendChild(li)
        
        userList.push(li)
    })
}

function dataFilter(value){
    userList.forEach(function(user){
        if(user.innerText.toLowerCase().includes(value.toLowerCase())){
            user.style.display = "flex"
        } else {
            user.style.display = "none"
        }
    })
}