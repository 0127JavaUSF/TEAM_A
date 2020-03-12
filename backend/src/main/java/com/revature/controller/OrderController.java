package com.revature.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrder(@PathVariable(value="id") Long id)
	{
		Optional<Order> history = oServ.getOrder(id);
		Order foundHistory = history.get();
		return new ResponseEntity<Order>(foundHistory, HttpStatus.OK);
	}
	
	@GetMapping()
	public List<Order> getOrder()
	{
		List<Order> orders = oServ.getOrders();
		return orders;
	}
	
	@GetMapping("/user")
	public ResponseEntity<Order> getUserOrders(@RequestBody User user)
	{
		Optional<Order> userOrder = oServ.getOrder(user);
		Order userOrders = userOrder.get();
		return new ResponseEntity<Order>(userOrders, HttpStatus.OK);
	}
}
