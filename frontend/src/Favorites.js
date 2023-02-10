import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './MovieList.css';

const MovieList = () => {
  const username = localStorage.getItem("username");
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(833);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userID, setUserID] = useState(null);


   useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/api/user/getUserIDByUsername?username=${username}`);
        const userID = await response.json();
        setUserID(userID);
         localStorage.setItem("userID", userID);

      };
      fetchData();
    }, []);


const [favmovies, setfavmovies] = useState([]);

useEffect(() => {
        fetch('http://localhost:8080/api/user/getFavourites')
          .then((response) => response.json())
          .then((result) => {
            setfavmovies(result);
          });
      }, []);


const addFavorite = async (movieId, userId) => {
  try {
    const response = await fetch("http://localhost:8080/api/user/addFavourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ movieid: movieId, userid: userId })
    });
    if (response.status === 200) {
      console.log("Successfully added movie to favorites");
    } else {
      console.log("Error adding movie to favorites");
    }
  } catch (error) {
    console.error(error);
  }
};

const removeFavorite = async (movieId, userId) => {
  try {
    const response = await fetch("http://localhost:8080/api/user/removeFavourites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ movieid: movieId, userid: userId })
    });
    if (response.status === 200) {
      console.log("Successfully removed movie from favorites");
    } else {
      console.log("Error removing movie from favorites");
    }
  } catch (error) {
    console.error(error);
  }
};



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

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie , indexOfLastMovie);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   const currentMoviess = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [currentMenu, setCurrentMenu] = useState("Favourites");
    const handleMenuClick = (menu) => {
      setCurrentMenu(menu);
    };

    const [rating, setRating] = useState(null);

      const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
      };

      const handleRatingSubmit = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/user/ratings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movieId: selectedMovie.MOVIEID, rating, rating }),
          });
          if (!response.ok) {
            throw new Error("Failed to submit rating");
          }
          setShowModal(false);
          setSelectedMovie(null);
          setRating(null);
        } catch (error) {
          console.error(error);
        }
      };

return (

           <div className="movie-list-container">
            {/*
<div>
      {userID ? <p>User ID: {userID}</p> : <p>Loading...</p>}
    </div> */}
            <h1>Movie Recommender System</h1>
           <div className="menu-bar">

    <input type="text" placeholder="Search Movies here" value={query} onChange={(e) => setQuery(e.target.value)} />


        <button
          className={currentMenu === "All Movies" ? "active-menu" : ""}
          onClick={() => {
            handleMenuClick("All Movies");
            window.location.href = "/movie-list";
          }}
        >
         All Movies
        </button>

        <button
          className={currentMenu === "Favourite movies" ? "active-menu" : ""}
          onClick={() => {
            handleMenuClick("Favourite movies");
            window.location.href = "/favorites";
          }}
        >
          Favourite movies
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



     <div className="movie-cards-container">
    {favmovies
      .filter(fav => fav.USERID  === userID)
      .map((fav, index) => (

      <React.Fragment key={index}>
        {currentMoviess.map((movie, index) => {
         if (movie.MOVIEID === fav.MOVIEID) {
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
             <h3 className="movie-title" color>{movie.TITLE}</h3>
           </div>
         </div>
           );
                     }
       })}
</React.Fragment>
      ))}


     </div>
     <div className="pagination-container">
       <button
         disabled={currentPage === 1}
         onClick={prevPage}
         className="pagination-btn prev-btn"
       >
         Prev
       </button>
       <button
         disabled={currentPage === Math.ceil(movies.length / moviesPerPage)}
         onClick={nextPage}
         className="pagination-btn next-btn"
       >
         Next
       </button>
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
         <button
           className="close-button"
           onClick={() => {
             handleMenuClick("All Movies");
             localStorage.setItem("selectedMovieId", selectedMovie.MOVIEID);
             localStorage.setItem("selectedMovieTitle", selectedMovie.TITLE);
             localStorage.setItem("selectedMoviePoster", selectedMovie.poster_path);
             window.location.href = "/recommended-movies";
           }}
         >
           Recommend Similar Movies
         </button>

<br />
         <br />
         <button
                    onClick={() => {
                      removeFavorite(selectedMovie.MOVIEID, userID);
                      setSelectedMovie(null);
                    }}
                    className="close-button"
                  >
                    Remove Favourites
                  </button>
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