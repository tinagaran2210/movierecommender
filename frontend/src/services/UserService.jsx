import axios from "axios";

const USER_ADD_API_URL = "http://localhost:8080/addUser";
const USER_LOGIN_API_URL = "http://localhost:8080/login";
const USER_ALL_API_URL = "http://localhost:8080/getAllUser";
const USER_UPDATEADMIN_API_URL ="http://localhost:8080/updateToAdmin"
const USER_DELETE_API_URL = "http://localhost:8080/deleteUser"

//Contain API CALL
class UserService{

    //API CALL FOR LOGIN USER
    login(user){
        return axios.post(USER_LOGIN_API_URL,user);
    }

    //API CALL TO REGISTER A USER
    register(user){
        return axios.post(USER_ADD_API_URL,user);
    }

    //API CALL TO GET ALL USER 
    getAll(){
        return axios.get(USER_ALL_API_URL);
    }

    //API CALL TO PROMOTE USER TO ADMIN
    updateToAdmin(user){
        return axios.post(USER_UPDATEADMIN_API_URL,user);
    }

    //API CALL TO DELETE A USER
    delete(user){
        return axios.post(USER_DELETE_API_URL, user);
    }
}

export default new UserService();