/**
 * A.A.A (C) All Rights Reserved
 */

package com.revature.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session.Cookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.revature.model.User;
import com.revature.service.UserService;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/login")
public class SessionController {

	@Autowired
	private UserService userServ;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<String> createSession(String email, String password, 
			HttpServletRequest request, HttpServletResponse response)
			throws NotFoundException {
		
		String token = "";
		
		Optional<User> user = userServ.getUserByEmail(email);
		if(user.isPresent()) {
			if(BCrypt.checkpw(password, user.get().getPassword())) {
				// login user here. Meaning assign them a cool token
				Algorithm algo = Algorithm.HMAC256(user.get().getFirstName());
				/**
				 * Need to be returned as part of response header in the cookie
				 */
				token = JWT.create()
						.withClaim("email", email)
						.withClaim("password", password)
						.withIssuer("auth0")
						.sign(algo);
			};
			
//			Cookie cookie = new Cookie();
//			// add this to the header
//			cookie.setName("somethin");
//			cookie.setComment("another somethin");
//			response.addCookie();
			
		}
		return new ResponseEntity<String>(token, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable(value="id") long id)
	{
		Optional<User> user = userServ.getUserById(id);
		User foundUser = user.get();
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
	}
}
