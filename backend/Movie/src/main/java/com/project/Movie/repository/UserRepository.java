package com.project.Movie.repository;


import com.project.Movie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcOperations jdbcTemplate; //JdbcOperation use to use sql queries into oracle database

    private String type = "2"; //To set a default value of usertype as 2 which is user

    //SQL statement to add a user into the table
    private String INSERT_USER = "INSERT INTO USER ( EMAIL, FIRSTNAME, LASTNAME, PASSWORD, USERNAME, TYPE) VALUES (?, ?, ?, ?, ?, "+type+")";

    //Mapping every row fetch into user object
    private RowMapper<User> rowMapper = (ResultSet rs, int row) ->{

        User user = new User();

        user.setUSERID(rs.getInt(1));
        user.setEMAIL(rs.getString(2));
        user.setFIRSTNAME(rs.getString(3));
        user.setLASTNAME(rs.getString(4));
        user.setPASSWORD(rs.getString(5));
        user.setUSERNAME(rs.getString(6));
        user.setTYPE(rs.getString(7));

        return user;
    };

    //Method to get all user
    public List<User> findAll(){
        return jdbcTemplate.query("Select * from USER", rowMapper);
    }

    //Login method by passing the username and search by username
    public User findByUsername(String Username) {
        String sql = "SELECT * FROM USER WHERE USERNAME LIKE '";
        List<User> users = jdbcTemplate.query(sql + Username + "'", rowMapper);
        if (users.isEmpty()) {
            return null;
        } else {
            return users.get(0);
        }
    }
    public User findByEmail(String Email) {
        String sql = "SELECT * FROM USER WHERE EMAIL LIKE '";
        List<User> users = jdbcTemplate.query(sql + Email + "'", rowMapper);
        if (users.isEmpty()) {
            return null;
        } else {
            return users.get(0);
        }
    }

    //Method of saving user into the table
    public boolean saveUser(User u){
        if( jdbcTemplate.update(INSERT_USER,u.getEMAIL(),u.getFIRSTNAME(),u.getLASTNAME(),
                u.getPASSWORD(),u.getUSERNAME()) > 0) return true;
        else
            return false;
    }

    //Method to promote a user into admin by getting the userID
    public boolean updateToAdmin(User u)
    {
        String sql = "UPDATE USER SET TYPE = 1 WHERE USERID = ?";
        if ( jdbcTemplate.update(sql, u.getUSERID()) > 0) return true;
        else
            return false;
    }

    //Method to delete a user
    public boolean deleteUser(User u)
    {
        String sql = "DELETE FROM USER WHERE USERID = ?";
        if ( jdbcTemplate.update(sql, u.getUSERID()) > 0) return true;
        else
            return false;
    }


}
