package com.revature.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "order_table")
public class Order {	
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		private long id;
		
		@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
		@JoinColumn(name = "items")
		private List<Item> orderItems;
		
		@Column(name = "rest_api_key")
		private String restApiKey;
		
		private String method;
		
		@Column(name = "timestamp")
		private LocalDate timestamp;
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "user_id")
		private User user;

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public List<Item> getOrderItems() {
			return orderItems;
		}

		public void setOrderItems(List<Item> orderItems) {
			this.orderItems = orderItems;
		}

		public String getRestApiKey() {
			return restApiKey;
		}

		public void setRestApiKey(String restApiKey) {
			this.restApiKey = restApiKey;
		}

		public String getMethod() {
			return method;
		}

		public void setMethod(String method) {
			this.method = method;
		}

		public LocalDate getTimestamp() {
			return timestamp;
		}

		public void setTimestamp(LocalDate timestamp) {
			this.timestamp = timestamp;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + (int) (id ^ (id >>> 32));
			result = prime * result + ((method == null) ? 0 : method.hashCode());
			result = prime * result + ((orderItems == null) ? 0 : orderItems.hashCode());
			result = prime * result + ((restApiKey == null) ? 0 : restApiKey.hashCode());
			result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
			result = prime * result + ((user == null) ? 0 : user.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Order other = (Order) obj;
			if (id != other.id)
				return false;
			if (method == null) {
				if (other.method != null)
					return false;
			} else if (!method.equals(other.method))
				return false;
			if (orderItems == null) {
				if (other.orderItems != null)
					return false;
			} else if (!orderItems.equals(other.orderItems))
				return false;
			if (restApiKey == null) {
				if (other.restApiKey != null)
					return false;
			} else if (!restApiKey.equals(other.restApiKey))
				return false;
			if (timestamp == null) {
				if (other.timestamp != null)
					return false;
			} else if (!timestamp.equals(other.timestamp))
				return false;
			if (user == null) {
				if (other.user != null)
					return false;
			} else if (!user.equals(other.user))
				return false;
			return true;
		}

		@Override
		public String toString() {
			return "Order [id=" + id + ", orderItems=" + orderItems + ", restApiKey=" + restApiKey + ", method="
					+ method + ", timestamp=" + timestamp + ", user=" + user + "]";
		}

		public Order(long id, List<Item> orderItems, String restApiKey, String method, LocalDate timestamp, User user) {
			super();
			this.id = id;
			this.orderItems = orderItems;
			this.restApiKey = restApiKey;
			this.method = method;
			this.timestamp = timestamp;
			this.user = user;
		}

		public Order() {
			super();
			// TODO Auto-generated constructor stub
		}
		
		
}
