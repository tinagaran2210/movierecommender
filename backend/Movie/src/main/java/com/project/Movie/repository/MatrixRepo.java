package com.project.Movie.repository;

import com.project.Movie.model.Movies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import com.project.Movie.model.Matrix;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class MatrixRepo {

    @Autowired
    private JdbcOperations jdbcTemplate; //JdbcOperation use to use sql queries into oracle database

    //prefix sql for getting the matrix
    private String prefixSQL = "SELECT * FROM MOVIES \n" +
            "    WHERE MOVIEID IN (SELECT MOVIE_ID FROM SIM_MATRIX WHERE ";

    //middle part of the sql
    private String midfixSQL = " > 0.6 AND MOVIE_ID <> ";

    //the end part of the sql
    private String postfixSQL = " DESC FETCH FIRST 5 ROWS ONLY)";
    private String SQL ="SELECT * FROM MOVIES \n" +
            "    WHERE MOVIEID IN (SELECT MOVIE_ID FROM SIM_MATRIX WHERE ID_1 > 0.6 AND MOVIE_ID <> ) ";

    //Map every row into Matrix object
    private RowMapper<Matrix> rowMapper = (ResultSet rs, int row) ->{

        Matrix matrix = new Matrix();
        matrix.setMovieId((rs.getInt(1)));

        return matrix;
    };

    //I do not think we use this
    private RowMapper<Movies> rowMapper2 = (ResultSet rs, int row) ->{

        Movies movies = new Movies();

        movies.setMOVIEID(rs.getInt(1));
        movies.setGENRES(rs.getString(3));
        movies.setTITLE(rs.getString(2));
        movies.setTMDBID(rs.getInt(4));
        movies.setPOSTER(rs.getString(5));


        return movies;
    };

    //Not using this also
    public List<Matrix> findAll(int id){

        String column = "ID_"+id;
        return jdbcTemplate.query(prefixSQL + column + midfixSQL + id +")", rowMapper);

    }

    //Get all movieID recommended by from selecting a movie
    public List<Movies> findAllREC(int id){

        String column = "ID_"+id;
        return jdbcTemplate.query(prefixSQL + column + midfixSQL + id +" ORDER BY ID_" + id + postfixSQL, rowMapper2);

    }
}
