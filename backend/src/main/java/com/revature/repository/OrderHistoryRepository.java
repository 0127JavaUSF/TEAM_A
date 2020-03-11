package com.revature.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.model.OrderHistory;
import com.revature.model.User;


public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long>{	
	
//	OrderHistory saveOrder(OrderHistory orderHist, long user_id);
//
//	Optional<OrderHistory> getById(User user);
//
////	OrderHistory save(OrderHistory orderHist, User user);
//
//
//	Optional<OrderHistory> findOrders(long userId);

	
	


}
