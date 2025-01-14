
// Script.js bez překladu a s českými komentáři
let weather = {
    apiKey: "2c3496f80f144300c949a51bc51c98f6",

    // Funkce pro získání počasí z OpenWeatherMap API
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("Město nenalezeno, zkuste znovu."); // Chyba při nenalezení města
                    throw new Error("Město nenalezeno, zkuste znovu.");
                }
                return response.json(); // Zpracování odpovědi z API
            })
            .then((data) => this.displayWeather(data)) // Předání dat funkci pro zobrazení
            .catch((error) => console.error("Chyba při načítání dat: ", error)); // Ošetření chyb
    },

    // Funkce pro zobrazení počasí na stránce
    displayWeather: function (data) {
        const { name } = data; // Název města
        const { icon, description } = data.weather[0]; // Ikona a popis počasí
        const { temp, humidity } = data.main; // Teplota a vlhkost
        const { speed } = data.wind; // Rychlost větru
        document.querySelector(".city").innerText = "Počasí v " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png"; // Nastavení ikony počasí
        document.querySelector(".description").innerText = description; // Popis počasí
        document.querySelector(".temp").innerText = temp + "°C"; // Zobrazení teploty
        document.querySelector(".humidity").innerText =
            "Vlhkost: " + humidity + "%"; // Zobrazení vlhkosti
        document.querySelector(".wind").innerText =
            "Vítr: " + speed + " km/h"; // Zobrazení rychlosti větru
        document.querySelector(".weather-loading").classList.remove("loading"); // Skrytí loading stavu
    },

    // Funkce pro vyhledání města zadaného uživatelem
    search: function () {
        const input = document.querySelector(".input");
        if (input.value.trim() === "") {
            alert("Zadejte město."); // Upozornění na prázdný vstup
            return;
        }
        this.fetchWeather(input.value); // Volání funkce pro získání počasí
    },
};

// Přidání posluchače události na tlačítko hledání
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// Přidání posluchače události na Enter v textovém poli
document.querySelector(".input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// Načtení počasí pro výchozí město při načtení stránky
weather.fetchWeather("Prague");
