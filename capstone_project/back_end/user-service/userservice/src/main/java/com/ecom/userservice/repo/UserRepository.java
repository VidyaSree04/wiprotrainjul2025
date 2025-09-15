package com.ecom.userservice.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.userservice.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	  Optional<User> findByUsername(String username);
	  boolean existsByUsername(String username);
	  boolean existsByEmail(String email);

}
