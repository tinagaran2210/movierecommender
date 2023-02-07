import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
}));

const MovieDisplay = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);

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
          };
        })
      );
      setMovies(tmdbMovies);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`}
                  title={movie.TITLE}
                />
                    <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.TITLE}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {movie.OVERVIEW}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default MovieDisplay;
