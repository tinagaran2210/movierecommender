package com.project.Movie.controller;

import com.project.Movie.model.Movies;
import com.project.Movie.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@CrossOrigin(origins = "*") //Make the api accessible from every port
@Controller  //Use if you want to access the controller from the java app
@RestController  //Use to access the api call
public class MoviesController {

    @Autowired
    private MoviesService serviceM; //Connect this controller to this service

    @GetMapping("/getMovies")  //Method call to get all movies
    public List<Movies> getAll()
    {
        return serviceM.getAll();
    }

    @PostMapping("/addMovies") //Method call to add movies
    public String addMovie(@RequestBody Movies movies){
        return serviceM.createMovie(movies);
    } //Post data from body object

    @GetMapping("/page/{pageNo}")  //Get calling method wish passing page no
    public Page<Movies> findPaginatedMovies(@PathVariable int pageNo){ //Use pathVariable to access id in url

        int pageSize = 8;
        Page<Movies> page = serviceM.getPaginatedMovies(pageNo, pageSize);

        return page;

    }

    @PostMapping("/deleteMovie")  //Method call to delete the movie
    public String deleteMovie(@RequestBody Movies movie){return serviceM.deleteMovie(movie);}  // Pass movie object in body into the service

    @GetMapping("/getMovies/{id}") //Method call to get movies detail by id
    public List<Movies> getById(@PathVariable int id){
        return serviceM.getById(id);
    }

    @GetMapping("/getMyMovies/{id}") //Method call to get users fav movie by passing id
    public List<Movies> getMyMovie(@PathVariable int id){return serviceM.getMyMovie(id);}

}
