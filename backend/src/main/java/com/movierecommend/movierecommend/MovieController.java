package com.movierecommend.movierecommend;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class MovieController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //getting all records
    @GetMapping("/getMovies")
    public List<Map<String, Object>> getMovies() {

        List<Map<String, Object>> movies;
        movies=jdbcTemplate.queryForList("Select * from movies");

        return movies;
    }



    @GetMapping("/getUserID")
    public List<Map<String, Object>>getUserID() {

        List<Map<String, Object>> userid;
        userid=jdbcTemplate.queryForList("Select id from users");


        return userid;
    }

    @GetMapping("/getUsers")
    public List<Map<String, Object>>getUsers() {

        List<Map<String, Object>> users;
        users=jdbcTemplate.queryForList("Select * from users");


        return users;
    }

    @GetMapping("/getAdmins")
    public List<Map<String, Object>>getAdmins() {

        List<Map<String, Object>> admins;
        admins=jdbcTemplate.queryForList("Select * from admins");
        return admins;
    }

    @GetMapping("/getUserIDByUsername")
    public Long getUserIDByUsername(@RequestParam("username") String username) {
        String sql = "SELECT id FROM users WHERE username = ?";
        Long userID = jdbcTemplate.queryForObject(sql, new Object[] {username}, Long.class);
        return userID;
    }

    @GetMapping("/favorites")
    public List<Map<String, Object>> getFavorites(@RequestParam("userID") Long userID) {
        return jdbcTemplate.queryForList("SELECT * FROM favorite_movies WHERE userid = ?", userID);
    }

    @PostMapping("/addmovies")
    public ResponseEntity<String> addmovies(@RequestBody Map<String, Object> addmovies) {
        String sql = "INSERT INTO movies (movieid, title, genres, tmdbid) VALUES (movies_seq.NEXTVAL, ?, ?, ?)";
        jdbcTemplate.update(sql, addmovies.get("title"), addmovies.get("genres"), Integer.parseInt((String) addmovies.get("tmdbid")));
        return new ResponseEntity<>("Movie added successfully", HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String, String> userData) {
        int emailCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email = ?", Integer.class, userData.get("email"));
        if (emailCount > 0) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        int usernameCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE username = ?", Integer.class, userData.get("username"));
        if (usernameCount > 0) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }
        String password = userData.get("password");
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
        jdbcTemplate.update("INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
                userData.get("email"), userData.get("username"), passwordHash);
        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }


    @PostMapping("/ratings")
    public void saveRatings(@RequestBody Map<String, Object> payload) {
        int userId = (int) payload.get("userid");
        int movieId = (int) payload.get("movieid");
        int rating = (int) payload.get("ratings");

        String sqlCheck = "SELECT COUNT(*) FROM user_ratings WHERE movieid = ?";
        int count = jdbcTemplate.queryForObject(sqlCheck, new Object[] { movieId }, Integer.class);

        if (count > 0) {
            String sqlUpdate = "UPDATE user_ratings SET ratings = ? WHERE movieid = ?";
            jdbcTemplate.update(sqlUpdate, rating, movieId);
        } else {
            String sqlInsert = "INSERT INTO user_ratings (userid, movieid, ratings) VALUES (?, ?, ?)";
            jdbcTemplate.update(sqlInsert, userId, movieId, rating);
        }
    }
    @PostMapping("/adminsignup")
    public ResponseEntity<String> adminsignup(@RequestBody Map<String, String> adminData) {
        int emailCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM admins WHERE email = ?", Integer.class, adminData.get("email"));
        if (emailCount > 0) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        int usernameCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM admins WHERE adminname = ?", Integer.class, adminData.get("adminname"));
        if (usernameCount > 0) {
            return new ResponseEntity<>("Admin Username already exists", HttpStatus.BAD_REQUEST);
        }
        String password = adminData.get("password");
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt()) ;
        jdbcTemplate.update("INSERT INTO admins (email, adminname, password) VALUES (?, ?, ?)",
                adminData.get("email"), adminData.get("adminname"), passwordHash);
        return new ResponseEntity<>("Admin created successfully", HttpStatus.CREATED);
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        List<Map<String, Object>> users = jdbcTemplate.queryForList("SELECT * FROM users WHERE username = ?", username);
        if (users.isEmpty()) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> user = users.get(0);
        String storedPassword = (String) user.get("password");
        if (!BCrypt.checkpw(password, storedPassword)) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    }

    @PostMapping("/adminlogin")
    public ResponseEntity<String> adminlogin(@RequestBody Map<String, String> adminloginData) {
        String adminname = adminloginData.get("adminname");
        String password = adminloginData.get("password");

        List<Map<String, Object>> users = jdbcTemplate.queryForList("SELECT * FROM admins WHERE adminname = ?", adminname);
        if (users.isEmpty()) {
            return new ResponseEntity<>("Invalid admin name or password", HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> user = users.get(0);
        String storedPassword = (String) user.get("password");
        if (!BCrypt.checkpw(password, storedPassword)) {
            return new ResponseEntity<>("Invalid admin name or password", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    }





    @GetMapping("/getFavourites")
    public List<Map<String, Object>> getFavorites() {
        String sql = "SELECT movieid, userid FROM favorite_movies";
        return jdbcTemplate.queryForList(sql);
    }

    @PostMapping("/addFavourites")
    public void addFavorite(@RequestBody Map<String, Object> favData) {
        int userid = (int) favData.get("userid");
        int movieid = (int) favData.get("movieid");
        String sql = "INSERT INTO favorite_movies (movieid, userid) VALUES (?, ?)";
        jdbcTemplate.update(sql, movieid, userid);
    }

    @PostMapping("/addratings")
    public void addRating(@RequestBody Map<String, Object> addRating) {
        String userid = (String) addRating.get("userid");
        String movieid = (String) addRating.get("movieid");
        String rating = (String) addRating.get("rating");

        String sql = "INSERT INTO user_ratings (userid, movieid, rating) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, Integer.parseInt(userid), Integer.parseInt(movieid), Integer.parseInt(rating));
    }


    @DeleteMapping("/removeFavourites")
    public void removeFavorite(@RequestBody Map<String, Object> favData) {
        int userid = (int) favData.get("userid");
        int movieid = (int) favData.get("movieid");
        String sql = "DELETE FROM favorite_movies WHERE movieid = ? and userid = ?";
        jdbcTemplate.update(sql, movieid, userid);
    }



    @GetMapping("/cosineSimilarity")
    public List<Map<String, Object>> calculateCosineSimilarity() {
    List<Map<String, Object>> results = new ArrayList<>();

    // Fetch all movie ids and ratings in a single query
    Map<Long, List<Double>> movieRatings = new HashMap<>();
    jdbcTemplate.query("SELECT movieid, rating FROM ratings where movieid<1000", (rs) -> {
        long movieId = rs.getLong("movieid");
        double rating = rs.getDouble("rating");
        //ensure ratings are stored together in a list under the movieid
        movieRatings.computeIfAbsent(movieId, (k) -> new ArrayList<>()).add(rating);
    });

    // Calculate cosine similarity between all pairs of movies
    List<Long> movieIds = new ArrayList<>(movieRatings.keySet());
    //iterates over all unique pairs of movies in the movieIds list.
        for (int i = 0; i < movieIds.size(); i++) {
            for (int j = i; j < movieIds.size(); j++) {
                //skips same movies
                if (i == j) {
                    continue;
                }
                Long movieId1 = movieIds.get(i);
                Long movieId2 = movieIds.get(j);
                List<Double> ratings1 = movieRatings.get(movieId1);
                List<Double> ratings2 = movieRatings.get(movieId2);
                //find the largest length between 2 vector
                int length = Math.max(ratings1.size(), ratings2.size());
                //pad the shortest length with 0 to match the largest length
                ratings1 = padWithZeroes(ratings1, length);
                ratings2 = padWithZeroes(ratings2, length);

                //calculating the cosine similarity
                double dotProduct = 0;
                for (int k = 0; k < length; k++) {
                    dotProduct += ratings1.get(k) * ratings2.get(k);
                }
                double magnitude1 = 0;
                for (int k = 0; k < length; k++) {
                    magnitude1 += ratings1.get(k) * ratings1.get(k);
                }
                magnitude1 = Math.sqrt(magnitude1);
                double magnitude2 = 0;
                for (int k = 0; k < length; k++) {
                    magnitude2 += ratings2.get(k) * ratings2.get(k);
                }
                magnitude2 = Math.sqrt(magnitude2);
                double cosineSimilarity = dotProduct / (magnitude1 * magnitude2);
                //the results are put into maps where it contains three key-value pairs: movieId1, movieId2, and cosineSimilarity.
                Map<String, Object> result1 = new HashMap<>();
                result1.put("movieId1", movieId1);
                result1.put("movieId2", movieId2);
                result1.put("cosineSimilarity", cosineSimilarity);
                results.add(result1);
                //putting the movieid1 and movieid2 vice versa
                Map<String, Object> result2 = new HashMap<>();
                result2.put("movieId1", movieId2);
                result2.put("movieId2", movieId1);
                result2.put("cosineSimilarity", cosineSimilarity);
                results.add(result2);
            }
        }

        movieRatings.clear();


    return results;



}

    //padding with 0s function
    private List<Double> padWithZeroes(List<Double> ratings, int length) {
        while (ratings.size() < length) {
            ratings.add(0.0);
        }
        return ratings;
    }

    }

