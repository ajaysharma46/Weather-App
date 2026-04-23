const apiKey = "c29dad7f1c3c61b001f68e0997612658";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

// 1. Preload images on page load
const imagePaths = [
    "assets/sun cloud.png",
    "assets/clear.png",
    "assets/rain.png",
    "assets/drizzle.png",
    "assets/mist.png"
];

imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
});

async function checkWeather(city) {
    if (city.trim() === "") return;
   

    try {
        const response = await fetch(
            apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`
        );

        if (response.status === 404) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
            weatherDiv.classList.remove("show");
            return;
        }

        // Inside your checkWeather function...
        errorDiv.style.display = "none";
        weatherDiv.style.display = "block"; // Required for the transition to start

        setTimeout(() => {
            weatherDiv.classList.add("show");
        }, 20); // 20ms is the "sweet spot" for browsers to catch the change
        
        const data = await response.json();

        // Update UI Text
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        // Update Weather Icon
        const condition = data.weather[0].main.toLowerCase();

        if (condition.includes("cloud")) {
            weatherIcon.src = "assets/sun cloud.png";
        } else if (condition.includes("clear")) {
            weatherIcon.src = "assets/clear.png";
        } else if (condition.includes("rain")) {
            weatherIcon.src = "assets/rain.png";
        } else if (condition.includes("drizzle")) {
            weatherIcon.src = "assets/drizzle.png";
        } else if (condition.includes("mist") || condition.includes("haze")) {
            weatherIcon.src = "assets/mist.png";
        } else {
            weatherIcon.src = "assets/clear.png";
        }

          searchBox.addEventListener("focus", () => {
            const searchContainer = document.querySelector(".search");
            searchContainer.style.border = "1px solid #00d4ff";
            searchContainer.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.2)";
        });


        // --- ANIMATION LOGIC START ---
        errorDiv.style.display = "none";
        
        // Reset the animation state
        weatherDiv.classList.remove("show");
        weatherDiv.style.display = "block";

        // Tiny delay to let the browser register display:block before fading in
        setTimeout(() => {
            weatherDiv.classList.add("show");
        }, 10);
        // --- ANIMATION LOGIC END ---

    } catch (error) {
        console.error("Error fetching weather:", error);
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
        weatherDiv.classList.remove("show");
    }
}

  searchBox.addEventListener("focus", () => {
            const searchContainer = document.querySelector(".search");
            searchContainer.style.border = "1px solid #00d4ff";
            searchContainer.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.2)";
        });


        searchBtn.addEventListener("click", () => {
            const searchContainer = document.querySelector(".search");

            // Remove the glow immediately
            searchContainer.style.border = "1px solid rgba(255, 255, 255, 0.1)";
            searchContainer.style.boxShadow = "none";

            // Force the cursor out of the input box so the glow doesn't stay
            searchBox.blur();
            checkWeather(searchBox.value);

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

searchBox.addEventListener("blur", () => {
    const searchContainer = document.querySelector(".search");
    
    // Reset to original dim state
    searchContainer.style.border = "1px solid rgba(255, 255, 255, 0.1)"; 
    searchContainer.style.boxShadow = "none";
});
