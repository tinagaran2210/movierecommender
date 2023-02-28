package com.project.Movie.controller;

import com.project.Movie.model.User;
import com.project.Movie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //Make the api accessible from every port
@Controller //Use if you want to access the controller from the java app
@RestController //Use to access the api call
public class UserController {

    @Autowired
    private UserService serviceU;  //Connect this controller to this service

    @GetMapping("/getAllUser")  //Method call to get all user
    public List<User> getAllUser()
    {
        return serviceU.getAll();
    } //Get all user data by passing user object

    @PostMapping("/addUser")  //Method call to add a new user in the database
    public ResponseEntity<?> addUser(@RequestBody User user){
        return serviceU.createUser(user);
    } //Pass user object into the service

    @PostMapping("/login") //Method call to log in
    public ResponseEntity<?> login(@RequestBody User user)
    {
        return serviceU.loginUser(user);
    } //Pass data from the form into a user object

    @PostMapping("/updateToAdmin")  //Method call to update admin
    public String updateToAdmin(@RequestBody User user){
        return serviceU.updateToAdmin((user));
    } //Pass the user object into the service

    @PostMapping("/deleteUser") //Method call to delete a user
    public String deleteUser(@RequestBody User user){
        return serviceU.deleteUser((user));
    } //Pass user object from the body into the service
}
