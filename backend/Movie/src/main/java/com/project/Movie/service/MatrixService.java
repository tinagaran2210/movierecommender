package com.project.Movie.service;

import com.project.Movie.model.Matrix;
import com.project.Movie.model.Movies;
import com.project.Movie.repository.MatrixRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatrixService {

    @Autowired
    private MatrixRepo repoM; //Connect to repository

    //Method to get similar movie
    //Not being use in system
    public ResponseEntity<?> getSimilar(int id){

        try {

            List<Matrix> matrix = repoM.findAll(id);
            return new ResponseEntity<List<Matrix>>(matrix, HttpStatus.OK);

        }catch (DataAccessException e){

            return new ResponseEntity<>("No recommended movies", HttpStatus.BAD_REQUEST);

        }
    }

    //Method to get recommended movie of a movie by passing the movieid
    public ResponseEntity<?> getSimilarMovie(int id){

        try {

            List<Movies> movies = repoM.findAllREC(id);
            return new ResponseEntity<List<Movies>>(movies, HttpStatus.OK); //To display response in console

        }catch (DataAccessException e){

            return new ResponseEntity<>("No recommended movies", HttpStatus.BAD_REQUEST); //To display response in console

        }
    }
}
