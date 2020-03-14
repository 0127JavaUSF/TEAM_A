package com.revature.service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	@Transactional
	public User setPassword(User clientUser) {
		//Create user object with Optional type b/c Optional can return the obj or a null
		//reference the userRepo with this to ensure it refs the variable in service and its inherited methods
		Optional <User> user = this.userRepo.findByEmail(clientUser.getEmail());
		
		//assign the hashed password to a variable hashedPass
		String hashedPass = BCrypt.hashpw(clientUser.getPassword(), BCrypt.gensalt());
		
		//set updated & hashed password into the user obj
		user.get().setPassword(hashedPass);
		
		//save the user object with the new password & assign user obj to resp variable
		User resp = this.userRepo.save(user.get());
		
		//return the updated user object
		return resp;	
		
	}

}
