const btnSearch = document.querySelector(".btn-search");
const searchBar = document.querySelector(".search-bar");
const cityName = document.querySelector(".city");
const descriptionEL = document.querySelector(".description");
const iconEl = document.querySelector(".icon");
const tempEL = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEL = document.querySelector(".wind");

let weather = {
  apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
  getWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found. Try again!");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log(data);
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    cityName.textContent = `Weather in ${name}`;
    descriptionEL.textContent = description;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}.png`;
    tempEL.textContent = `${temp} °C`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    windEL.textContent = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}'`;
  },
  search: function () {
    this.getWeather(document.querySelector(".search-bar").value);
  },
};

btnSearch.addEventListener("click", function () {
  weather.search();
});

searchBar.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

weather.getWeather("Kyiv");
