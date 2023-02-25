import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const username = localStorage.getItem("username");
  const userIDs = localStorage.getItem("userID");
  const selectmovieid = localStorage.getItem("selectedMovieId");
  const selectmovieposter = localStorage.getItem("selectedMoviePoster");
  const selectmovietitle = localStorage.getItem("selectedMovieTitle");
  const firstmovie = parseInt(selectmovieid, 10);
  const userID = parseInt(userIDs, 10);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5000);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favmovies, setfavmovies] = useState([]);
  const [data, setData] = useState([]);

  /*Get Favourite movies by user*/
  useEffect(() => {
    fetch("http://localhost:8080/api/user/getFavourites")
      .then((response) => response.json())
      .then((result) => {
        setfavmovies(result);
      });
  }, []);

  /*Add Favourite Movies*/
  const addFavorite = async (movieId, userId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/addFavourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieid: movieId, userid: userId }),
        }
      );
      if (response.status === 200) {
        console.log("Successfully added movie to favorites");
      } else {
        console.log("Error adding movie to favorites");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*Remove Favourite Movies*/
  const removeFavorite = async (movieId, userId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/removeFavourites",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieid: movieId, userid: userId }),
        }
      );
      if (response.status === 200) {
        console.log("Successfully removed movie from favorites");
      } else {
        console.log("Error removing movie from favorites");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*Get all movies*/
  useEffect(() => {
    const fetchData = async () => {
      const movieResponse = await fetch(
        "http://localhost:8080/api/user/getMovies"
      );
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

  /*Search Movies*/
  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.TITLE.toLowerCase().includes(query.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [query, movies]);

  /*Get Pearson Correlation*/
  useEffect(() => {
    fetch("http://localhost:8080/api/user/pearsonCorrelation")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  /*Sort the similarity in descending order*/
  const sortedData = [...data].sort(
    (a, b) => b.PEARSONCORRELATION - a.PEARSONCORRELATION
  );

  /* Pagination and filter when search*/
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentMoviess = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  /* Change page*/
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  /*Navigation Pane*/
  const [currentMenu, setCurrentMenu] = useState("Favourites");
  const handleMenuClick = (menu) => {
    setCurrentMenu(menu);
  };

  /*The display Page*/
  return (
    <div className="movie-list-container">
      <div className="menu-bar">
        {/*Navigation Pane Buttons*/}
        <button
          className={currentMenu === "All Movies" ? "active-menu" : ""}
          onClick={() => {
            handleMenuClick("All Movies");
            window.location.href = "/movie-list";
          }}
        >
          Back
        </button>

        <button
          className={currentMenu === "Logout" ? "active-menu" : ""}
          onClick={() => {
            handleMenuClick("Logout");
            window.location.href = "/";
          }}
        >
          Logout ({username})
        </button>
      </div>
      {/*The selected movie*/}
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectmovieposter}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`}
          alt={selectmovieid}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title" color>
            {selectmovietitle}
          </h3>
        </div>
      </div>

      <h1>Recommended Movies (Pearson)</h1>

      {/*Showing Recommended Movies*/}
      <div className="movie-cards-container">
        <div className="movie-cards-container">
          {/*Showing only score more than 0.8 and 5 movies*/}
          {sortedData
            .filter(
              (row) => row.MOVIEID1 === firstmovie && row.PEARSONCORRELATION > 0.8
            )
            .slice(0, 4)
            .map((row, index) => (
              <React.Fragment key={index}>
                {currentMoviess.map((movie, index) => {
                  if (movie.MOVIEID === row.MOVIEID2) {
                    return (
                      <div
                        className="movie-card"
                        key={index}
                        onClick={() => setSelectedMovie(movie)}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`}
                          alt={movie.MOVIEID}
                          className="movie-poster"
                        />
                        <div className="movie-info">
                          <h3 className="movie-title" color>
                            {movie.TITLE}
                          </h3>
                        </div>
                      </div>
                    );
                  }
                })}
              </React.Fragment>
            ))}
        </div>

        {/*Display Details of Selected Movies*/}
      </div>
      {selectedMovie && (
        <div className="selected-movie-container">
          <h2 className="selected-movie-title">{selectedMovie.TITLE}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`}
            className="selected-movie-poster"
          />
          <p className="selected-movie-title">{selectedMovie.GENRES}</p>
          <p className="selected-movie-title">{selectedMovie.overview}</p>
          <br />
          <br />

          {/*Check if selected movie is in favourites*/}
          {favmovies.findIndex(
            (movie) =>
              movie.MOVIEID === selectedMovie.MOVIEID && movie.USERID == userID
          ) === -1 ? (
            /*Display Add to Favourite button if it is not in favourites*/
            <button
              onClick={() => {
                addFavorite(selectedMovie.MOVIEID, userID);
                setSelectedMovie(null);
              }}
              className="close-button"
            >
              Add to Favourites
            </button>
          ) : (
            /*Display Remove from Favourites button if it is in favourites*/
            <button
              onClick={() => {
                removeFavorite(selectedMovie.MOVIEID, userID);
                setSelectedMovie(null);
              }}
              className="close-button"
            >
              Remove from Favourites
            </button>
          )}
          <br />
          <br />
          <button
            onClick={() => setSelectedMovie(null)}
            className="close-button"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
