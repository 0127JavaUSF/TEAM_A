package com.revature.controller;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.revature.model.User;
import com.revature.pojos.LoginCredentials;
import com.revature.service.SessionService;
import com.revature.service.UserService;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
//@RequestMapping("/login")
public class SessionController {
	
	enum Keys { CUSTOM_SUCCESS, CUSTOM_ERROR };

	@Autowired
	private UserService userServ;
	
	@Autowired
	private SessionService sessServ;
	
	@PostMapping(produces = "application/json")
<<<<<<< HEAD

	@RequestMapping("/login")
	public ResponseEntity<User> createSession(@RequestBody LoginCredentials loginCreds,
	HttpServletRequest request, HttpServletResponse response, @CookieValue(value = "auth_token", defaultValue = "") String jwt)
	throws NotFoundException {
	
		System.out.println("WTF DUDE: " + jwt);
=======
	public ResponseEntity<User> createSession(String email, String password, 
			HttpServletRequest request, HttpServletResponse response)
			throws NotFoundException{
		
>>>>>>> 5bfa79789391c79737c686413f9df9538f5cc0f8
		String token = "";
		
//		String userToken = jwt;
		
		// does user have a token?		
<<<<<<< HEAD
//		if(userToken != null) {
//			System.out.println("Bruuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuh\n");
//			if(sessServ.isAuthenticated(loginCreds.email, userToken)) {
//				System.out.println("Auth lol");
//				// if user has cookie and they are authenticated
//				// then all good.
//				
////				loginCreds.email
//				Optional<User> authedUser = sessServ.findUser("Chris@gmail.com");
//				
//				response.addHeader("custom_success", "user is authenticated");
//				return new ResponseEntity<User>(authedUser.get(), HttpStatus.OK);
//
//			} else {
//				System.out.println("Wtf lol");
//				response.addHeader("custom_error", "authentication failed");
//				return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
//				}
//		} else {
			System.out.println("email: " + loginCreds.email + "");
			Optional<User> user = userServ.getUserByEmail(loginCreds.email);
=======
		if(userToken != null) {
			if(sessServ.isAuthenticated(email, userToken)) {
				// if user has cookie and they are authenticated
				// then all good.
				Optional<User> authedUser = sessServ.findUser(email);
				response.addHeader("custom_success", "user is authenticated");
				return new ResponseEntity<User>(authedUser.get(), HttpStatus.OK);

			} else {
				response.addHeader("custom_error", "authentication failed");
				return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
				}
		} else {
			System.out.println(password);
			System.out.println("email: " + email + "");
			Optional<User> user = userServ.getUserByEmail(email);
>>>>>>> 5bfa79789391c79737c686413f9df9538f5cc0f8
			User returnedUser = user.get();
			if(user.isPresent()) {
					
				String hashedPwd = returnedUser.getPassword();
				
				if(sessServ.isPassword(loginCreds.password, hashedPwd)) {
					
					Algorithm algo = Algorithm.HMAC256(returnedUser.getFirstName());
					/**
					 * Need to be returned as part of response header in the cookie
					 */
					token = JWT.create()
							.withClaim("email", loginCreds.email)
							.withClaim("password", hashedPwd)
							.withIssuer("auth0")
							.sign(algo);
	
					Cookie cookie = new Cookie("auth_token", token);
//					response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
					cookie.setMaxAge(10*60*200);
					cookie.setPath("/");
					response.addCookie(cookie);
//					Cookie cook = new Cookie("hey", "lol");
//					response.addCookie(cook);
					response.addHeader("custom_success", "user is authenticated. Cookie is returned.");
					return new ResponseEntity<User>(returnedUser, HttpStatus.OK);

				}
				response.addHeader("custom_error", "user entered incorrect password");
				return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
				
			}
			
			response.addHeader("custom_error", "User with such email was not found.");
			return new ResponseEntity<User>(new User(), HttpStatus.NOT_FOUND);

		}

	@PostMapping(produces = "application/json")
	@RequestMapping("/fetchCurrentUser")
	public ResponseEntity<User> fetchCurrentUser(@CookieValue(value = "auth_token", defaultValue = "wtfdude") String jwt, HttpServletResponse response) {
		
		System.out.println("JWT*******: " + jwt);
		if(jwt != null) {
			
			if(sessServ.isRight(jwt)) {
				System.out.println("Auth lol");
				// if user has cookie and they are authenticated
				// then all good.
				
//				loginCreds.email
				Optional<User> authedUser = sessServ.findUser("Chris@gmail.com");
				
				response.addHeader("custom_success", "user is authenticated");
				return new ResponseEntity<User>(authedUser.get(), HttpStatus.OK);

			} else {
				System.out.println("Wtf lol");
				response.addHeader("custom_error", "authentication failed");
				return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
				}
		} else {
			return null;
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
