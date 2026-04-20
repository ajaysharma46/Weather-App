const apikey = "461e0910d972c86c1949999e5daa94b0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (searchinput = ""){
        return;
    }
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";      
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

        const condition = data.weather[0].description.toLowerCase();

        if (condition.includes("cloud")) {
            weatherIcon.src = "assets/sun cloud.png";
        } else if (condition.includes("clear")) {
            weatherIcon.src = "assets/clear.png";
        } else if (condition.includes("rain") && data.rain) {
            weatherIcon.src = "assets/rain.png";
        } else if (condition.includes("drizzle")) {
            weatherIcon.src = "assets/drizzle.png";
        } else if (condition.includes("mist") || condition.includes("haze")) {
            weatherIcon.src = "assets/mist.png";
        } else {
            weatherIcon.src = "assets/clear.png"; 
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});


searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
      
        searchBtn.classList.add("pressed");

    
        checkWeather(searchBox.value);

       
        setTimeout(() => {
            searchBtn.classList.remove("pressed");
        }, 200);
    }
});




