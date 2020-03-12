package com.revature.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.model.Item;
import com.revature.model.Order;
import com.revature.model.User;
import com.revature.repository.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository oRepo;
	
	public Order createOrder(Order order, Item item, User user)
	{
		return this.oRepo.save(order);
	}

//	public OrderHistory createOrderItems(@Valid OrderHistory history, Order order) {
//		return this.oHistRepo.save(history);
//	}
	
//	public Optional<OrderHistory> getOrderHistory(long userId)
//	{
//		return this.oHistRepo.findOrders(userId);
//	}

}
