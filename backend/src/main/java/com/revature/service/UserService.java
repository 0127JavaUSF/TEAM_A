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

}
