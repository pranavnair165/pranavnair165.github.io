# Personal Portfolio Website

This is the repository for my personal portfolio website, designed to showcase my skills, projects, and professional background. The site features a unique, modern design inspired by brutalism and editorial print layouts.

**Live Demo:** [https://pranavnair165.github.io](https://pranavnair165.github.io)

---
## Website Content and Structure

The website is a static site built with HTML, CSS, and vanilla JavaScript. It features a responsive, asymmetrical layout with a fixed navigation sidebar on the left and a main scrolling content area on the right.

The site is organized into the following pages:
* **index.html**: The main landing page, featuring a dynamic greeting, a short bio, and live feeds for articles and weather.
* **profile.html**: Contains my biography, career goals, and personal interests.
* **cv.html**: A detailed curriculum vitae listing my experience, skills, and certifications.
* **education.html**: Outlines my academic qualifications and technical expertise.
* **projects.html**: A showcase of my recent projects with descriptions, tech tags, and links.
* **contact.html**: A functional contact form for visitors to get in touch.

---
## Implementation Details

### Dev.to Feed Integration
The "Latest Articles" section on the homepage is populated dynamically.
* The `script.js` file uses the JavaScript **`fetch()`** method to make an API call to the Dev.to API endpoint (`https://dev.to/api/articles`).
* It requests the 5 latest articles from the community.
* The returned JSON data is then parsed, and for each article, a new list item with a clickable link is dynamically created and inserted into the DOM. This ensures the content is always fresh without requiring a page reload.

### Dynamic Features (Vanilla JavaScript)
This project was built using **vanilla JavaScript** to handle all dynamic content, including the interactive code modal on the projects page, instead of a jQuery gallery.
* **Code Modal:** When a user clicks a "View Code" button, an event listener in `script.js` is triggered.
* The script retrieves the relevant code snippet, which is stored in a hidden `<div>` on the page.
* It then injects this code into a reusable modal element and changes its display property to make the popup visible. Listeners on the close button and the overlay background handle closing the modal.

### Live Weather API Integration
The "Weather Check" feature provides live weather data.
* It uses an input box for the user to enter a city name.
* On clicking "Get Weather," a `fetch()` request is sent to the **OpenWeatherMap Current Weather Data API**.
* The request includes the city name and a unique API key. A cache-busting timestamp is added to ensure fresh data is fetched every time.
* The script then parses the JSON response and dynamically updates the DOM to display the city name, temperature, weather description, and a corresponding weather icon.
* The implementation also includes error handling to inform the user if a city is not found or if a network issue occurs.

---
## Local Setup

To run this project on your local machine:
1.  Clone the repository: `git clone https://github.com/your-github-username/your-repository-name.git`
2.  Navigate into the project directory: `cd your-repository-name`
3.  Open the `index.html` file in your browser.