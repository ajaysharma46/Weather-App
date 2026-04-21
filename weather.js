const apiKey = "c29dad7f1c3c61b001f68e0997612658";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (city.trim() === "") return;

    try {
        const response = await fetch(
            apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`
        );

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

          const imagePaths = [
            "assets/sun cloud.png",
            "assets/clear.png",
            "assets/rain.png",
            "assets/drizzle.png",
            "assets/mist.png"
        ];

        // Preload images
        imagePaths.forEach((path) => {
            const img = new Image();
            img.src = path;
        });

        const data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").textContent =
            data.main.humidity + "%";

        document.querySelector(".wind").textContent =
            data.wind.speed + " km/h";

        const condition = data.weather[0].main.toLowerCase();

        if (condition.includes("cloud")) {
            weatherIcon.src = "assets/sun cloud.png";
        } else if (condition.includes("clear")) {
            weatherIcon.src = "assets/clear.png";
        } else if (condition.includes("rain")) {
            weatherIcon.src = "assets/rain.png";
        } else if (condition.includes("drizzle")) {
            weatherIcon.src = "assets/drizzle.png";
        } else if (
            condition.includes("mist") ||
            condition.includes("haze")
        ) {
            weatherIcon.src = "assets/mist.png";
        } else {
            weatherIcon.src = "assets/clear.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
