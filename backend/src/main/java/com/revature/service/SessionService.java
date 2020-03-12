package com.revature.service;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.revature.model.User;

@Service
public class SessionService {
	
	@Autowired
	private UserService userServ;
	
	public boolean isPassword(String password, String hashedPassword) {
		
		return BCrypt.checkpw(password, hashedPassword);
		
	}
	
	public String extractAuthToken(HttpServletRequest request) {
		
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies) {
			if(cookie.getName().equals("auth_token")) {
				return cookie.getValue();
			}
		}
		
		return null;
		
	}
	
	public boolean isAuthenticated(String email, String token) {

		JWT jwt = new JWT();
		Optional<User> user = userServ.getUserByEmail(email);
		
		if(user.isPresent()) {
			
			System.out.println("User exists");
			
			DecodedJWT myJwt = jwt.decodeJwt(token);
			String decodedEmail = myJwt.getClaim("email").asString();
			String decodedPassword = myJwt.getClaim("password").asString();

			if(user.get().getEmail().equals(decodedEmail) 
					&& user.get().getPassword().equals(decodedPassword)) {
				return true;
			}
			
			System.out.println("Unable to authenticate");
			
		}
		
		return false;
		
	}
	
}
