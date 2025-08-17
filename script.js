// A single, reliable event listener for when the page content is ready
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dynamic Greeting Logic ---
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = "Hello";
        if (hour < 12) greeting = "Good Morning ☀️";
        else if (hour < 18) greeting = "Good Afternoon 🌤️";
        else greeting = "Good Evening 🌙";
        
        greetingEl.textContent = `${greeting}, I'm Pranav Nair.`;
    }

    // --- 2. Mobile Navigation Hamburger Menu Logic ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const body = document.querySelector('body');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            body.classList.add('mobile-nav-active');
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            body.classList.remove('mobile-nav-active');
        });
    }
});


// --- 3. Dev.to RSS Feed Logic ---
const rssFeedList = document.getElementById('rss-feed');
if (rssFeedList) {
    rssFeedList.innerHTML = "<li>Loading latest articles...</li>";

    fetch('https://dev.to/api/articles?per_page=5')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        rssFeedList.innerHTML = ""; // Clear the loading message

        if (data.length > 0) {
            // MODIFIED: Loop through articles and build the new, richer structure
            data.forEach((article, index) => {
              const li = document.createElement('li');
              
              // Format number with leading zero (01, 02, etc.)
              const number = String(index + 1).padStart(2, '0');
              
              // Create a div for tags
              const tagsHTML = article.tag_list.map(tag => `<span class="tech-tag">#${tag}</span>`).join('');

              // Build the new inner HTML for the list item
              li.innerHTML = `
                <span class="article-number">${number}</span>
                <div class="article-info">
                    <a href="${article.url}" target="_blank" class="article-title">${article.title}</a>
                    <div class="article-tags">${tagsHTML}</div>
                </div>
              `;
              rssFeedList.appendChild(li);
            });
        } else {
             rssFeedList.innerHTML = "<li>No articles found.</li>";
        }
      })
      .catch((error) => {
        console.error("Error fetching Dev.to articles:", error);
        rssFeedList.innerHTML = "<li>Sorry, unable to load articles at this time.</li>";
      });
}


// --- 4. Weather Check Logic ---
const getWeatherButton = document.getElementById("getWeather");
if (getWeatherButton) {
  // NOTE: Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual key
  const apiKey = "3e8b965975ed88b2ff1b2df45ff36413";

  getWeatherButton.addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    if (!city) return alert("Please enter a city name");

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = "<p>Fetching weather...</p>";
    // ADDED: Create a unique timestamp to prevent the browser from caching the result
    const cacheBuster = new Date().getTime();

    // MODIFIED: Added the cacheBuster parameter to the end of the fetch URL
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&_=${cacheBuster}`)
      .then(response => {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        // MODIFIED: Switched to the @2x version for a larger, clearer icon
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        weatherResult.innerHTML = `
          <h3>${data.name}</h3>
          <p>${data.main.temp}°C - ${data.weather[0].description}</p>
          <img src="${iconUrl}" alt="Weather icon">
        `;
      })
      .catch((error) => {
        weatherResult.innerHTML = `<p>Error: ${error.message}. Please check the city name.</p>`;
      });
  });
}

// --- START: Code Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('code-modal');
    const modalCodeContent = document.getElementById('modal-code-content');
    const viewCodeBtns = document.querySelectorAll('.view-code-btn');
    const closeModalBtn = document.querySelector('.modal-close');

    // Function to open the modal
    const openModal = (e) => {
        const codeTargetId = e.target.dataset.codeTarget;
        const codeSnippet = document.querySelector(codeTargetId).innerHTML;
        modalCodeContent.innerHTML = codeSnippet;
        modal.style.display = 'block';
    };

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    // Add event listeners to all "View Code" buttons
    viewCodeBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Add event listener to the close button
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close the modal if the user clicks outside of the content box
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });
});
// --- END: Code Modal Logic ---