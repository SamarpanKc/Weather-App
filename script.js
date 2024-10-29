const apiKey = "78b8e399407393062147676926fe4c0a"; // Your actual API key
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.getElementById("searchInput");
const searchBttn = document.getElementById("searchBtn");

async function WeatherData(sahar) {
    try {
        const response = await fetch(url + sahar + `&appid=${apiKey}`);
        const data = await response.json();

        // Check if the city is valid by looking for a 404 status code
        if (data.cod === "404") {
            alert('Invalid Input: City not found');
            return; // Stop further execution if the city is invalid
        }

        // If city is valid, display data
        icons(data);
        document.querySelector(".city").textContent = data.name;
        document.querySelector("#temperature").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector("#windSpeed").textContent = "Wind " + data.wind.speed + " km/hr";
        document.querySelector(".humidityRate").textContent = "Humidity " + data.main.humidity + "%";

        // Show the weather card
        document.querySelector('.card').style.display = 'flex';

    } catch (error) {
        console.error("Error fetching data:", error);
        alert('Something went wrong. Please try again later.');
    }
}

searchBttn.addEventListener("click", () => {
    WeatherData(searchBox.value);
});

// Add event listener for Enter key press to search
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        WeatherData(searchBox.value);
    }
});

// Function to set the weather icon based on the weather condition
function icons(data) {
    const weatherMain = data.weather[0].main;
    const iconImg = document.getElementsByClassName('iconImg')[0];

    if (weatherMain === 'Clouds') {
        iconImg.src = 'images/cloud.svg';
    } else if (weatherMain === 'Rain') {
        iconImg.src = 'images/rain.svg';
    } else if (weatherMain === 'Clear') {
        iconImg.src = 'images/sun.svg';
    }
}
