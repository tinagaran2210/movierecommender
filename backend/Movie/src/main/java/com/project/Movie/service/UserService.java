package com.project.Movie.service;

import com.project.Movie.model.User;
import com.project.Movie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository repo; //Connect to repository

    @Autowired
    private PasswordEncoder passwordEncoder; //To encode password into hash

    //Method to get all the user in the database
    public List<User> getAll(){
        return repo.findAll();
    }

    //Method to create user
    public ResponseEntity<?> createUser(User user){

        User userdata1 = repo.findByUsername(user.getUSERNAME()); //To check if username already exist
        User userdata2 = repo.findByEmail(user.getEMAIL()); //To check if username already in use

        user.setPASSWORD(passwordEncoder.encode(user.getPASSWORD())); //save the password as encrypted into the table

        if( userdata1 != null ){

            return new ResponseEntity<>("Username is already exist", HttpStatus.BAD_REQUEST);

        }else if(userdata2 != null){

            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);

        }
        else{

            repo.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }

    }

    //Method to promote a user to admin
    public String updateToAdmin (User user ){

        String response;

        if(repo.updateToAdmin(user))
            response = "Successfully Updated";
        else
            response = "Something went wrong, Not updated, please try again";

        return response;
    }

    //Method to delete user
    public String deleteUser (User user ){

        String response;

        if(repo.deleteUser(user))
            response = "Successfully Deleted";
        else
            response = "Something went wrong, Not deleted, please try again";

        return response;
    }

    //Method to log in
    public ResponseEntity<?> loginUser(User user)
    {
        User userdata = repo.findByUsername(user.getUSERNAME()); //To find user by username

        if(userdata != null)
        {
            if(passwordEncoder.matches(user.getPASSWORD(), userdata.getPASSWORD())) //Decode the password retrieve from front end and table and compare it
            {
                return new ResponseEntity<User>(userdata, HttpStatus.OK);
            }
            else
            {
                return new ResponseEntity<>("Username or Password is Incorrect", HttpStatus.BAD_REQUEST);
            }
        }
        else
        {
            return new ResponseEntity<>("User does not exist!", HttpStatus.BAD_REQUEST);
        }
    }
}
