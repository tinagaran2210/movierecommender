import React, { useState, useEffect } from "react";

const MoviePivotTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/user/getRatings");
      const data = await response.json();
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Movie Title</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={index}>
            <td>{movie.RATING}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviePivotTable;
