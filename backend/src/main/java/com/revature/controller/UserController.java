package com.revature.controller;

import javax.validation.Valid;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.model.User;
import com.revature.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userServ;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
		
		User createdUser = userServ.createUser(user);
		/**
		 * Hash password using BCrypt library
		 */
		user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		return new ResponseEntity<User>(createdUser ,HttpStatus.OK);
	}
	
//	@GetMapping("/{id}")
//	public ResponseEntity<User> getUser(@PathVariable(value="id") long id)
//	{
//		Optional<User> user = userServ.getUser(id);
//		User foundUser = user.get();
//		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
//	}

}
