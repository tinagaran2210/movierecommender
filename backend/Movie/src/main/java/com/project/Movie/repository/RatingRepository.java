package com.project.Movie.repository;

import com.project.Movie.model.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class RatingRepository {

    @Autowired
    private JdbcOperations jdbcTemplate; //JdbcOperation use to use sql queries into oracle database

    //Prefix of the sql statement to get specific movie average rating
    private String prefixSQL ="SELECT MOVIEID, ROUND(AVG(RATING),1) as AVG_RATING FROM RATINGS \n" +
            "WHERE MOVIEID = ";
    private String postfixSQL = " GROUP BY MOVIEID"; //The post fix

    //Mapping every row into rating object
    private RowMapper<Rating> rowMapper = (ResultSet rs, int row) ->{

        Rating rating = new Rating();

        rating.setUSERID(rs.getInt(1));
        rating.setMOVIEID(rs.getInt(2));
        rating.setRATING(rs.getInt(3));
        rating.setTIMESTAMP(rs.getInt(4));

        return rating;
    };

    //Mapping every row into rating object just the movie id and the average rating
    private RowMapper<Rating> rowMapper2 = (ResultSet rs, int row) ->{

        Rating rating = new Rating();

        rating.setMOVIEID(rs.getInt(1));
        rating.setRATING(rs.getInt(2));

        return rating;
    };

    //Get al movie and its rating
    public List<Rating>findAll(){
        return jdbcTemplate.query("Select * from RATINGS WHERE ROWNUM <= 5 ", rowMapper);
    }

    //Get specific movie average rating
    public List<Rating> getRating(int id){
        return jdbcTemplate.query(prefixSQL + id + postfixSQL, rowMapper2);
    }
}
