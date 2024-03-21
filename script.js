const search = document.getElementById('Search-btn');


const getWeather = () =>{
    const API_KEY = 'b4501361d7f91d82669b79cf8b607b3f';
const city = document.getElementById('city').value;

if (!city) {
    alert("Enter a city Name");
    return;
}

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;



const fetchData = async () => {

        try{
            const response = await fetch(currentWeatherUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        }
        catch(error){
            console.error("error fetching the current weather", error);
            alert("error fetching the current weather, please try again");
        }

        try{
            const response = await fetch(forecastUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            const data = response.json();
            // displayHourlyFourcast(data);
        }
        catch(error){
            console.error("error fetching the hoursly fourcast", error);
            alert("error fetching the hourly fourcast, please try again");
        }

    }
    
fetchData();

    function displayWeather(data){
        const tempDivInfo = document.getElementById('temp-div');
        const weatherInfoDiv = document.getElementById('Weather-info');
        const weatherIcon = document.getElementById('weather-icon');
        const hourlyFourcastDiv = document.getElementById('hourly-fourcast');

        //clear Previous Content 
        weatherInfoDiv.innerHTML = '';
        tempDivInfo.innerHTML = '';
        hourlyFourcastDiv.innerHTML = '';

        if(data.cod==='404'){
            weatherInfoDiv.innerHTML = `<p> ${data.message}</p>`;
        } else {
            const cityname = data.name;
            const temperature = Math.round(data.main.temp - 273.15); 
            const datadescription = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconURL  = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

            const temperatureHTML = 
                `<p> ${temperature}°C </p>`;

            const weatherHTML = 
                `<p> ${cityname} </p>
                <p> ${datadescription} </p>`;
            
            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHTML;
            weatherIcon.src = iconURL;
            weatherIcon.alt =  datadescription;

            // showImage();
        }
    }

}

search.addEventListener("click", getWeather());