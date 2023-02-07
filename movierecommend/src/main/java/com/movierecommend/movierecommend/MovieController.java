package com.movierecommend.movierecommend;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

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
//        movies=jdbcTemplate.queryForList("Select * from movies where movieid between 1 and 233");
        movies=jdbcTemplate.queryForList("Select * from movies where movieid<1000");

        return movies;
    }

    @GetMapping("/getRatings")
    public List<Map<String, Object>> getRatings() {

        List<Map<String, Object>> ratings;
//        ratings=jdbcTemplate.queryForList("Select rating from ratings where movieid between 1 and 233");
        ratings=jdbcTemplate.queryForList("Select rating from ratings where movieid <10  and userid <10");


        return ratings;
    }

    @GetMapping("/getLinks")
    public List<Map<String, Object>> getLinks() {

        List<Map<String, Object>> links;
        links=jdbcTemplate.queryForList("Select * from links where movieid<1000");
        return links;
    }


//@GetMapping("/cosine")
//public Map<String, Double> cosineSimilarityMovies() {
//    Map<String, Double> similarities = new HashMap<>();
//    List<Integer> movieIds = jdbcTemplate.queryForList("SELECT DISTINCT movieid FROM ratings WHERE movieid<=10 and userid <=50", Integer.class);
//
//    for (int i = 0; i < movieIds.size(); i++) {
//        int movie1Id = movieIds.get(i);
//        Map<Integer, Double> movie1Ratings = new HashMap<>();
//        jdbcTemplate.query(
//                "SELECT rating FROM ratings WHERE movieid = ? and movieid<=10 and userid <=50",
//                new Object[]{movie1Id},
//                rs -> {
//                    movie1Ratings.put(rs.getRow(), rs.getDouble("rating"));
//                }
//        );
//
//        for (int j = i + 1; j < movieIds.size(); j++) {
//            int movie2Id = movieIds.get(j);
//            Map<Integer, Double> movie2Ratings = new HashMap<>();
//            jdbcTemplate.query(
//                    "SELECT rating FROM ratings WHERE movieid = ? and movieid<=10 and userid <=50 ",
//                    new Object[]{movie2Id},
//                    rs -> {
//                        movie2Ratings.put(rs.getRow(), rs.getDouble("rating"));
//                    }
//            );
//
//            double dotProduct = 0.0;
//            double magnitude1 = 0.0;
//            double magnitude2 = 0.0;
//
//            for (Map.Entry<Integer, Double> entry : movie1Ratings.entrySet()) {
//                int row = entry.getKey();
//
//                if (movie2Ratings.containsKey(row)) {
//                    double ratingValue1 = entry.getValue();
//                    double ratingValue2 = movie2Ratings.get(row);
//                    dotProduct += ratingValue1 * ratingValue2;
//                    magnitude1 += ratingValue1 * ratingValue1;
//                    magnitude2 += ratingValue2 * ratingValue2;
//                }
//            }
//
//            double similarity;
//
//            similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
//            similarities.put(movie1Id + "-" + movie2Id, similarity);
//        }
//    }
//
//    Map<String, Double> sortedSimilarities = new TreeMap<>(similarities);
//    return sortedSimilarities;
//
//
//}



//    @GetMapping("/cosineSimilarity")
//    public List<Map<String, Object>> calculateCosineSimilarity() {
//        List<Map<String, Object>> results = new ArrayList<>();
//        List<Long> movieIds = jdbcTemplate.queryForList("SELECT DISTINCT movieid FROM ratings WHERE movieid<=1000", Long.class);
//        for (int i = 0; i < movieIds.size(); i++) {
//            for (int j = i + 1; j < movieIds.size(); j++) {
//                Long movieId1 = movieIds.get(i);
//                Long movieId2 = movieIds.get(j);
//                List<Double> ratings1 = jdbcTemplate.queryForList("SELECT rating FROM ratings WHERE movieid = ? and movieid<=1000",
//                        new Object[]{movieId1}, Double.class);
//                List<Double> ratings2 = jdbcTemplate.queryForList("SELECT rating FROM ratings WHERE movieid = ? and movieid<=1000",
//                        new Object[]{movieId2}, Double.class);
//                int length = Math.max(ratings1.size(), ratings2.size());
//                ratings1 = padWithZeroes(ratings1, length);
//                ratings2 = padWithZeroes(ratings2, length);
//                double dotProduct = 0;
//                for (int k = 0; k < length; k++) {
//                    dotProduct += ratings1.get(k) * ratings2.get(k);
//                }
//                double magnitude1 = 0;
//                for (int k = 0; k < length; k++) {
//                    magnitude1 += ratings1.get(k) * ratings1.get(k);
//                }
//                magnitude1 = Math.sqrt(magnitude1);
//                double magnitude2 = 0;
//                for (int k = 0; k < length; k++) {
//                    magnitude2 += ratings2.get(k) * ratings2.get(k);
//                }
//                magnitude2 = Math.sqrt(magnitude2);
//                double cosineSimilarity = dotProduct / (magnitude1 * magnitude2);
//                Map<String, Object> result = new HashMap<>();
//                result.put("movieId1", movieId1);
//                result.put("movieId2", movieId2);
//                result.put("cosineSimilarity", cosineSimilarity);
//                results.add(result);
//            }
//        }
//        return results;
//    }
//
//    private List<Double> padWithZeroes(List<Double> ratings, int length) {
//        while (ratings.size() < length) {
//            ratings.add(0.0);
//        }
//        return ratings;
//    }


//    @GetMapping("/cosineSimilarity")
//    public List<Map<String, Object>> calculateCosineSimilarity() {
//        List<Map<String, Object>> results = new ArrayList<>();
//
//        // Fetch all movie ids and ratings in a single query,
//        // and store the results in a Map for faster access
//        Map<Long, List<Double>> movieRatings = new HashMap<>();
//        jdbcTemplate.query("SELECT movieid, rating FROM ratings where movieid=1000", (rs) -> {
//            long movieId = rs.getLong("movieid");
//            double rating = rs.getDouble("rating");
//            movieRatings.computeIfAbsent(movieId, (k) -> new ArrayList<>()).add(rating);
//        });
//
//        // Calculate cosine similarity between all pairs of movies
//        List<Long> movieIds = new ArrayList<>(movieRatings.keySet());
//        for (int i = 0; i < movieIds.size(); i++) {
//            for (int j = i + 1; j < movieIds.size(); j++) {
//                Long movieId1 = movieIds.get(i);
//                Long movieId2 = movieIds.get(j);
//                List<Double> ratings1 = movieRatings.get(movieId1);
//                List<Double> ratings2 = movieRatings.get(movieId2);
//                int length = Math.max(ratings1.size(), ratings2.size());
//                ratings1 = padWithZeroes(ratings1, length);
//                ratings2 = padWithZeroes(ratings2, length);
//                double dotProduct = 0;
//                for (int k = 0; k < length; k++) {
//                    dotProduct += ratings1.get(k) * ratings2.get(k);
//                }
//                double magnitude1 = 0;
//                for (int k = 0; k < length; k++) {
//                    magnitude1 += ratings1.get(k) * ratings1.get(k);
//                }
//                magnitude1 = Math.sqrt(magnitude1);
//                double magnitude2 = 0;
//                for (int k = 0; k < length; k++) {
//                    magnitude2 += ratings2.get(k) * ratings2.get(k);
//                }
//                magnitude2 = Math.sqrt(magnitude2);
//                double cosineSimilarity = dotProduct / (magnitude1 * magnitude2);
//                Map<String, Object> result = new HashMap<>();
//                result.put("movieId1", movieId1);
//                result.put("movieId2", movieId2);
//                result.put("cosineSimilarity", cosineSimilarity);
//                results.add(result);
//            }
//        }
//        return results;
//    }
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
    jdbcTemplate.update("INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
            userData.get("email"), userData.get("username"), userData.get("password"));
    return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
}
@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        List<Map<String, Object>> users = jdbcTemplate.queryForList("SELECT * FROM users WHERE username = ? AND password = ?",
                loginData.get("username"), loginData.get("password"));
        if (users.isEmpty()) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("Login successful", HttpStatus.OK);
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



    @GetMapping("/cosineSimilarity")
public List<Map<String, Object>> calculateCosineSimilarity() {
    List<Map<String, Object>> results = new ArrayList<>();

    // Fetch all movie ids and ratings in a single query
    Map<Long, List<Double>> movieRatings = new HashMap<>();
    jdbcTemplate.query("SELECT movieid, rating FROM ratings where movieid<100", (rs) -> {
        long movieId = rs.getLong("movieid");
        double rating = rs.getDouble("rating");
        movieRatings.computeIfAbsent(movieId, (k) -> new ArrayList<>()).add(rating);
    });

    // Calculate cosine similarity between all pairs of movies
    List<Long> movieIds = new ArrayList<>(movieRatings.keySet());
    for (int i = 0; i < movieIds.size(); i++) {
        for (int j = i + 1; j < movieIds.size(); j++) {
            Long movieId1 = movieIds.get(i);
            Long movieId2 = movieIds.get(j);
            List<Double> ratings1 = movieRatings.get(movieId1);
            List<Double> ratings2 = movieRatings.get(movieId2);
            int length = Math.max(ratings1.size(), ratings2.size());
            ratings1 = padWithZeroes(ratings1, length);
            ratings2 = padWithZeroes(ratings2, length);
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
            Map<String, Object> result = new HashMap<>();
            result.put("movieId1", movieId1);
            result.put("movieId2", movieId2);
            result.put("cosineSimilarity", cosineSimilarity);
//            jdbcTemplate.update("INSERT INTO cosine_similarity (movieid1, movieid2, cosine_similarity) VALUES (?, ?, ?)", movieId1, movieId2, cosineSimilarity);
            results.add(result);
        }
    }
    movieRatings.clear();


    return results;



}

    private List<Double> padWithZeroes(List<Double> ratings, int length) {
        while (ratings.size() < length) {
            ratings.add(0.0);
        }
        return ratings;
    }

    }

