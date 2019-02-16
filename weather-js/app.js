"use strict";

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
    weatherBox.style.display = 'none';
    load.style.display = 'block';


    let cityName = city.value;
    console.log(cityName);

    if (cityName.trim().length === 0) {
        return alert("Enter city");
    }

    let http = new XMLHttpRequest();
    const apiKey = "059cf2b6f2741f27e2b1644ca23d139d";
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&apiKey=' + apiKey + "&units=metric";

    http.open('GET', url);
    http.onreadystatechange = ev => {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            let responseText = http.responseText;
            console.log(responseText);

            let data = JSON.parse(responseText);

            let description = data.weather[0].description.toUpperCase();
            let temp = data.main.temp;

            let weather = new Weather(cityName, description, temp);

            setTimeout(function(){
                console.log('weather', weather);
                updateWeather(weather);
            }, 2000);

        } else if (http.readyState == XMLHttpRequest.DONE) {
            alert('Error !!!!');
        }
    };

    http.send();
}

function updateWeather(weather) {
    weatherCity.textContent = weather.cityName;
    weatherDescription.textContent = weather.description;
    weatherTemperature.textContent = weather.temperature;

    load.style.display = 'none';
    weatherBox.style.display = 'block';
}

