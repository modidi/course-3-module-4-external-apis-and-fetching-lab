// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

//Fetch weather alerts
async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(`${weatherApi}${state}`);

        if(!response.ok) {
            throw new Error("Unable to fetch weather alerts.");
        }

        const data = await response.json();

        console.log(data); //Log data for testing

        displayAlerts(data);

        //clear input after successful request
        stateInput.value = "";

        //hide any previous errors
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");

    } catch (error) {
        console.log(error.message);

        alertsDisplay.innerHTML = "";

        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
    
}

//display alerts on the page
function displayAlerts(data) {
    //remove previous alerts
    alertsDisplay.innerHTML = "";

    const numberOfAlerts = data.features.length;

    //create summary 
    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${numberOfAlerts}`;
    alertsDisplay.appendChild(summary);

    //create list
    const list = document.createElement("ul");
    data.features.forEach(alert => {
        const listItem = document.createElement("li");
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
        
    });

    alertsDisplay.appendChild(list);
}

//Button click 
fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    //validate input
    if(state === "") {
        errorMessage.textContent = "Please enter a state abbreviation";
        errorMessage.classList.remove("hidden");
        alertsDisplay.innerHTML = "";
        return;
    }

    fetchWeatherAlerts(state);
});