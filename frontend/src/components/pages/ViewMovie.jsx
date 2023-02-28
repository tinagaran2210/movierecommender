import React, {Component} from 'react'
import MovieService from '../../services/MovieService'

import Navbar from "./Navbar";

class ViewMovie extends Component{

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
        };

        //Code below is to display movies in page and limit per page but currently not use
        this.curPage = 1;
        this.postPerPage= 12;
        this.lastPostIndex= this.curPage * this.postPerPage;
        this.firstPostIndex= this.lastPostIndex - this.postPerPage;
        this.curPost= this.state.movies.slice(this.firstPostIndex, this.lastPostIndex);
    }

    //Process to run during page load
    componentDidMount(){

        //Getting all the movie from the API call
        MovieService.getAllMovie().then((res) => {

            //Inserting the result to movies array and set idLoading to false
            this.setState({ movies: res.data, isLoading: false });
            
            //Looping through each movie
            this.state.movies.forEach((movie) => {

            //URL to get the every movie API
              let URL = 'https://api.themoviedb.org/3/movie/' + movie.tmdbid + '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
                
              //After fetching the result from the url
              fetch(URL)
                .then((res) => res.json()) //Convert it into JSON 
                .then((data) => {

                //Setting the poster of each movie
                  this.setState(prevState => ({
                    movies: prevState.movies.map(m => {

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
    }

    //Not in use but use for displaying result in limit
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

        return(
            <div className="body dark">
                <Navbar/>

                <h1 className="text-center" style={{ color: "white"}}> MooVie </h1>

                <div className="container mt-3">
                    <div className="row mt-3" style={{ justifyContent: "center" }}>
                        {
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

export default ViewMovie;