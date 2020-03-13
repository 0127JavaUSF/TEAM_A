package com.revature.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.model.Order;
import com.revature.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	Optional<Order> findByUser(User user);

	List<Order> findAllByUser(User user);	
	

}
