/* Global Variables */
const baseURL = 'api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '    ';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e) {
    const newQuery = document.getElementById('zip').value;
    // getWeather(baseURL,newQquery, apiKey)
    const feelings = document.getElementById('feelings').value;

    getWeather('weatherData',)
    .then(function(data) {
        console.log(data);
        postData('/addWeather',{weather:data.weather.main,temp:data.main.temp})
    })
    .then(
        updateUI()
    )
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = newDate;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTMl = allData[0].feelings
    } catch(error) {
        console.log("error",error);
    }
}

const getWeather = async (baseURL, query, key) => {
    const res = await fetch(baseURL+query+key)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log('error',error);
    }
}


// const searchbox = document.getElementById('zip');
// const submit = document.getElementById('generate')



// submit.addEventListener('click',setQuery);

// function setQuery() {
//     console.log(searchbox.value)
//     // getResults(searchbox.value)
// }

// function getResults (query) {
//     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(weather => {
//         return weather.json();
//     }).then(displayResults);
// }

// function displayResults (weather) {
//     let city = document.querySelector('.location .city');
//     city.innerText = `${weather.name}, ${weather.sys.country}`;
  
//     let now = new Date();
//     let date = document.querySelector('.location .date');
//     date.innerText = newDate;
  
//     let temp = document.querySelector('.current .temp');
//     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
//     let weather_el = document.querySelector('.current .weather');
//     weather_el.innerText = weather.weather[0].main;
  
//     let hilow = document.querySelector('.hi-low');
//     hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
//   }


