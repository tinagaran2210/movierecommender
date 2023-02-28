package com.project.Movie.service;

import com.project.Movie.model.Rating;
import com.project.Movie.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    RatingRepository repo; //Connect to repository

    //Get all ratings in the table
    public List<Rating>getAll(){
        return repo.findAll();
    }

    //Method to get specific movie avg rating
    public List<Rating>getRating(int id){
        return repo.getRating(id);
    }

}
