package com.revature;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages= {"com.revature*"})
public class FoodieApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodieApplication.class, args);
	}

}
