package com.revature.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.model.Item;
import com.revature.model.Order;
import com.revature.model.User;
import com.revature.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService oServ;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<Order> createOrder(@RequestBody @Valid Order order, User user, Item item) {
		System.out.println(order.toString());
		Order createdOrder = oServ.createOrder(order, item, user);
		return new ResponseEntity<Order>(createdOrder ,HttpStatus.OK);
	}
	
//	@PostMapping(consumes = "application/json", produces = "application/json")
//	public ResponseEntity<OrderHistory> addOrder(@RequestBody @Valid OrderHistory history, Order order) {
//		OrderHistory itemHistory = oHistServ.createOrderItems(history, order);
//		return new ResponseEntity<OrderHistory>(itemHistory, HttpStatus.OK);
//	}

//	@GetMapping("/{id}")
//	public ResponseEntity<OrderHistory> getOrderHistory(@PathVariable(value="id") User user)
//	{
//		Optional<OrderHistory> history = oHistServ.getOrderHistory(user);
//		OrderHistory foundHistory = history.get();
//		return new ResponseEntity<OrderHistory>(foundHistory, HttpStatus.OK);
//	}
}
