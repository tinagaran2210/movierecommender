import React, { useState, useEffect } from 'react';

const SimilarMovies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/user/cosineSimilarity')
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const sortedData = [...data].sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);

  return (
    <div>
      <h2>Cosine Similarity</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Id 1</th>
            <th>Movie Id 2</th>
            <th>Cosine Similarity</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => {
            if (row.movieId1 !== 5) {
              return null;
            }
            return (
              <tr key={row.movieId1 + row.movieId2}>
                <td>{row.movieId1}</td>
                <td>{row.movieId2}</td>
                <td>{row.cosineSimilarity.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SimilarMovies;
