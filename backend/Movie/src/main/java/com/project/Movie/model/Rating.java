package com.project.Movie.model;

public class Rating {

    private int USERID;
    private int MOVIEID;
    private int RATING;
    private int TIMESTAMP;

    //This model uses userID as a primary key to call it
    //Below is constructor and getter and setter

    public Rating() {
    }

    public Rating(int USERID, int MOVIEID, int RATING, int TIMESTAMP) {
        this.USERID = USERID;
        this.MOVIEID = MOVIEID;
        this.RATING = RATING;
        this.TIMESTAMP = TIMESTAMP;
    }

    public int getUSERID() {
        return USERID;
    }

    public void setUSERID(int USERID) {
        this.USERID = USERID;
    }

    public int getMOVIEID() {
        return MOVIEID;
    }

    public void setMOVIEID(int MOVIEID) {
        this.MOVIEID = MOVIEID;
    }

    public int getRATING() {
        return RATING;
    }

    public void setRATING(int RATING) {
        this.RATING = RATING;
    }

    public int getTIMESTAMP() {
        return TIMESTAMP;
    }

    public void setTIMESTAMP(int TIMESTAMP) {
        this.TIMESTAMP = TIMESTAMP;
    }
}
