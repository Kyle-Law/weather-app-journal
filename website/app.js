/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=a827ebeb3f600fff6e6558af4d980f98';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const country =  document.getElementById('country').value;
    const feelings = document.getElementById('feelings').value

    getWeather(baseURL,country, apiKey)
    .then(function(data) {
        // console.log(data);
        postData('/addJournal',{date:newDate, temp: data.main.temp, icon:data.weather[0].icon, country:data.name, content: feelings})
    })
    .then(
        updateUI()
    )
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      entryHolder = document.getElementById('entryHolder');
      entryHolder.innerHTML = '';
      console.log(allData)
      allData.forEach((data,index)=>{
        const htmlData = `
            <div class="row-2">
                <div class="num">${index+1}</div>
                <div class="date">${data.date}</div>
            </div>
            <div class="row-2">
                <img src="http://openweathermap.org/img/w/${data.icon}.png">
                <div class="temp">${Math.floor(data.temp-273)}°c</div>
                <div class="country">${data.country}</div>
            </div>
            <div class="content">${data.content}</div>
        `
        const entry = document.createElement('div')
        entry.classList.add('entry')
        entry.innerHTML = htmlData
        entryHolder.appendChild(entry)
        // document.getElementById('date').innerHTML = data.date;
        // document.getElementById('temp').innerHTML = data.temp;
        // document.getElementById('content').innerHTML = data.mood;
      })
      
    }catch(error){
      console.log("error", error);
    }
  }

const getWeather = async (baseURL, animal, key)=>{

  const res = await fetch(baseURL+animal+key)
  try {

    const data = await res.json();
    // console.log(data);
    // console.log(data.message)
    // console.log(data.cod)
    // console.log(data.name);
    // console.log(`${Math.floor(data.main.temp -273)} celsius`);
    // console.log(data.weather[0].main);
    // console.log(data.weather[0].icon);
    // var img = document.createElement("img");
    // img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    // document.querySelector('#icon').appendChild(img);
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

window.onload = updateUI;