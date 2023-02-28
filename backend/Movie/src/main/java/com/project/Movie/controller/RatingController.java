package com.project.Movie.controller;

import com.project.Movie.model.Rating;
import com.project.Movie.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*") //Make the api accessible from every port
@Controller //Use if you want to access the controller from the java app
@RestController //Use to access the api call
public class RatingController {

    @Autowired
    RatingService serviceR;

    @GetMapping("/getRating") //Api call method to get all the rating
    public List<Rating> getAll(){
        return serviceR.getAll();
    }

    @GetMapping("/rating/{id}") //Api call method to get rating by a specific user
    public List<Rating> getRating(@PathVariable int id){
        return serviceR.getRating(id);
    }

}
