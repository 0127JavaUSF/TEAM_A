package com.revature.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.revature.model.User;
import com.revature.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public User createUser(User user)
	{
		// user.setPassword = hashPassword(user.getPassword)...
		return this.userRepo.save(user);
	}
	
	public Optional<User> getUserByEmail(String email)
	{
		return this.userRepo.findByEmail(email);
	}
	
	/**
	 * #AAA
	 * @param id: User id
	 * @return User object
	 */
	public Optional<User> getUserById(long id) {
		return this.userRepo.findById(id);
	}
	
	/**
	 * 
	 * Hashes password
	 */
	public void hashPassword(String password) {
		// BCrypt lib import and work hard
	}

}
