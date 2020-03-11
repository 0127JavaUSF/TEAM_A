package com.revature.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
