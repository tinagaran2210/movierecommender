import axios from "axios";

const MOVIE_LIST_API_URL = "http://localhost:8080/getMovies";
const MOVIE_ADD_API_URL = "http://localhost:8080/addMovies";
const MOVIE_PAGE_API_URL = "http://localhost:8080/page/";
const MOVIE_BYID_API_URL = "http://localhost:8080/getMovies/";
const MOVIE_RECOMMEND_API_URL = "http://localhost:8080/calc/";
const MOVIE_REC_API_URL = "http://localhost:8080/movies/";
const MOVIE_DEL_API_URL = "http://localhost:8080/deleteMovie";
const MOVIE_FAV_API_URL = "http://localhost:8080/getMyMovies/";

//Contain API CALL
class MovieService{

    //API CALL TO GET ALL MOVIE
    getAllMovie(){
        return axios.get(MOVIE_LIST_API_URL);
    }

    //API CALL TO GET MOVIE BY PAGE AND LIMIT
    getAllMovieByPage(pageNum){
        return axios.get(MOVIE_PAGE_API_URL+pageNum);
    }

    //API CALL TO ADD A MOVIE TO DATABASE
    createMovie(movie){
        return axios.post(MOVIE_ADD_API_URL, movie);
    }

    //API CALL TO GET A SPECIFIC MOVIE
    getMovieByID(id){
        return axios.get(MOVIE_BYID_API_URL + id);
    }

    //API CALL TO GET RECOMMENDED MOVIE
    getRecommended(id){
        return axios.get(MOVIE_RECOMMEND_API_URL+id)
    }

    //API CALL TO GET RECOMMENDED MOVIE 2
    getRecommendedMovies(id){
        return axios.get(MOVIE_REC_API_URL+id)
    }

    //API CALL TO DELETE A MOVIE
    deleteMovie(user){
        return axios.post(MOVIE_DEL_API_URL, user)
    }

    //API CALL TO GET USER FAVOURITE MOVIE
    getMyMovies(id){
        return axios.get(MOVIE_FAV_API_URL+id)
    }

}

export default new MovieService();