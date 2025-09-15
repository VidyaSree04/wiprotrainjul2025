package com.ecom.userservice.controller;


import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ecom.userservice.dto.AuthRequest;
import com.ecom.userservice.dto.RegisterRequest;
import com.ecom.userservice.entity.User;
import com.ecom.userservice.repo.UserRepository;
import com.ecom.userservice.security.JwtUtil;
import com.ecom.userservice.util.AppConstants;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class AuthController {
	private final UserRepository userRepo;
	  private final BCryptPasswordEncoder passwordEncoder;
	  private final JwtUtil jwtUtil;

	  public AuthController(UserRepository userRepo, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
	    this.userRepo = userRepo; this.passwordEncoder = passwordEncoder; this.jwtUtil = jwtUtil;
	  }

	  @PostMapping("/register")
	  public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
	    if (userRepo.existsByUsername(req.getUsername()))
	      return ResponseEntity.status(400).body(Map.of("message", AppConstants.USER_ALREADY_EXISTS));
	    String salted = req.getPassword() + AppConstants.PASSWORD_SALT;
	    String encoded = passwordEncoder.encode(salted);
	    User u = new User(
                req.getUsername(),
                encoded,
                req.getEmail(),
                req.getName(),
                Set.of(AppConstants.ROLE_USER)
        );
	    userRepo.save(u);
	    return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","User created"));
	  }

	  @PostMapping("/login")
	  public ResponseEntity<?> login(@RequestBody AuthRequest req) {
	    var userOpt = userRepo.findByUsername(req.getUsername());
	    if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Invalid credentials"));
	    User user = userOpt.get();
	    String salted = req.getPassword() + AppConstants.PASSWORD_SALT;
	    if (!passwordEncoder.matches(salted, user.getPassword()))
	      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Invalid credentials"));
	    String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRoles());
	    return ResponseEntity.ok(Map.of("token", token, "userId", user.getId(), "roles", user.getRoles()));
	  }

	  @GetMapping("/all")
	  public ResponseEntity<?> allUsers() { return ResponseEntity.ok(userRepo.findAll()); }
}
