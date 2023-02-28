package com.project.Movie.repository;

import com.project.Movie.model.Favourite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class FavouriteRepository {

    @Autowired
    private JdbcOperations jdbcTemplate; //JdbcOperation use to use sql queries into oracle database

    //Method to map every row into favourite object by specifying the column index of that value in the table
    private RowMapper<Favourite> rowMapper = (ResultSet rs, int rowNum) ->{

        Favourite fav = new Favourite();

        fav.setFavID((rs.getInt(1)));
        fav.setUserID(rs.getInt(2));
        fav.setMovieID(rs.getInt(3));

        return fav;
    };

    //Method to add a fav movie into the fav_movie table
    public boolean addFav(Favourite f){

        //sql statement to insert values into the table which are userID and movieID
        String sql = "INSERT INTO FAV_MOVIES (USERID, MOVIEID) VALUES (?, ?)";

        //get a response from the server is success it will return 1
        if(jdbcTemplate.update(sql, f.getUserID(), f.getMovieID()) >0)
            return true;
        else
            return false;
    }

    //Method to remove a fav movie
    public boolean removeFav(Favourite f){

        String sql = "DELETE FROM FAV_MOVIES WHERE USERID = ? AND MOVIEID = ?";

        if(jdbcTemplate.update(sql, f.getUserID(), f.getMovieID()) > 0)
            return true;
        else
            return false;
    }

    //Method to get all favourite movie in the table and map it into Favourite object
    public List<Favourite> getAll(){
        return jdbcTemplate.query("Select * from FAV_MOVIES", rowMapper);
    }

    //Method to get all fav movies of the user by passing the userID
    public List<Favourite> getByID(int id){
        return jdbcTemplate.query("Select * from FAV_MOVIES WHERE USERID = "+id, rowMapper);
    }

}
