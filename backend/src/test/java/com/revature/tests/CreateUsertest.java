package com.revature.tests;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.revature.model.User;
import com.revature.service.UserService;

public class CreateUsertest {
	
	UserService userServ;
	User fullUser;
	User emptyUser;
	User urlUser;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
		userServ = new UserService();
		emptyUser = new User(0, "","","","","","","","", "", null, false, null, null);
		urlUser = new User(true);
		fullUser = new User("firstName", "lastName", "email", "phoneNumber", "address", "city", "zipCode");
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void test() {
		System.out.println(emptyUser.toString());
		assertFalse("This should return false for users that have empty fields", userServ.checkValues(emptyUser));
		assertTrue("This should return true if all data atleast contains 1 character", userServ.checkValues(fullUser));
		assertTrue("This should return true if the url is passed in saying that the user wants to upload a pic", userServ.checkUrl(urlUser));
		assertFalse("This should return false if the user does not want to upload a pic", userServ.checkUrl(emptyUser));
	}

}
