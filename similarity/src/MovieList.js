import React, { useState, useEffect } from "react";
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const movieResponse = await fetch("http://localhost:8080/api/user/getMovies");
      const movieResult = await movieResponse.json();

      const linksResponse = await fetch("http://localhost:8080/api/user/getLinks");
      const linksResult = await linksResponse.json();

      const movieWithLinks = movieResult.map((movie) => {
        const matchingLink = linksResult.find((link) => link.MOVIEID === movie.MOVIEID);
        if (matchingLink) {
          return {
            ...movie,
            tmdbid: matchingLink.TMDBID,
          };
        }
        return movie;
      });

      const tmdbMovies = await Promise.all(
        movieWithLinks.map(async (movie) => {
          const tmdbMovieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.tmdbid}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`
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

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

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
   <div className="menu-bar">
           <button className={currentMenu === "Movies" ? "active-menu" : ""} onClick={() => handleMenuClick("Movies")}>Movies</button>
           <button className={currentMenu === "Favourites" ? "active-menu" : ""} onClick={() => handleMenuClick("Favourites")}>Favourites</button>
           <button className={currentMenu === "My Ratings" ? "active-menu" : ""} onClick={() => handleMenuClick("My Ratings")}>My Ratings</button>
           <button className={currentMenu === "Recommended movies" ? "active-menu" : ""} onClick={() => handleMenuClick("Recommended movies")}>Recommended movies</button>
         </div>
     <div className="movie-cards-container">
       {currentMovies.map((movie, index) => (
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
             <h3 className="movie-title">{movie.TITLE}</h3>
           </div>
         </div>
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

        <button onClick={() => setSelectedMovie(null)} className="close-button">
                     Close
                   </button>
                    <form onSubmit={handleRatingSubmit}>
                             <label>
                               Give a rating:
                               <input type="number" min="1" max="5" value={rating || ""} onChange={(event) => setRating(event.target.value)} />
                             </label>
                             <button type="submit">Submit</button>
                           </form>
       </div>

     )}
   </div>

 );
};

export default MovieList;