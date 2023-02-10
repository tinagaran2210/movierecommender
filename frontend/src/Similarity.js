//import React, { useState, useEffect } from "react";
//
//const Similarity = () => {
//  const [data, setData] = useState({});
//
//  useEffect(() => {
//    async function fetchData() {
//      const response = await fetch("http://localhost:8080/api/user/cosine");
//      const json = await response.json();
//      setData(json);
//    }
//    fetchData();
//  }, []);
//
//  return (
//    <div>
//      <h1>Data</h1>
//      <ul>
//        {Object.entries(data).map(([key, value]) => (
//          <li key={key}>
//            {key}: {value}
//          </li>
//        ))}
//      </ul>
//    </div>
//  );
//};
//
//export default Similarity;

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
   const [data, setData] = useState({});

   useEffect(() => {
      axios.get("http://localhost:8080/api/user/cosine")
           .then(response => setData(response.data))
           .catch(error => console.error(error));
   }, []);

   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th>Movie</th>
                  <th>Movie</th>
                  <th>Similarity</th>
               </tr>
            </thead>
            <tbody>
               {Object.entries(data).map(([key, value], index) => (
                  <tr key={index}>
                     <td>{key.split("-")[0]}</td>
                     <td>{key.split("-")[1]}</td>
                     <td>{value}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default App;
