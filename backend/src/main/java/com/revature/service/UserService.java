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
	
	public Optional<User> getUser(String email)
	{
		return this.userRepo.findByEmail(email);
	}
	
	public Optional<User> getOrderHistory(User user)
	{
		String email = user.getEmail();
		return this.userRepo.findByEmail(email);
	}
//	
//	public User createOrder(User user, OrderHistory orderHist)
//	{
//		return this.userRepo.
//	}

}
