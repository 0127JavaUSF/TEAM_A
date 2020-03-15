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
		if(cookies != null) {
			for(Cookie cookie : cookies) {
				if(cookie.getName().equals("auth_token")) {
					return cookie.getValue();
				}
			}
		}
		return null;
		
	}
	
	public boolean isAuthenticated(String email, String token) {

		JWT jwt = new JWT();
		
		Optional<User> user = userServ.getUserByEmail(email);
		
		if(user.get() != null) {
			
			DecodedJWT myJwt = jwt.decodeJwt(token);
			String decodedEmail = myJwt.getClaim("email").asString();
			String decodedPassword = myJwt.getClaim("password").asString();
			// System.out.println(decodedEmail + "  " + decodedPassword);
			// System.out.println(user.get().getEmail() + "   " + user.get().getPassword());

			if(user.get().getEmail().equals(decodedEmail) && 
					decodedPassword.equals(user.get().getPassword())) {
				
				return true;
			
			}
						
		}
				
		return false;
		
	}
	
//	public Optional<User> findUserByEmail(String email) {
//		return this.userServ.getUserByEmail(email);
//	}

	public boolean isRight(String token) {

		JWT jwt = new JWT();
		System.out.println("sup");
		System.out.println(token);
		DecodedJWT myJwt = jwt.decodeJwt(token);
	
		String decodedEmail = myJwt.getClaim("email").asString();
		String decodedPassword = myJwt.getClaim("password").asString();
	
		Optional<User> user = userServ.getUserByEmail(decodedEmail);
		
		if(user.get() != null) {
			
			if(user.get().getEmail().equals(decodedEmail) && 
					decodedPassword.equals(user.get().getPassword())) {
				
				return true;
			
			}
						
		}
		return false;
	}

	public String extractEmail(String authToken) {
		
		JWT jwt = new JWT();
		DecodedJWT myJwt = jwt.decodeJwt(authToken);
	
		String decodedEmail = myJwt.getClaim("email").asString();
		
		return decodedEmail;

	}
	
}
