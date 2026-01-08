// import config from "../conf/index.js";

// async function init() {
//   //Fetches list of all cities along with their images and description
//   let cities = await fetchCities();

//   //Updates the DOM with the cities
//   cities.forEach((key) => {
//     addCityToDOM(key.id, key.city, key.description, key.image);
//   });
// }

// //Implementation of fetch call
// async function fetchCities() {
//   // TODO: MODULE_CITIES
//   // 1. Fetch cities using the Backend API and return the data

// }

// //Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {
//   // TODO: MODULE_CITIES
//   // 1. Populate the City details and insert those details into the DOM

// }

// export { init, fetchCities, addCityToDOM };
import config from "../conf/index.js";

async function init() {
  let cities = await fetchCities();

  if (!cities) return;

  cities.forEach((city) => {
    addCityToDOM(
      city.id,
      city.city,
      city.description,
      city.image
    );
  });
}

// Fetch cities from backend
async function fetchCities() {
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
}

// Add city cards to DOM
function addCityToDOM(id, city, description, image) {
  const cityCard = `
    <div class="col-12 col-md-6 col-lg-3 mb-4">
      <a href="pages/adventures/index.html?city=${id}" id="${id}">
        <div class="card tile">
          <img src="${image}" class="card-img-top" alt="${city}" />
          <div class="card-body text-center">
            <h5 class="card-title">${city}</h5>
            <p class="card-text">${description}</p>
          </div>
        </div>
      </a>
    </div>
  `;

  document.getElementById("data").innerHTML += cityCard;
}

export { init, fetchCities, addCityToDOM };
