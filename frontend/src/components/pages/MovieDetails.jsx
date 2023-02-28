import React, {Component} from 'react'
import FavouriteService from '../../services/FavouriteService';
import MovieService from '../../services/MovieService'
import RatingService from '../../services/RatingService';

import Navbar from "./Navbar";

class MovieDetails extends Component{

    constructor(props){

        super(props)
        
        //Creating variables
        this.state={
            movies: [], //Creating movies array
            IMG_PATH: 'https://image.tmdb.org/t/p/w1280', //Image path to fetch poster and background
            poster: '', //Poster variable to get from api
            
            //Image for movie if have no image from db or api
            noImg: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
           
            //make the page loading to true
            isLoading: true,
            id: window.location.href.split('/')[4], //Getting the movieID pass in the url
            recMoviesId: [], //Creating recommended movies id array
            recMovies:[], //Creating recommended movies array
            rating: 0, //Declaring rating variables
            curUserID: localStorage.getItem('id'), //Getting current userid
            favMovie: [], //Creating fav movie array
            favState: null, //Declaring favourite status of the current movie
        };

        //Binding the function to the render page
        this.addFavourite = this.addFavourite.bind(this);
        this.deleteFavourite = this.deleteFavourite.bind(this);
    }

    //Add Movie to Favourite Function and passing movieid into the function
    addFavourite(idMovie){

        //Creating a favMovie object containing userID and movieID
        const favMovie = {
            userID: this.state.curUserID,
            movieID: idMovie
        }

        //Sending the favMovie object to the API 
        FavouriteService.addToFav(favMovie).then((res) =>{

            alert('Movie Added To Favorite')
            this.setState({favState: true}) //Setting favState to true
        })

    }

    //Remove Movie from Favourite Function and passing movieid into the function
    deleteFavourite(idMovie){

        //Creating a favMovie object containing userID and movieID
        const favMovie = {
            userID: this.state.curUserID,
            movieID: idMovie
        }

        //Sending the favMovie object to the API 
        FavouriteService.removeFav(favMovie).then((res) => {

            alert('Movie Remove From Favorite')
            this.setState({favState: null}) //Setting favState to null
        })

    }

    //Process to run during page load
    componentDidMount(){

        //Sending current movieID to the API call of getting movie details and getting the result
        MovieService.getMovieByID(this.state.id).then((res) =>{

            //Inserting the result to movies array and set idLoading to false
            this.setState({movies: res.data,isLoading: false }); 
            
            //Looping through each movie
            this.state.movies.forEach((movie) => {

                let title = movie.title; //Getting the movie title and store it in a variable
                let titleArr = title.split(' '); //Splitting the title by space into an array
                let indexOfThe = titleArr.indexOf("The"); //Finding the index of The 

                //If there is The in the title, bring it to the front of the title
                if (indexOfThe > 0) {
                    let the = titleArr.splice(indexOfThe, 1);
                    titleArr.unshift(...the);
                }

                let updatedTitle = titleArr.join(" ").replace(",", ""); //Rejoin the array title
                
                //Setting the title of the movie to the updated title
                this.setState(prevState => ({
                    movies: prevState.movies.map(m =>{
                        return{
                            ...m,
                            title: updatedTitle
                        };
                    })
                }))

                //URL to get the current movie API
                let URL = 'https://api.themoviedb.org/3/movie/' + movie.tmdbid + '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
                
                //After fetching the result from the url
                fetch(URL)
                  .then((res) => res.json()) //Convert it into JSON 
                  .then((data) => {

                    //Setting the poster, overview, and background of the movie
                    this.setState(prevState => ({
                      movies: prevState.movies.map(m => {

                        //Check if the poster in the database is not empty
                          if(m.poster != null){
                              return{
                                    ...m,
                                    poster: m.poster,
                                    overview: m.description,
                                    backdrop_path: this.state.IMG_PATH + data.backdrop_path,
                                }
                            }
                        //Check if the movie has a tmdbid  and use the data from the api
                          if (m.tmdbid === movie.tmdbid) {
                            return {
                                    ...m,
                                    overview: data.overview,
                                    backdrop_path: this.state.IMG_PATH + data.backdrop_path,
                                    poster: data.poster_path ? this.state.IMG_PATH + data.poster_path : this.state.noImg
                                };
                            }

                            return m;
                      })
                    }));
                });
            });
        })

        //Sending the current movieID to the API call of getting recommend movie and get the result
        MovieService.getRecommendedMovies(this.state.id).then((res) =>{

            this.setState({recMovies: res.data}); //Store movieid in recMovies

            //Looping through each movie
            this.state.recMovies.forEach((movie) => {

                //URL to get the current movie API
                let URL = 'https://api.themoviedb.org/3/movie/' + movie.tmdbid + '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
                
                //After fetching the result from the url
                fetch(URL)
                  .then((res) => res.json()) //Convert it into JSON 
                  .then((data) => {

                    //Setting the poster of the movie
                    this.setState(prevState => ({
                      recMovies: prevState.recMovies.map(m => {

                        //Check if the poster in the database is not empty
                          if(m.poster != null){
                              return{
                                  ...m,
                                  poster: m.poster
                              }
                          }
                        //Check if the movie has a tmdbid  and use the data from the api
                          else if (m.tmdbid === movie.tmdbid) {
                          return {
                            ...m,
                            poster: data.poster_path ? this.state.IMG_PATH + data.poster_path : this.state.noImg
                          };
                        }
                        return m;
                      })
                    }));
                });
            });
        });

        //Sending current movie id to the API call
        RatingService.getMovieRating(this.state.id)
        .then((res) => {
            this.setState({rating: res.data[0].rating}) //Get the average rating of the movie and store it
        });

        //Sending current user id to the API call
        FavouriteService.getMyFav(this.state.curUserID).then((res) =>{
            this.setState({favMovie: res.data}) //Get fav movie result

            //Checking if the current movie is in the user fav movie list
            this.state.favMovie.forEach((fav) =>{

                if(fav.movieID == this.state.id)
                    this.setState({favState: true}) //Setting the state of favourite to true

            });
        });
    }

    render(){
        
        if(this.state.isLoading){
            return(
                <div className="body dark">
                    <Navbar />
                    <br/><br/><br/><br/>
                    <h1>Loading...</h1>
                </div>
            )
        }

        return(
            <div className="body dark">
                <Navbar />  
                {
                    this.state.movies.map(
                        movie => 
                        <div 
                            
                            style={{
                                backgroundImage: `url('${movie.backdrop_path}')`,    
                                backgroundSize: 'cover'
                            }}
                        >
                            <div className="container rightleft  border-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)"  }}>
                                <div className="left">
                                    <div
                                        className="card carddd ps-2 pt-2 pe-2 border-2"
                                        style={{
                                        width: "18rem",
                                        // color: "rgb(150, 150, 150)",
                                        backgroundColor: "#212529",
                                        }}
                                    >
                                        <img 
                                            src={movie.poster} 
                                            alt={movie.tmdbid}
                                            className="card-img-top"
                                            style={{ height: "350px", borderRadius: "2%" }}
                                        />
                                        <div className="card-body">
                                            <h4
                                                className="card-title text-center"
                                                style={{ 
                                                    color: "rgb(200, 200, 200)",
                                                    
                                                }}
                                            >
                                                {movie.title}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div
                                    className="right ms-2 pt-2"
                                    style={{
                                        fontSize: "25px",
                                        textAlign: "justify",
                                        color: "rgb(255, 255, 255)",
                                        
                                    }}
                                >
                                    <h1 style={{
                                        fontSize: "60px"
                                    }}
                                    >{movie.title}</h1>

                                    {/* Replacing all the | into , in genre */}
                                    <h5>{movie.genres.replaceAll('|', ', ')}</h5> 
                                    
                                    <h5>Rating: {this.state.rating} / 5</h5>
                                    <br />
                                    <br />
                                    
                                    <p style={{ fontSize: "20px", fontStyle: "italic" }}>                      
                                        {movie.overview}
                                    </p>
                                    <br/>
                                    {
                                        //Checking if the state of fav is null display add to fav button and the function
                                        this.state.favState == null && ( 

                                            <button 
                                                onClick={() => this.addFavourite(movie.movieid)}
                                                style={{ 
                                                    borderRadius: "12px",
                                                    backgroundColor: "#212529",
                                                    border: "none",
                                                    color: "white", 
                                                    padding: "20px",
                                                    textAlign: "center",
                                                    textDecoration: "none",
                                                    display: "inline-block",
                                                    fontSize: "18px",
                                                    margin: "4px 2px",
                                                    cursor: "pointer",
                                                }}
                                            > Add To Favorite </button>     
                                    )}
                                    {
                                        //Checking if the state of fav is true display remove from fav button and the function
                                        this.state.favState != null && ( 

                                            <button 
                                                onClick={() => this.deleteFavourite(movie.movieid)}
                                                style={{ 
                                                    borderRadius: "12px",
                                                    backgroundColor: "#212529",
                                                    border: "none",
                                                    color: "white", 
                                                    padding: "20px",
                                                    textAlign: "center",
                                                    textDecoration: "none",
                                                    display: "inline-block",
                                                    fontSize: "18px",
                                                    margin: "4px 2px",
                                                    cursor: "pointer",
                                                }}
                                            > Remove From Favorite </button>     
                                    )}
                                    
                                    <br/><br/><br/><br/>
                                </div>     
                            </div>  
                        </div>
                )}
                       
                <br/><br/>
                <div>
                    <center><h1 style={{ color: "white"}}>Recommended Movies</h1></center>
                    
                    <div className="mt-3">
                    <div className="row mt-3" style={{ justifyContent: "center" }}>
                        {
                            //Checking if the length of recommend movie array is more than 0 display the recommended movie
                            this.state.recMovies.length > 0 ? 
                                this.state.recMovies.map(
                                    movie => 
                                        
                                        <div 
                                            className= "card carddd ps-2 pt-2 pe-2 border-2 m-3   "
                                            style={{
                                                width: "18rem",
                                                color: "rgb(150, 150, 150)",
                                                backgroundColor: "#212529",
                                            }}
                                            >     
                                            <a href={'/MovieDetails/'+movie.movieid} key={movie.movieid}>                      
                                                <img 
                                                    src={movie.poster} 
                                                    alt={movie.tmdbid}
                                                    className="card-img-top"
                                                    style={{ height: "350px", borderRadius: "2%" }}
                                                />
                                            </a> 
                                            <div className="card-body">
                                                <h5
                                                    className="card-title text-center"
                                                    style={{ color: "rgb(200, 200, 200)" }}
                                                >
                                                    {movie.title}
                                                </h5>
                                            </div>
                                        </div>  
                                )
                            :
                            
                            (
                                //If not display this message
                                <div> 
                                    <center><h1 style={{ color: "white"}}> No Movies Recommended </h1></center>
                                </div>
                            )
                        }
                    </div>
                </div> 

                </div>

            </div>
        )
    }
}

export default MovieDetails;