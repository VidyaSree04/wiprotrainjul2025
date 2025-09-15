package com.ecom.userservice.service;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.userservice.dto.RegisterRequest;
import com.ecom.userservice.entity.User;
import com.ecom.userservice.repo.UserRepository;
import com.ecom.userservice.util.AppConstants;

import java.util.Set;

@Service
public class UserService {
	 private final UserRepository repo;
	    private final BCryptPasswordEncoder encoder;

	    public UserService(UserRepository repo, BCryptPasswordEncoder encoder) {
	        this.repo = repo;
	        this.encoder = encoder;
	    }

	    public User register(RegisterRequest req) {
	        if (repo.existsByUsername(req.getUsername())) {
	            throw new RuntimeException(AppConstants.USER_ALREADY_EXISTS);
	        }

	        // salt + encode password
	        String salted = req.getPassword() + AppConstants.PASSWORD_SALT;
	        String encoded = encoder.encode(salted);

	        // explicit type (avoid var to remove inference ambiguity)
	        User u = new User(
	                req.getUsername(),
	                encoded,
	                req.getEmail(),
	                req.getName(),
	                Set.of(AppConstants.ROLE_USER)
	        );
	               

	        return repo.save(u);
	    }
}
