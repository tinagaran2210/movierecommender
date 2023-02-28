package com.project.Movie.model;

public class Matrix {

    private int movieId;


    //This model only has a movieID because it calculated rating pass into the movieID so we only call movieID
    //Below is constructor and getter and setter

    public Matrix() {
    }

    public Matrix(int movieId) {
        this.movieId = movieId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}
