package com.project.Movie.service;

import com.project.Movie.model.Favourite;
import com.project.Movie.repository.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteService {

    @Autowired
    FavouriteRepository repo; //Connect to repository

    //Method to add movie to favourite
    public String addFav(Favourite fav){

        String response; //Response to display in console

        if(repo.addFav(fav))
            response = "Successfully Added";
        else
            response = "Something went wrong, Not added, please try again";

        return  response;
    }

    //Method to get all favourite in table
    public List<Favourite> getAll(){
        return repo.getAll();
    }

    //Method to get user fav movies
    public List<Favourite> getByID(int id){
        return repo.getByID(id);
    }

    //Method to remove user fav movie
    public String deleteFav(Favourite fav){

        String response;

        if(repo.removeFav(fav))
            response = "Successfully Deleted";
        else
            response = "Something went wrong, Not deleted, please try again";

        return response;
    }

}
