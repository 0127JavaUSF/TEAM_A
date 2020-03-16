package com.revature.service;

import java.net.URL;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.revature.model.User;
import com.revature.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public User createUser(User user)
	{
		// user.setPassword = hashPassword(user.getPassword)...
		return this.userRepo.save(user);
	}
	
	public Optional<User> getUserByEmail(String email)
	{
		return this.userRepo.findByEmail(email);
	}
	
	/**
	 * #AAA
	 * @param id: User id
	 * @return User object
	 */
	public Optional<User> getUserById(long id) {
		return this.userRepo.findById(id);
	}
	
	/**
	 * 
	 * Hashes password
	 */
	public void hashPassword(String password) {
		// BCrypt lib import and work hard
	}
	
	public User setPassword(User clientUser) {
		//Create user object with Optional type b/c Optional can return the obj or a null
		//reference the userRepo with this to ensure it refs the variable in service and its inherited methods
		Optional <User> user = this.userRepo.findByEmail(clientUser.getEmail());
		
		//assign the hashed password to a variable hashedPass
		String hashedPass = BCrypt.hashpw(clientUser.getPassword(), BCrypt.gensalt());
		
		//set updated & hashed password into the user obj
		user.get().setPassword(hashedPass);
		
		//save the user object with the new password & assign user obj to resp variable
		User resp = this.userRepo.save(user.get());
		
		//return the updated user object
		return resp;	
		
	}
	
	@Transactional
	public User uploadPicture(User clientUser) {
		
		Optional <User> user = this.userRepo.findById(clientUser.getId());
		
		if(!clientUser.isHasProfilePic())
		{
			return user.get();
		}
		String bucketName = System.getenv("AWS_P2_BUCKET_NAME");
        // creates s3 object
        new BasicAWSCredentials(System.getenv("AWS_ACCESS_KEY_ID"),System.getenv("AWS_SECRET_ACCESS_KEY"));
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
                        
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 15000;
        expiration.setTime(expTimeMillis);
        
      //generates url for upload
		URL presignedURL = s3.generatePresignedUrl(bucketName, Long.toString(user.get().getId()), expiration, HttpMethod.PUT);
		
		//link to the image to store in database
        String url = "https://"+ bucketName + ".s3.amazonaws.com/" + Long.toString(user.get().getId()); //the AWS url includes the record id
        	
        user.get().setPresignedUrl(presignedURL.toString());
        user.get().setProfilePictureUrl(url);
        
		User presignedUrlUser = this.userRepo.save(user.get());
		
		
		return presignedUrlUser;
	}
	
	@Transactional
	public User updateUser(User clientUser) {
		Optional <User> user = this.userRepo.findById(clientUser.getId());
		
		String firstName = clientUser.getFirstName(); //2
		String lastName = clientUser.getLastName(); //2 
		String email = clientUser.getEmail(); 
		String phoneNumber = clientUser.getPhoneNumber(); // 12
		String address = clientUser.getAddress(); // 10
		String city = clientUser.getCity(); // 4
		String state = clientUser.getState(); // 2
		String zipCode = clientUser.getZipCode(); // 5
		
		if (user.get().getFirstName() != firstName && firstName.length() > 1)
		{
			user.get().setFirstName(firstName);
		}
		if (user.get().getLastName() != lastName && lastName.length() > 2)
		{
			user.get().setLastName(lastName);
		}
		if (user.get().getEmail() != email && email.contains("@"))
		{
			user.get().setEmail(email);
		}
		if (user.get().getPhoneNumber() != phoneNumber && phoneNumber.length() == 12)
		{
			user.get().setPhoneNumber(phoneNumber);
		}
		if (user.get().getAddress() != address && address.length() > 10)
		{
			user.get().setAddress(address);
		}
		if (user.get().getCity() != city && city.length() > 4)
		{
			user.get().setCity(city);
		}
		if (user.get().getState() != state && state.length() == 2)
		{
			user.get().setState(state);
		}
		if (user.get().getZipCode() != zipCode && zipCode.length() == 5)
		{
			user.get().setZipCode(zipCode);
		}
		
		
		User resp = this.userRepo.save(user.get());
		
		return resp;
	}
	
	public boolean checkValues(User clientUser)
	{
		String firstName = clientUser.getFirstName();
		String lastName = clientUser.getLastName();
		String email = clientUser.getEmail();
		String address = clientUser.getAddress();
		String city = clientUser.getCity();
		String phoneNumber = clientUser.getPhoneNumber();
		String zipCode = clientUser.getZipCode();
		
		System.out.println(firstName.length());
		System.out.println(lastName.length());
		System.out.println(email.length());
		System.out.println(address.length());
		System.out.println(city.length());
		System.out.println(phoneNumber.length());
		System.out.println(zipCode.length());
		
		if(firstName.length() <= 0 || lastName.length() <= 0 || email.length() <= 0 
				|| address.length() <= 0 || city.length() <= 0 || phoneNumber.length() <= 0 || zipCode.length() <= 0)
		{
			return false;
		}else return true;
	}

	public boolean checkUrl(User clientUser) {
		
		boolean hasUrl = clientUser.isHasProfilePic();
		if(hasUrl) {
			return true;
		} else return false;
	}

}
