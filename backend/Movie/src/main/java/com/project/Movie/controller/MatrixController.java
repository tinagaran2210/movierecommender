package com.project.Movie.controller;

import com.project.Movie.service.MatrixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*") //Make the api accessible from every port
@RestController //Use to access the api call
public class MatrixController {

    @Autowired
    private MatrixService serviceM; //Connect this controller to this service

    @GetMapping("/calc/{id}") //Get calling method with passing id in url
    public ResponseEntity<?> getSimilar(@PathVariable int id)
    {
        return serviceM.getSimilar(id);
    } //Use pathVariable to access id in url

    @GetMapping("/movies/{id}") //Get calling method with passing id in url
    public ResponseEntity<?> getSimilarMovie(@PathVariable int id)
    {
        return serviceM.getSimilarMovie(id);
    } //Use pathVariable to access id in url
}
