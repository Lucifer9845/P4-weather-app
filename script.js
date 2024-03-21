const search = document.getElementById('Search-btn');

const getWeather = () =>{
    const API_KEY = 'ABCDE'; // Replace this with your API key
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
            const data = await response.json();
            displayHourlyFourcast(data.list);
        }
        catch(error){
            console.error("error fetching the hoursly fourcast", error);
            alert("error fetching the hourly fourcast, please try again");
        }

    }
    
fetchData();

    async function displayWeather(data){
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

            showImage();
        }
    }
     async function  displayHourlyFourcast (hourlyData) {
        const hourlyFourcastDiv = document.getElementById('hourly-fourcast');
        const next24Hours = hourlyData.slice(0,8);

        next24Hours.forEach(item => {

            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp-273.15);
          
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          
            const hourlyItemHtml = `
              <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
              </div>
            `;
            hourlyFourcastDiv.innerHTML += hourlyItemHtml;
          
          });
          
     }

     function showImage(){
        const weatherIcon = document.getElementById('weather-icon');

        weatherIcon.style.display = 'flex';
     }
}
search.addEventListener("click", getWeather());