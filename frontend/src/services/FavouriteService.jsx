import axios from "axios";

const FAV_ADD_API_URL = "http://localhost:8080/addFavourite";
const FAV_MY_API_URL = "http://localhost:8080/getFavourite/";
const FAV_REMOVE_API_URL = "http://localhost:8080/removeFavourite";

//Contain API CALL
class FavoriteService{

    //API CALL FOR ADD MOVIE TO FAVOURITE
    addToFav(fav){
        return axios.post(FAV_ADD_API_URL, fav);
    }

    //API CALL TO GET USER FAVOURITE MOVIE
    getMyFav(id){
        return axios.get(FAV_MY_API_URL+id);
    }

    //API CALL TO REMOVE A MOVIE FROM USER FAVOURITE
    removeFav(fav){
        return axios.post(FAV_REMOVE_API_URL, fav);
    }
}

export default new FavoriteService();