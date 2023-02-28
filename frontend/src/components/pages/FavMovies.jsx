import React, {Component} from 'react'
import MovieService from '../../services/MovieService'

import Navbar from "./Navbar";

class FavMovies extends Component{

    constructor(props){

        super(props)

        this.state = {
            movies: [], //Creting a movies array
            IMG_PATH: 'https://image.tmdb.org/t/p/w1280', //Image path to fetch poster and background
            poster: '', //Poster variable to get from api

            //Image for movie if have no image from db or api
            noImg: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
            
            //make the page loading to true
            isLoading: true,
            curUserID: localStorage.getItem('id'),// get current user id
        };

        //Code below is to display movies in page and limit per page but currently not use
        this.curPage = 1;
        this.postPerPage= 8;
        this.lastPostIndex= this.curPage * this.postPerPage;
        this.firstPostIndex= this.lastPostIndex - this.postPerPage;
        this.curPost= this.state.movies.slice(this.firstPostIndex, this.lastPostIndex);
    }

    componentDidMount(){

        //Getting the fav movies by passing current user id and store them in movies object
        MovieService.getMyMovies(this.state.curUserID).then((res) => {
            this.setState({ movies: res.data, isLoading: false }); //Storing the result to movies
            
            //Going to each movies api and fetching data from there
            this.state.movies.forEach((movie) => {
              let URL = 'https://api.themoviedb.org/3/movie/' + movie.tmdbid + '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
                
              //After calling each api we get the poster for the movies
              fetch(URL)
                .then((res) => res.json())
                .then((data) => {
                    //This method to use to preserve the object movies variables and add a new one
                  this.setState(prevState => ({
                    movies: prevState.movies.map(m => {
                        //Checking if the movie has a poster link in the database then we set that as the poster url
                        if(m.poster != null){
                            return{
                                ...m,
                                poster: m.poster
                            }
                        }
                        //If the movie has a tmdbid, we fetch the poster url from the api if not we use the no image url
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
    }

    //This call is use when there is a data update and we call the movie by page and limit but not currently in use
    componentDidUpdate(){

        this.curPost= this.state.movies.slice(this.firstPostIndex, this.lastPostIndex);
        
    }

    render(){

        //Check if loading is true display loading 
        if(this.state.isLoading){
            return(
                <div className="body dark">
                    <Navbar/>
                    <br/><br/><br/><br/>
                    <center><h1 style={{ color: "white"}}>Loading...</h1></center>
                </div>
            )
        }

        //If loading is false then we display the movies
        return(
            <div className="body dark">
                <Navbar/>

                <h1 className="text-center" style={{ color: "white"}}> My Favourite Movies </h1>

                <div className="container mt-3">
                    <div className="row mt-3" style={{ justifyContent: "center" }}>
                        {
                            //For each movies row in the movie object we map it into the card
                            this.state.movies.map(
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
                                        <a 
                                            href={'/MovieDetails/'+movie.movieid}
                                            style={{ textDecoration: "none" }}
                                        >                      
                                           <h5 className="card-title text-center text-primary">
                                                Click for details
                                            </h5>
                                        </a>
                                    </div>  
                            )
                        }
                    </div>
                </div>                
            </div>
        )
    }
}

export default FavMovies;