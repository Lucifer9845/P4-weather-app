async function fetchData() {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Bengaluru';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7870030be8msheb38b2fae1d0ab8p138f13jsnbd6b09683e9b',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
  
fetchData(); // Call the async function
  