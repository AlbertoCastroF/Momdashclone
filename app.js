const author = document.getElementById("author");
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Not available atm");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
    <img src="${data.image.small}"/>
    <p>${data.name}<p>
    `;
    document.getElementById("crypto").innerHTML += `
        <p>😡: $${data.market_data.current_price.usd}</p>
        <p>😂: $${data.market_data.high_24h.usd}</p>
        <p>😎: $${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((err) => console.log(err));

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "medium" }
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not availabale");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data.main.temp);
      document.getElementById("weather").innerHTML = `
        <img src='http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png'/>
        <h2>${Math.floor(data.main.temp)}Cº</h2> <br>
      `;
      document.getElementById("city-name").innerHTML = `
        <p>${data.name}</p>
      `;
    })
    .catch((error) => console.log(error));
});
