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

	/**
	 * 
	 * Accepts object that contains email and password. Logs in user if such user exists
	 * 
	 * @param loginCreds
	 * @param request
	 * @param response
	 * @return
	 * @throws NotFoundException
	 */
	@RequestMapping("/login")
	public ResponseEntity<User> createSession(
			@RequestBody LoginCredentials loginCreds,
			HttpServletRequest request, 
			HttpServletResponse response)
				throws NotFoundException {
		
		//TODO
		System.out.println("email: " + loginCreds.email + "password: " + loginCreds.password);
		
		Optional<User> user = userServ.getUserByEmail(loginCreds.email);

		System.out.println(user.isPresent());
		System.out.println(user.toString());
		if(user.isPresent()) {
					
			User userObj = user.get();
			String hashedPwd = userObj.getPassword();
				
			// if password matches, then return JWT token through cookie
			if(sessServ.isPassword(loginCreds.password, hashedPwd)) {
					
				// secret ingredient
				Algorithm algo = Algorithm.HMAC256(userObj.getFirstName());
					
					/**
					 * Need to be returned as part of response header in the cookie
					 */
					String token = JWT.create()
							.withClaim("email", userObj.getEmail())
							.withClaim("password", userObj.getPassword())
							.withIssuer("auth0")
							.sign(algo);
	
					Cookie cookie = new Cookie("auth_token", token);
					//	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
					cookie.setMaxAge(10*60*200);
					cookie.setPath("/user");
					response.addCookie(cookie);
					// Cookie cook = new Cookie("hey", "lol");
					//	response.addCookie(cook);
					response.addHeader("custom_success", "user is authenticated. Cookie is returned.");
					System.out.println("Success. Authenticated. Cookie Returned.");
					return new ResponseEntity<User>(userObj, HttpStatus.OK);

				}
				response.addHeader("custom_error", "user entered incorrect password");
				System.out.println("User Incorrect Password");
				return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
				
			}
			
			response.addHeader("custom_error", "User with such email was not found.");
			System.out.println("Such Email Not Found");
			return new ResponseEntity<User>(new User(), HttpStatus.NOT_FOUND);
		}

	@PostMapping(produces = "application/json")
	@RequestMapping("/fetchCurrentUser")
	public ResponseEntity<User> fetchCurrentUser(
			@CookieValue(name = "auth_token", defaultValue = "") String authToken, 
			HttpServletResponse response,
			HttpServletRequest request
			) {

//		System.out.println("token: " + authToken);
//		System.out.println(request.getCookies());

		// if proper token is received
		if(authToken.length() > 0) {
			// it extracts email and password and check if such things exist in DB
			if(sessServ.isRight(authToken)) {
				
				String email = sessServ.extractEmail(authToken);
				
				Optional<User> user = userServ.getUserByEmail(email);

				response.addHeader("custom_success", "user is authenticated");
				
				System.out.println("User Is Authenticated");
				return new ResponseEntity<User>(user.get(), HttpStatus.OK);

			} else {
				
				System.out.println("Unauthorized");
				response.addHeader("custom_error", "authentication failed");
				return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
			}
			
		} else {
			
			System.out.println("Not Found");
			response.addHeader("custom_error", "user not found");
			return new ResponseEntity<User>(new User(), HttpStatus.NOT_FOUND);
		
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
