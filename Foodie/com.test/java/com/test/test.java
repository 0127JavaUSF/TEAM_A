package com.test;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

public class test {
	public static void main(String[] args) {
		Algorithm algo = Algorithm.HMAC256("anvar");
		String token = JWT.create()
				.withClaim("email", "abc")
				.withClaim("password", "0000")
				.withIssuer("auth0")
				.sign(algo);
		System.out.println(token);
	    DecodedJWT jwt = JWT.decode(token);
	    
//	    System.out.println(jwt.getAlgorithm());
//	    System.out.println(jwt.getPayload());
	    
	    System.out.println(jwt.getClaim("email").asString());
	    System.out.println(jwt.getClaim("password").asString());
//	    System.out.println(jwt.getIssuedAt());
	    
	    Algorithm algorithm = Algorithm.HMAC256("anvar");
	    JWTVerifier verifier = JWT.require(algorithm)
	    		.withClaim("email", "abc")
	    		.withClaim("password", "0000")
		        .withIssuer("auth0")
		        .build(); //Reusable verifier instance
	    DecodedJWT jwt2 = verifier.verify(token);
	    	System.out.println(jwt2.getClaim("email").asString());
	}
}
