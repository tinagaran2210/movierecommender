package com.project.Movie.repository;

import com.project.Movie.model.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class MovieRepository {

    @Autowired
    private  JdbcOperations jdbcTemplate; //JdbcOperation use to use sql queries into oracle database

    //SQL Query to store a movie into the table
    private String INSERT_MOVIE = "INSERT INTO MOVIES ( TITLE, GENRES, POSTER, DESCRIPTION) VALUES (?, ?, ?, ?)";

    //Map every row fetch into movies object
    private RowMapper<Movies> rowMapper = (ResultSet rs, int row) ->{

        Movies movies = new Movies();

        movies.setMOVIEID(rs.getInt(1));
        movies.setGENRES(rs.getString(3));
        movies.setTITLE(rs.getString(2));
        movies.setTMDBID(rs.getInt(4));
        movies.setPOSTER(rs.getString(5));
        movies.setDESCRIPTION(rs.getString(6));


        return movies;
    };
    //Method to get all movies and map it into movies object
    public List<Movies> findAll() {

        return jdbcTemplate.query("SELECT \n" +
                "    * \n" +
                "FROM \n" +
                "    MOVIES \n" +
                "ORDER BY \n" +
                "    MOVIEID DESC \n" +
                "FETCH NEXT 100 ROWS ONLY", rowMapper);
    }

    //Method to get specific movie by passing the movieid
    public List<Movies> findByID(int id){
        return jdbcTemplate.query("SELECT * FROM MOVIES WHERE MOVIEID ="+id, rowMapper);
    }

    //Method to get user fav movies by passing the userID
    public List<Movies> getMyMovie(int id){
        return jdbcTemplate.query("SELECT * FROM MOVIES WHERE MOVIEID IN ( SELECT MOVIEID FROM FAV_MOVIES WHERE USERID = "+id+")", rowMapper);
    }

    //Method to add movie into the table
    public boolean saveMovie(Movies m){
        if (jdbcTemplate.update( INSERT_MOVIE, m.getTITLE(), m.getGENRES(), m.getPOSTER(), m.getDESCRIPTION()) >0 )
            return true;
        else
            return false;
    }
    //Currently not being use
    public Page<Movies> findAllByPage(Pageable page){

        String rowCountSQL = "SELECT count(*) AS ROW_COUNT FROM MOVIES";

        int total = jdbcTemplate.queryForObject(
                rowCountSQL,
                Integer.class
        );

        List<Movies> movies = jdbcTemplate.query("SELECT * FROM MOVIES ORDER BY MOVIEID DESC"
                        + " OFFSET " + page.getOffset() + " ROWS FETCH NEXT 8 ROWS ONLY", rowMapper);

        return new PageImpl<Movies>(movies, page, total);
    }
    //Method to delete a movie
    public boolean deleteMovie(Movies m){

        String sql = "DELETE FROM MOVIES WHERE MOVIEID = ?";

        if(jdbcTemplate.update(sql, m.getMOVIEID() ) >0 )return true;
        else
            return false;
    }


}
