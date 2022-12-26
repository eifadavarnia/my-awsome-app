let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  tehran: {
    temp: -5,
    humidity: 20,
  },
};

let name = prompt("Enter a city");
let hasName = false;

function x(item, index) {
  if (item === name) {
    hasName = true;
    alert(
      "It is currently " +
        Math.round(weather[item].temp) +
        "°C" +
        " in " +
        name +
        " with a humidity of " +
        weather[item].humidity +
        "%"
    );
  }
}
Object.keys(weather).forEach(x);
if (!hasName) {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      name
  );
}
function formatDate(timestamp) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dd = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  return `${day} ${hour}:${minute} `;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchcity(event) {
  let city = document.querySelector("#search-input").value;

  let apiKey = "d8f64daf20945f70357335f6ee7bcec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    console.log(response);
    let h3 = document.querySelector("h3");
    h3.innerHTML = `${capitalizeFirstLetter(response.data.name)}`;
    let temp2 = Math.round(response.data.main.temp);

    let temp_number = document.querySelector("#temp-number");
    temp_number.innerHTML = `${temp2}`;

    //document.querySelector("#search-input").value = "";
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");

    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
  });
}

function showCurrent(position) {
  let apiKey = "d8f64daf20945f70357335f6ee7bcec5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    let h3 = document.querySelector("h3");
    h3.innerHTML = `${capitalizeFirstLetter(response.data.name)}`;
    let celsiusTemperature = response.data.main.temp;
    let temp2 = Math.round(celsiusTemperature);

    let temp_number = document.querySelector("#temp-number");
    temp_number.innerHTML = `${temp2}`;

    //document.querySelector("#search-input").value = "";
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");

    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  });
}

function searchCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}

let search_button = document.querySelector("#search-button");
search_button.addEventListener("click", searchcity);

let search_current = document.querySelector("#search-current");
search_current.addEventListener("click", searchCurrent);

searchcity();
