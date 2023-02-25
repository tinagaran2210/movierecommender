import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admindashboard.css";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [tmdbid, setTmdbid] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/user/addmovies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, genres, tmdbid }),
    })
      .then((res) => {
        if (res.status !== 200) {
          setMessage("Error in adding movie.");
        }
        if (res.status === 200) {
          setMessage("Movie added successfully.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="menu-bar">
          <ul>
            <li>
              <Link to="/admin-dashboard">Back</Link>
            </li>
          </ul>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>TMDBID</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={tmdbid}
                onChange={(e) => setTmdbid(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                required
              />
            </td>
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <br />
            <button type="submit" className="close-button">
              Add Movie
            </button>
            <br />
            <br />
            {message && <p>{message}</p>}
          </ul>
        </nav>
      </div>
    </form>
  );
};

export default AddMovie;
