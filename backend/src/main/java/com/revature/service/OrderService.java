package com.revature.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.model.Item;
import com.revature.model.Order;
import com.revature.model.User;
import com.revature.repository.OrderRepository;

@Service
@Transactional
public class OrderService {
	
	@Autowired
	private OrderRepository oRepo;
	
	public Order createOrder(Order order, Item item, User user)
	{
		return this.oRepo.save(order);
	}

	
	public Optional<Order> getOrder(long userId)
	{
		return this.oRepo.findById(userId);
	}
	
	public List<Order> getOrder(User user)
	{
		return this.oRepo.findAllByUser(user);
	}

	public List<Order> getOrders() {
		return this.oRepo.findAll();
	}

}
