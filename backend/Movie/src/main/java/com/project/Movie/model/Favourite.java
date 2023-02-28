package com.project.Movie.model;

public class Favourite {

    private int favID;
    private int userID;
    private int movieID;

    //Model attribute for favourite containing favID as primary key, and then userID from user, and movieID from movie

    //Below is constructor and getter and setter
    public Favourite() {
    }

    public Favourite(int favID, int userID, int movieID) {
        this.favID = favID;
        this.userID = userID;
        this.movieID = movieID;
    }

    public int getFavID() {
        return favID;
    }

    public void setFavID(int favID) {
        this.favID = favID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getMovieID() {
        return movieID;
    }

    public void setMovieID(int movieID) {
        this.movieID = movieID;
    }
}
