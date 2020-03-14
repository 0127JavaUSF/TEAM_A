package com.revature.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.revature.service.SessionService;
import com.revature.service.UserService;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*")
@RequestMapping("/login")
public class SessionController {
	
	enum Keys { CUSTOM_SUCCESS, CUSTOM_ERROR };

	@Autowired
	private UserService userServ;
	
	@Autowired
	private SessionService sessServ;
	
	@PostMapping(produces = "application/json")
	public ResponseEntity<User> createSession(String email, String password, 
			HttpServletRequest request, HttpServletResponse response)
			throws NotFoundException {
		
		String token = "";
				
		String userToken = sessServ.extractAuthToken(request);
		
		// does user have a token?		
		if(userToken != null) {
			if(sessServ.isAuthenticated(email, userToken)) {
				// if user has cookie and they are authenticated
				// then all good.
				Optional<User> authedUser = sessServ.findUser(email);
				response.addHeader("custom_success", "user is authenticated");
				return new ResponseEntity<User>(authedUser.get(), HttpStatus.OK);

			} else {
				response.addHeader("custom_error", "authentication failed");
				return new ResponseEntity<User>(new User(), HttpStatus.I_AM_A_TEAPOT);
				}
		} else {
			System.out.println("email: " + email + "");
			Optional<User> user = userServ.getUserByEmail(email);
			User returnedUser = user.get();
			System.out.println(returnedUser);
			if(user.isPresent()) {
					
				String hashedPwd = returnedUser.getPassword();
				
				if(sessServ.isPassword(password, hashedPwd)) {
					
					Algorithm algo = Algorithm.HMAC256(returnedUser.getFirstName());
					/**
					 * Need to be returned as part of response header in the cookie
					 */
					token = JWT.create()
							.withClaim("email", email)
							.withClaim("password", hashedPwd)
							.withIssuer("auth0")
							.sign(algo);
	
					Cookie cookie = new Cookie("auth_token", token);
					response.addCookie(cookie);
					response.addHeader("custom_success", "user is authenticated. Cookie is returned.");
					return new ResponseEntity<User>(returnedUser, HttpStatus.OK);

				}
				response.addHeader("custom_error", "user entered incorrect password");
				return new ResponseEntity<User>(returnedUser, HttpStatus.UNAUTHORIZED);
				
			}
			
			response.addHeader("custom_error", "User with such email was not found.");
			return new ResponseEntity<User>(returnedUser, HttpStatus.NOT_FOUND);
						
		}
				
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable(value="id") long id)
	{
		Optional<User> user = userServ.getUserById(id);
		User foundUser = user.get();
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
	}
}
