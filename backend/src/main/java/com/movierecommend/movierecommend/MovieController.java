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


    //user signup
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

    //admin signup
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


    //user login
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

    //admin login
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


    //get all movies
    @GetMapping("/getMovies")
    public List<Map<String, Object>> getMovies() {

        List<Map<String, Object>> movies;
        movies=jdbcTemplate.queryForList("Select * from movies");

        return movies;
    }

    //add movies
    @PostMapping("/addmovies")
    public ResponseEntity<String> addmovies(@RequestBody Map<String, Object> addmovies) {
        String sql = "INSERT INTO movies (movieid, title, genres, tmdbid) VALUES (movies_seq.NEXTVAL, ?, ?, ?)";
        jdbcTemplate.update(sql, addmovies.get("title"), addmovies.get("genres"), Integer.parseInt((String) addmovies.get("tmdbid")));
        return new ResponseEntity<>("Movie added successfully", HttpStatus.OK);
    }

    //get userid
    @GetMapping("/getUserID")
    public List<Map<String, Object>>getUserID() {

        List<Map<String, Object>> userid;
        userid=jdbcTemplate.queryForList("Select id from users");
        return userid;
    }

    //get userid by username
    @GetMapping("/getUserIDByUsername")
    public Long getUserIDByUsername(@RequestParam("username") String username) {
        String sql = "SELECT id FROM users WHERE username = ?";
        Long userID = jdbcTemplate.queryForObject(sql, new Object[] {username}, Long.class);
        return userID;
    }


    //get users
    @GetMapping("/getUsers")
    public List<Map<String, Object>>getUsers() {

        List<Map<String, Object>> users;
        users=jdbcTemplate.queryForList("Select * from users");
        return users;
    }

    //get admins
    @GetMapping("/getAdmins")
    public List<Map<String, Object>>getAdmins() {

        List<Map<String, Object>> admins;
        admins=jdbcTemplate.queryForList("Select * from admins");
        return admins;
    }

    //get user ratings for a movie by the user
    @GetMapping("/user_ratings/{movieId}/{userId}")
    public Integer getUserRating(@PathVariable Long movieId, @PathVariable Long userId) {
        String sql = "SELECT rating FROM user_ratings WHERE movieid = ? AND userid = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, movieId, userId);
    }

    //get all user ratings
    @GetMapping("/user_ratings")
    public List<Map<String, Object>> getUserRatings() {
        String sql = "SELECT * FROM user_ratings";
        return jdbcTemplate.queryForList(sql);
    }

    //add/update ratings
    @PostMapping("/addratings")
    public void addRating(@RequestBody Map<String, Object> addRating) {
        int userid = (int) addRating.get("userid");
        int movieid = (int) addRating.get("movieid");
        int rating = (int) addRating.get("rating");

        String sqlCheck = "SELECT COUNT(*) FROM user_ratings WHERE movieid = ?";
        int count = jdbcTemplate.queryForObject(sqlCheck, new Object[] { movieid }, Integer.class);

        if (count > 0) {
            String sqlUpdate = "UPDATE user_ratings SET rating = ? WHERE movieid = ?";
            jdbcTemplate.update(sqlUpdate, rating, movieid);
        } else {
            String sqlInsert = "INSERT INTO user_ratings (userid, movieid, rating) VALUES (?, ?, ?)";
            jdbcTemplate.update(sqlInsert, userid, movieid, rating);
        }
    }

    //get favorite movies of a user id
    @GetMapping("/favorites")
    public List<Map<String, Object>> getFavorites(@RequestParam("userID") Long userID) {
        return jdbcTemplate.queryForList("SELECT * FROM favorite_movies WHERE userid = ?", userID);
    }

    //get all favorite movies
    @GetMapping("/getFavourites")
    public List<Map<String, Object>> getFavorites() {
        String sql = "SELECT movieid, userid FROM favorite_movies";
        return jdbcTemplate.queryForList(sql);
    }

    //add favourite movies
    @PostMapping("/addFavourites")
    public void addFavorite(@RequestBody Map<String, Object> favData) {
        int userid = (int) favData.get("userid");
        int movieid = (int) favData.get("movieid");
        String sql = "INSERT INTO favorite_movies (movieid, userid) VALUES (?, ?)";
        jdbcTemplate.update(sql, movieid, userid);
    }

    //remove favorites movies
    @DeleteMapping("/removeFavourites")
    public void removeFavorite(@RequestBody Map<String, Object> favData) {
        int userid = (int) favData.get("userid");
        int movieid = (int) favData.get("movieid");
        String sql = "DELETE FROM favorite_movies WHERE movieid = ? and userid = ?";
        jdbcTemplate.update(sql, movieid, userid);
    }





    //add/update ratings
//    @PostMapping("/ratings")
//    public void saveRatings(@RequestBody Map<String, Object> payload) {
//        int userId = (int) payload.get("userid");
//        int movieId = (int) payload.get("movieid");
//        int rating = (int) payload.get("ratings");
//
//        String sqlCheck = "SELECT COUNT(*) FROM user_ratings WHERE movieid = ?";
//        int count = jdbcTemplate.queryForObject(sqlCheck, new Object[] { movieId }, Integer.class);
//
//        if (count > 0) {
//            String sqlUpdate = "UPDATE user_ratings SET ratings = ? WHERE movieid = ?";
//            jdbcTemplate.update(sqlUpdate, rating, movieId);
//        } else {
//            String sqlInsert = "INSERT INTO user_ratings (userid, movieid, ratings) VALUES (?, ?, ?)";
//            jdbcTemplate.update(sqlInsert, userId, movieId, rating);
//        }
//    }



    //    @PostMapping("/testratings")
//    public void testratings(@RequestBody Map<String, Object> favData) {
//        int userid = (int) favData.get("userid");
//        int movieid = (int) favData.get("movieid");
//        String sql = "INSERT INTO test_ratings (movieid, userid) VALUES (?, ?)";
//        jdbcTemplate.update(sql, movieid, userid);
//    }




    //get cosine similarity
    @GetMapping("/cosineSimilarity")
    public List<Map<String, Object>> getCosine() {

        List<Map<String, Object>> cosine;
        cosine=jdbcTemplate.queryForList("Select * from cosine_similarity");

        return cosine;
    }

    //get pearson Correlation
    @GetMapping("/pearsonCorrelation")
    public List<Map<String, Object>> getPearson() {

        List<Map<String, Object>> pearson;
        pearson=jdbcTemplate.queryForList("Select * from pearson_correlation");

        return pearson;
    }



    //Cosine Similarity Calculation
    @GetMapping("/calculateCosine")
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

                //results are put into a table
                String insertSql = "INSERT INTO cosine_similarity (movieId1, movieId2, cosineSimilarity) VALUES (?, ?, ?)";
                jdbcTemplate.update(insertSql, movieId1, movieId2, cosineSimilarity);
                jdbcTemplate.update(insertSql, movieId2, movieId1, cosineSimilarity);


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

    //Pearson Correlation Calculation
    @GetMapping("/calculatePearson")
    public List<Map<String, Object>> calculatePearsonCorrelation() {
        List<Map<String, Object>> results = new ArrayList<>();

        // Fetch all movie ids and ratings in a single query
        Map<Long, List<Double>> movieRatings = new HashMap<>();
        jdbcTemplate.query("SELECT movieid, rating FROM ratings where movieid<1000", (rs) -> {
            long movieId = rs.getLong("movieid");
            double rating = rs.getDouble("rating");
            //ensure ratings are stored together in a list under the movieid
            movieRatings.computeIfAbsent(movieId, (k) -> new ArrayList<>()).add(rating);
        });

        // Calculate Pearson correlation between all pairs of movies
        List<Long> movieIds = new ArrayList<>(movieRatings.keySet());
        for (int i = 0; i < movieIds.size(); i++) {
            for (int j = i; j < movieIds.size(); j++) {
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

                // Calculate Pearson correlation
                double sum1 = 0;
                double sum2 = 0;
                double sum1Sq = 0;
                double sum2Sq = 0;
                double pSum = 0;

                for (int k = 0; k < length; k++) {
                    double rating1 = ratings1.get(k);
                    double rating2 = ratings2.get(k);
                    sum1 += rating1;
                    sum2 += rating2;
                    sum1Sq += rating1 * rating1;
                    sum2Sq += rating2 * rating2;
                    pSum += rating1 * rating2;
                }

                double num = pSum - (sum1 * sum2 / length);
                double den = Math.sqrt((sum1Sq - (sum1 * sum1 / length)) * (sum2Sq - (sum2 * sum2 / length)));
                if (den == 0) {
                    continue;
                }

                double pearsonCorrelation = num / den;

                //results are put into a table
                String insertSql = "INSERT INTO pearson_correlation (movieId1, movieId2, pearsonCorrelation) VALUES (?, ?, ?)";
                jdbcTemplate.update(insertSql, movieId1, movieId2, pearsonCorrelation);
                jdbcTemplate.update(insertSql, movieId2, movieId1, pearsonCorrelation);

                Map<String, Object> result1 = new HashMap<>();
                result1.put("movieId1", movieId1);
                result1.put("movieId2", movieId2);
                result1.put("pearsonCorrelation", pearsonCorrelation);
                results.add(result1);

                Map<String, Object> result2 = new HashMap<>();
                result2.put("movieId1", movieId2);
                result2.put("movieId2", movieId1);
                result2.put("pearsonCorrelation", pearsonCorrelation);
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

