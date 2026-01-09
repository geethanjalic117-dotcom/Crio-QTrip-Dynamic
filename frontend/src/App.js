// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Welcome to QTrip!</h1>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";

// function App() {
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8082/cities")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("CITIES:", data);
//         setCities(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to QTrip!</h1>

//       <ul>
//         {cities.map((city) => (
//           <li key={city.id}>{city.city}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";

// function App() {
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8082/cities")
//       .then((response) => response.json())
//       .then((data) => setCities(data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Welcome to QTrip!</h1>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {cities.map((city) => (
//           <div
//             key={city.id}
//             style={{
//               border: "1px solid #ccc",
//               width: "250px",
//               padding: "10px",
//             }}
//           >
//             <img
//               src={city.image}
//               alt={city.city}
//               style={{ width: "100%", height: "150px", objectFit: "cover" }}
//             />
//             <h3>{city.city}</h3>
//             <p>{city.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/cities")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to QTrip!</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() =>
              window.location.href = `/pages/adventures.html?city=${city.id}`
            }
            style={{
              border: "1px solid #ccc",
              width: "250px",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            <img
              src={city.image}
              alt={city.city}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{city.city}</h3>
            <p>{city.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;