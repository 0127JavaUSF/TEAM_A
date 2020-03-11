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

import com.revature.model.OrderHistory;
import com.revature.model.User;
import com.revature.service.OrderHistoryService;

@RestController
@RequestMapping("/order")
public class OrderHistoryController {
	
	@Autowired
	private OrderHistoryService oHistServ;
	
	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<OrderHistory> createOrderHistory(@RequestBody @Valid OrderHistory order) {
		OrderHistory createdHistory = oHistServ.createOrder(order);
		return new ResponseEntity<OrderHistory>(createdHistory ,HttpStatus.OK);
	}

//	@GetMapping("/{id}")
//	public ResponseEntity<OrderHistory> getOrderHistory(@PathVariable(value="id") User user)
//	{
//		Optional<OrderHistory> history = oHistServ.getOrderHistory(user);
//		OrderHistory foundHistory = history.get();
//		return new ResponseEntity<OrderHistory>(foundHistory, HttpStatus.OK);
//	}
}
