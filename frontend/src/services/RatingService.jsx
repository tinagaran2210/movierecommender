import axios from "axios";

const RATING_MOVIE_API_URL = "http://localhost:8080/rating/";

//Contain API CALL
class MovieService{

    //API CALL TO GET MOVIE AVERAGE RATING
    getMovieRating(id){
        return axios.get(RATING_MOVIE_API_URL+id);
    }

}

export default new MovieService();