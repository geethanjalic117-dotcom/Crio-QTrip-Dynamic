console.log("Adventures JS loaded");

import config from "../../conf/index.js";

async function init() {
  const city = new URLSearchParams(window.location.search).get("city");
  console.log("City selected:", city);

  if (!city) {
    console.error("City not found in URL");
    return;
  }

  const adventures = await fetchAdventures(city);
  console.log("Adventures data:", adventures);
}

async function fetchAdventures(city) {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    return await response.json();
  } catch (err) {
    console.error("Fetch failed", err);
    return [];
  }
}

export { init };
