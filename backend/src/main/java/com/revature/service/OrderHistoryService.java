package com.revature.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.model.OrderHistory;
import com.revature.repository.OrderHistoryRepository;

@Service
public class OrderHistoryService {
	
	@Autowired
	private OrderHistoryRepository oHistRepo;
	
	public OrderHistory createOrder(OrderHistory order)
	{
		return this.oHistRepo.save(order);
	}
	
//	public Optional<OrderHistory> getOrderHistory(long userId)
//	{
//		return this.oHistRepo.findOrders(userId);
//	}

}
