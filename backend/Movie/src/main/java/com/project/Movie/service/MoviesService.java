package com.project.Movie.service;

import com.project.Movie.model.Movies;
import com.project.Movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoviesService {

    @Autowired
    MovieRepository repo; //Connect to repository

    //Method to get all movies
    public List<Movies> getAll(){
        return repo.findAll();
    }

    //Method to get user fav movies
    public List<Movies> getMyMovie(int id){return repo.getMyMovie(id);}

    //Method to add movie into the table
    public String createMovie( Movies movies){
        String response;

        if(repo.saveMovie(movies))
            response = "Successfully Added";
        else
            response = "Something went wrong, Not added, please try again";

        return response;
    }

    //Not being use
    public Page<Movies> getPaginatedMovies(int pageNo, int pageSize){

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        return repo.findAllByPage(pageable);

    }

    //Get specific movie details
    public List<Movies> getById(int id){
        return repo.findByID(id);
    }

    //Method to delete movie
    public String deleteMovie(Movies movie)
    {
        String response;

        if (repo.deleteMovie(movie))
            response = "Successfully Deleted";
        else
            response = "Something went wrong, Not Deleted, please try again";

        return response;
    }
}
