// import config from "../conf/index.js";
// console.log("reservation_page.js loaded");
// // Fetch reservations from backend
// async function fetchReservations() {
//   try {
//     const response = await fetch(
//       `${config.backendEndpoint}/reservations`
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("Error fetching reservations", error);
//     return null;
//   }
// }

// // Entry point
// (async function () {
//   const reservations = await fetchReservations();
// //   console.log("Reservations:", reservations);
// addReservationToTable(reservations);
// })();

import config from "../config/index.js";

// STEP 1: Fetch reservations from backend
async function fetchReservations() {
  try {
    const response = await fetch(
      `${config.backendEndpoint}/reservations`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
}

// STEP 2: Add reservations to table
function addReservationTotable(reservations) {
  const tableBody = document.getElementById("reservation-table-body");
  const banner = document.getElementById("no-reservation-banner");
  const tableParent = document.getElementById("reservation-table-parent");

  // No reservations
  if (!reservations || reservations.length === 0) {
    banner.style.display = "block";
    tableParent.style.display = "none";
    return;
  }

  // Reservations available
  banner.style.display = "none";
  tableParent.style.display = "block";

  reservations.forEach((res, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${res.id}</td>
      <td>${res.name}</td>
      <td>${res.adventureName}</td>
      <td>${res.person}</td>
      <td>${res.date}</td>
      <td>₹${res.price}</td>
      <td>${new Date(res.time).toLocaleString()}</td>
      <td>
        <a href="../adventures/detail/?adventure=${res.adventure}" class="btn btn-sm btn-primary">
          Visit Adventure
        </a>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// STEP 3: Entry point
(async function () {
  console.log("reservation_page.js loaded");
  const reservations = await fetchReservations();
  addReservationToTable(reservations);
})();