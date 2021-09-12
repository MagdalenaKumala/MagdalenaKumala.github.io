let weather = {
    apiKey: "6de0841d48aec019f4175cfbb7a7c0f8",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q= Krakow&appid=6de0841d48aec019f4175cfbb7a7c0f8"
        )
        .then((response) => {
            if (!response.ok) {
                alert("Nie znalezniono prognozy pogody.");
                throw new Error("Nie znaleziono prognozy pogody.");
            }
            return response.json();
        })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Prognoza pogody dla " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "K";
        document.querySelector(".humidity").innerText =
            "Wilgotność: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Prędkość wiatru: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Krakow");
