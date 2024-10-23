const searchBtn = document.getElementById('searchBtn');
const spinner = document.getElementById('spinner');
const weatherCard = document.getElementById('weatherCard');
const weatherResult = document.getElementById('weatherResult');
const errorMsg = document.getElementById('errorMsg');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    
    
    weatherResult.classList.add('d-none');
    errorMsg.classList.add('d-none');
    spinner.classList.remove('d-none');
    weatherCard.style.backgroundColor = 'lightblue'; 

    setTimeout(() => {
        fetchWeather(city)
        .then(data => {
            const tempCelsius = (data.main.temp - 273.15).toFixed(1);
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = tempCelsius;
            document.getElementById('weather').innerText = data.weather[0].main;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('wind').innerText = data.wind.speed;

            // Change card color based on temperature
            if (tempCelsius < 22) {
                weatherCard.style.backgroundColor = 'skyblue';
            } else if (tempCelsius >= 22 && tempCelsius <= 29) {
                weatherCard.style.backgroundColor = 'lightcoral';
            } else {
                weatherCard.style.backgroundColor = 'darkred';
            }

            weatherResult.classList.remove('d-none');
        })
        .catch(err => {
            errorMsg.classList.remove('d-none');
        })
        .finally(() => {
            spinner.classList.add('d-none'); 
        });
    }, 1000); 
});

function fetchWeather(city) {
    const apiKey = 'befd984de4d3c050671d4eb935e6c660';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Try another city');
            }
            return response.json();
        });
}
