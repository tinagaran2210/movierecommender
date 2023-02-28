package com.project.Movie.model;


public class Movies {

    private int MOVIEID;
    private String TITLE;
    private String GENRES;
    private int TMDBID;
    private String POSTER;
    private String DESCRIPTION;

    //This model has movieID as a primary key
    //Below is constructor and getter and setter

    public Movies() {
    }

    public Movies(int MOVIEID, String TITLE, String GENRES, int TMDBID, String POSTER, String DESCRIPTION) {
        this.MOVIEID = MOVIEID;
        this.TITLE = TITLE;
        this.GENRES = GENRES;
        this.TMDBID = TMDBID;
        this.POSTER = POSTER;
        this.DESCRIPTION = DESCRIPTION;
    }

    public int getMOVIEID() {
        return MOVIEID;
    }

    public void setMOVIEID(int MOVIEID) {
        this.MOVIEID = MOVIEID;
    }

    public String getTITLE() {
        return TITLE;
    }

    public void setTITLE(String TITLE) {
        this.TITLE = TITLE;
    }

    public String getGENRES() {
        return GENRES;
    }

    public void setGENRES(String GENRES) {
        this.GENRES = GENRES;
    }

    public int getTMDBID() {
        return TMDBID;
    }

    public void setTMDBID(int TMDBID) {
        this.TMDBID = TMDBID;
    }

    public String getPOSTER() {
        return POSTER;
    }

    public void setPOSTER(String POSTER) {
        this.POSTER = POSTER;
    }

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    public void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION;
    }
}
