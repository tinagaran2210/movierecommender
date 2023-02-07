package com.movierecommend.movierecommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
public class MovierecommendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovierecommendApplication.class, args);
	}

//	@Override
//	public void run(String... args) throws Exception {
//		List<Movie> listMovies = movieRepo.findAll();
//		listMovies.forEach(System.out :: println);
//
//	}
}
