package com.revature.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {
	
	@GetMapping("/hello.app")
	public @ResponseBody ResponseEntity<String> getWord(){
		return new ResponseEntity<String>("Food", HttpStatus.OK);
	}

}
