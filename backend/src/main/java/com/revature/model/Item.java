package com.revature.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "item_table")
public class Item {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	
	private String name;
	
	@Column(name = "item_quantity")
	private int itemQuantity;
	
	@Column(name = "api_key")
	private int apiKey;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public int getApiKey() {
		return apiKey;
	}

	public void setApiKey(int apiKey) {
		this.apiKey = apiKey;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + apiKey;
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + itemQuantity;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		Item other = (Item) obj;
		if (apiKey != other.apiKey)
			return false;
		if (id != other.id)
			return false;
		if (itemQuantity != other.itemQuantity)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", itemQuantity=" + itemQuantity + ", apiKey=" + apiKey + "]";
	}

	public Item(long id, String name, int itemQuantity, int apiKey) {
		super();
		this.id = id;
		this.name = name;
		this.itemQuantity = itemQuantity;
		this.apiKey = apiKey;
	}

	public Item() {
		super();
		// TODO Auto-generated constructor stub
	}

	

}
