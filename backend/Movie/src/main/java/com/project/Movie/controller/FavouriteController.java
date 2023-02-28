package com.project.Movie.controller;

import com.project.Movie.model.Favourite;
import com.project.Movie.service.FavouriteService;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //Make the api accessible from every port
@Controller  //Use if you want to access the controller from the java app
@RestController //Use to access the api call
public class FavouriteController {

    @Autowired
    private FavouriteService service; //Connect this controller to this service

    @PostMapping("/addFavourite") //Post calling method name
    public String addFav(@RequestBody Favourite fav){ //Post data from body object
        return service.addFav(fav);
    }

    @GetMapping("/getFavourites") //Get calling method
    public List<Favourite> getAllFav(){return service.getAll();}

    @GetMapping("/getFavourite/{id}") //Get calling method with passing id in url
    public List<Favourite> getMyFav(@PathVariable int id){return service.getByID(id);} //Use pathVariable to access id in url

    @PostMapping("/removeFavourite") //Post method to remove fav
    public String removeFav (@RequestBody Favourite fav){
        return service.deleteFav(fav);
    }

}
