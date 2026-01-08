
// import config from "../conf/index.js";

// //Implementation to extract city from query params
// function getCityFromURL(search) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Extract the city id from the URL's Query Param and return it

// }

// //Implementation of fetch call with a paramterized input based on city
// async function fetchAdventures(city) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Fetch adventures using the Backend API and return the data

// }

// //Implementation of DOM manipulation to add adventures for the given city from list of adventures
// function addAdventureToDOM(adventures) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM

// }

// //Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
// function filterByDuration(list, low, high) {
//   // TODO: MODULE_FILTERS
//   // 1. Filter adventures based on Duration and return filtered list

// }

// //Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
// function filterByCategory(list, categoryList) {
//   // TODO: MODULE_FILTERS
//   // 1. Filter adventures based on their Category and return filtered list

// }

// // filters object looks like this filters = { duration: "", category: [] };

// //Implementation of combined filter function that covers the following cases :
// // 1. Filter by duration only
// // 2. Filter by category only
// // 3. Filter by duration and category together

// function filterFunction(list, filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
//   // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


//   // Place holder for functionality to work in the Stubs
//   return list;
// }

// //Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
// function saveFiltersToLocalStorage(filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Store the filters as a String to localStorage

//   return true;
// }

// //Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
// function getFiltersFromLocalStorage() {
//   // TODO: MODULE_FILTERS
//   // 1. Get the filters from localStorage and return String read as an object


//   // Place holder for functionality to work in the Stubs
//   return null;
// }

// //Implementation of DOM manipulation to add the following filters to DOM :
// // 1. Update duration filter with correct value
// // 2. Update the category pills on the DOM

// function generateFilterPillsAndUpdateDOM(filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

// }
// export {
//   getCityFromURL,
//   fetchAdventures,
//   addAdventureToDOM,
//   filterByDuration,
//   filterByCategory,
//   filterFunction,
//   saveFiltersToLocalStorage,
//   getFiltersFromLocalStorage,
//   generateFilterPillsAndUpdateDOM,
// };

import config from "../conf/index.js";

// Extract city from URL
function getCityFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("city");
}

// Fetch adventures for a city
async function fetchAdventures(city) {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Add adventures to DOM
function addAdventureToDOM(adventures) {
  const container = document.getElementById("data");

  container.innerHTML = "";

  adventures.forEach((adventure) => {
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-3 mb-4">
        <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
          <div class="card activity-card">
            <img src="${adventure.image}" class="card-img-top" />
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5>${adventure.name}</h5>
                <p>₹${adventure.costPerHead}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Duration</p>
                <p>${adventure.duration} Hours</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  });
}

// Filter by duration
function filterByDuration(list, low, high) {
  return list.filter(
    (adventure) =>
      adventure.duration >= low && adventure.duration <= high
  );
}

// Filter by category
function filterByCategory(list, categoryList) {
  return list.filter((adventure) =>
    categoryList.includes(adventure.category)
  );
}

// Combined filter
function filterFunction(list, filters) {
  let filteredList = list;

  if (filters.duration.length > 0) {
    const [low, high] = filters.duration.split("-").map(Number);
    filteredList = filterByDuration(filteredList, low, high);
  }

  if (filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  return filteredList;
}

// Save filters
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

// Get filters
function getFiltersFromLocalStorage() {
  const filters = localStorage.getItem("filters");
  return filters ? JSON.parse(filters) : null;
}

// Generate filter pills
function generateFilterPillsAndUpdateDOM(filters) {
  const categoryContainer = document.getElementById("category-list");
  categoryContainer.innerHTML = "";

  filters.category.forEach((category) => {
    categoryContainer.innerHTML += `
      <span class="category-filter">${category}</span>
    `;
  });

  if (filters.duration) {
    document.getElementById("duration-select").value = filters.duration;
  }
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};