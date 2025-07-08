let cityname = document.querySelector(".weather_cityname");
let datetime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temperature");
let w_mintemp = document.querySelector(".weather_min");
let w_maxtemp = document.querySelector(".weather_max");
let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

const form = document.querySelector(".searchbar");
const input = document.getElementById("searchinput");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = input.value.trim();

    if (city !== "") {
        getweather(city);
    }
});

const getcountry = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getdatetime = async (dt, lat, lon) => {
    const timezoneAPIKEY = "UBYAHRF24K6M";
    const timezoneURL = ` https://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneAPIKEY}&format=json&by=position&lat=${lat}&lng=${lon}`

    try {
        const result = await fetch(timezoneURL);
        const zoneData = await result.json();
        const timezone = zoneData.zoneName;


        const curdate = new Date(dt * 1000);

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: timezone,
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        return formatter.format(curdate);
    } catch (error) {
        console.error("timezone fetch error : ", error);
        return "time unavailable";
    }
};

const getweather = async (city) => {
    const APIKEY = `576624edbe27b7ca5c09b2ec533a0820`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, weather, name, sys, timezone, coord, dt, wind } = data;

        cityname.innerHTML = `${name},${getcountry(sys.country)}`
        const localtime = await getdatetime(dt, coord.lat, coord.lon);
        datetime.innerHTML = localtime;
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src=" https://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        w_temp.innerHTML = `   ${(main.temp - 273.15).toFixed(2)}&deg;`;
        // w_mintemp.innerHTML = `Min : ${(main.temp_min - 273.15).toFixed(2)}&deg;`;
        // w_maxtemp.innerHTML = `Max : ${(main.temp_max - 273.15).toFixed(2)}&deg;`;
        w_feelslike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&deg;`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${(wind.speed * 3.6).toFixed(2)}kph`;
        w_pressure.innerHTML = `${main.pressure}mb`;
    } catch (error) {
        cityname.innerHTML = `Please Enter A Valid Name`;
    }

};





