/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=a827ebeb3f600fff6e6558af4d980f98&units=imperial';
const dataArray = []
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zip =  document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value

    getWeather(baseURL,zip, apiKey)
    .then(function(data) {
        // console.log(data);
        postData('/addJournal',{date:newDate, temp: data.main.temp, icon:data.weather[0].icon, country:data.name, content: feelings})
    })
    .then(function(){
        updateUI()
        })
}

function addView(){
  entryHolder = document.getElementById('entryHolder');
  entryHolder.innerHTML = '';
  dataArray.forEach((data,index)=>{
    const htmlData = `
        <div class="col-2">
            <div class="num">Day ${index+1}</div>
            <div class="date">${data.date}</div>
        </div>
        <div class="col-3">
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
  })
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    dataArray.push(allData);
    addView()
  }catch(error){
    console.log("error", error);
  }
}

const getWeather = async (baseURL, animal, key)=>{

  const res = await fetch(baseURL+animal+key)
  try {

    const data = await res.json();
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

window.onload = addView();