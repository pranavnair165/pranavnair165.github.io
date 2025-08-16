document.addEventListener("DOMContentLoaded", () => {
  const hour = new Date().getHours();
  let greeting = "Hello";
  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 18) greeting = "Good Afternoon 🌤️";
  else greeting = "Good Evening 🌙";

  document.getElementById("greeting").textContent = `${greeting}, I'm Pranav Nair. Welcome!`;
});



fetch('https://dev.to/api/articles?username=YOUR_DEVTO_USERNAME')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('rss-feed');
    data.slice(0,5).forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      list.appendChild(li);
    });
  })
  .catch(() => {
    document.getElementById('rss-feed').innerHTML = "<li>Unable to load articles.</li>";
  });



const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
        return;
      }
      document.getElementById('weatherResult').innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.main.temp}°C - ${data.weather[0].description}</p>
        <img src="<https://openweathermap.org/img/wn/${data.weather>[0].icon}.png" alt="">
      `;
    })
    .catch(() => {
      document.getElementById('weatherResult').innerHTML = "<p>Error fetching weather.</p>";
    });
});



$(document).ready(function(){
  $(".project-thumb").click(function(){
    const title = $(this).data("title");
    const desc = $(this).data("desc");
    const img = $(this).attr("src");
    $("#main-project-title").text(title);
    $("#main-project-desc").text(desc);
    $("#main-project-img").attr("src", img);
  });
});


