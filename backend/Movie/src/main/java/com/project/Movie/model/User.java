package com.project.Movie.model;


public class User {

    private int USERID;
    private String USERNAME;
    private String EMAIL;
    private String FIRSTNAME;
    private String LASTNAME;
    private String PASSWORD;
    private String PASSWORD2;
    private String TYPE;

    //This model has userID as a primary key
    //Below is constructor and getter and setter

    public User() {
    }

    public User(int USERID, String USERNAME, String EMAIL, String FIRSTNAME, String LASTNAME, String PASSWORD, String TYPE) {
        this.USERID = USERID;
        this.USERNAME = USERNAME;
        this.EMAIL = EMAIL;
        this.FIRSTNAME = FIRSTNAME;
        this.LASTNAME = LASTNAME;
        this.PASSWORD = PASSWORD;
        this.TYPE = TYPE;
    }

    public int getUSERID() {
        return USERID;
    }

    public void setUSERID(int USERID) {
        this.USERID = USERID;
    }

    public String getUSERNAME() {
        return USERNAME;
    }

    public void setUSERNAME(String USERNAME) {
        this.USERNAME = USERNAME;
    }

    public String getEMAIL() {
        return EMAIL;
    }

    public void setEMAIL(String EMAIL) {
        this.EMAIL = EMAIL;
    }

    public String getFIRSTNAME() {
        return FIRSTNAME;
    }

    public void setFIRSTNAME(String FIRSTNAME) {
        this.FIRSTNAME = FIRSTNAME;
    }

    public String getLASTNAME() {
        return LASTNAME;
    }

    public void setLASTNAME(String LASTNAME) {
        this.LASTNAME = LASTNAME;
    }

    public String getPASSWORD() {
        return PASSWORD;
    }

    public void setPASSWORD(String PASSWORD) {
        this.PASSWORD = PASSWORD;
    }

    public String getPASSWORD2() {
        return PASSWORD2;
    }

    public void setPASSWORD2(String PASSWORD2) {
        this.PASSWORD2 = PASSWORD2;
    }

    public String getTYPE() {
        return TYPE;
    }

    public void setTYPE(String TYPE) {
        this.TYPE = TYPE;
    }
}
