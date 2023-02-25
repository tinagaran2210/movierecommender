import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './admindashboard.css';

const MovieTable = () => {

  const adminname = localStorage.getItem("adminname");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
   const [query, setQuery] = useState("");
   const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieResponse = await fetch("http://localhost:8080/api/user/getMovies");
      const movieResult = await movieResponse.json();

      const tmdbMovies = await Promise.all(
        movieResult.map(async (movie) => {
          const tmdbMovieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.TMDBID}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`
          );
          const tmdbMovieResult = await tmdbMovieResponse.json();
          return {
            ...movie,
            poster_path: tmdbMovieResult.poster_path,
            overview: tmdbMovieResult.overview,
          };
        })
      );
      setMovies(tmdbMovies);
    };
    fetchData();
  }, []);

  useEffect(() => {
        setFilteredMovies(
          movies.filter((movie) => movie.TITLE.toLowerCase().includes(query.toLowerCase()))
        );
        setCurrentPage(1);
      }, [query, movies]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentMoviess = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (

      <div>
      <div className="menu-bar">

            <ul>
              <li>
                <input type="text" placeholder="Search Movies here" value={query} onChange={(e) => setQuery(e.target.value)} />
              </li>
              <li>
                <Link to="/admin-dashboard">Movies</Link>
              </li>
              <li>
                <Link to="/admin-user">Users</Link>
              </li>
              <li>
                <Link to="/admin-admins">Admins</Link>
              </li>
              <li>
                    <Link to="/admin-login">Logout ({adminname})</Link>
              </li>
            </ul>
          </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Poster</th>
              <th>Genre</th>
              <th>Overview</th>
            </tr>
          </thead>
          <tbody>
            {currentMoviess.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.TITLE}</td>
                <td>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </td>
                <td>{movie.GENRES}</td>
                <td>{movie.overview}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
            <li className={`page-item ${currentPage === Math.ceil(movies.length / moviesPerPage) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
                </button>
            </li>
            <br/>
                    <button className="add-button"
                         onClick={() => {
                           window.location.href = "/add-movies";
                         }}
                       >
                         Add Movies
                         </button>
            </ul>

           </nav>

           </div>
    );

};


export default MovieTable;
