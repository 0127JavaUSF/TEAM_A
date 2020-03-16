package com.revature.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature.model.User;
import com.revature.service.SessionService;
import com.revature.service.UserService;

@RestController

@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userServ;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
		
		boolean validationCheck = userServ.checkValues(user);
		
		if (validationCheck) {
			user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
			
			User createdUser = userServ.createUser(user);
			/**
			 * Hash password using BCrypt library
			 */
			
			return new ResponseEntity<User>(createdUser ,HttpStatus.OK);
		}
		else return new ResponseEntity<User>(new User(), HttpStatus.PARTIAL_CONTENT);

	}
	
//	@GetMapping("/{email}")
//	public ResponseEntity<User> getUser(@PathVariable(value="email") String email)
//	{
//		Optional<User> user = userServ.getUserByEmail(email);
//		User foundUser = user.get();
//		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
//	}
	
//	@GetMapping(value= "/{id}")
//	public ResponseEntity<User> getUser(@PathVariable(value="id") long id)

	@GetMapping("/{email}")
	public ResponseEntity<User> getUser(@PathVariable(value="email") String email)
	{
		Optional<User> user = userServ.getUserByEmail(email);
		User foundUser = user.get();
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
	}
	
	@PostMapping(value="/updatePassword", consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> updatePassword(@RequestBody User clientUser) {
		User user = userServ.setPassword(clientUser);
		return  new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@PostMapping(value="/uploadProfilePic", consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> uploadProfilePic(@RequestBody User clientUser) {
		boolean validationCheck = userServ.checkUrl(clientUser);
		if(validationCheck)
		{
			User user = userServ.uploadPicture(clientUser);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}else return new ResponseEntity<User>(new User(), HttpStatus.PARTIAL_CONTENT);
		
	}
	
	@PostMapping(value="/updateUser", consumes = "application/json", produces = "application/json")
	public ResponseEntity<User> updateUserInformation(@RequestBody User clientUser) {
		User user = userServ.updateUser(clientUser);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

//	@GetMapping("/{id}")
//	public ResponseEntity<User> getUser(@PathVariable(value="id") long id)
//	{
//		Optional<User> user = userServ.getUserById(id);
//		User foundUser = user.get();
//		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
//	}

}