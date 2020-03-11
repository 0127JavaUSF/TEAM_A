package com.revature.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.model.User;
import com.revature.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public User createUser(User user)
	{
		return this.userRepo.save(user);
	}
	
	public Optional<User> getUser(Long id)
	{
		return this.userRepo.findById(id);
	}

}
