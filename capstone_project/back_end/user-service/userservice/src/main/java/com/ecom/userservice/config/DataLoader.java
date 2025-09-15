package com.ecom.userservice.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.ecom.userservice.entity.User;
import com.ecom.userservice.repo.UserRepository;
import com.ecom.userservice.util.AppConstants;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataLoader implements CommandLineRunner {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public DataLoader(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!repo.existsByUsername("admin")) {
            String salted = "admin123" + AppConstants.PASSWORD_SALT;
            String encoded = encoder.encode(salted);

            // Create roles
            Set<String> roles = new HashSet<>();
            roles.add(AppConstants.ROLE_ADMIN);
            roles.add(AppConstants.ROLE_USER);

            // Create User manually (constructor or setters)
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(encoded);
            admin.setEmail("admin@ecom.com");
            admin.setName("Administrator");
            admin.setRoles(roles);

            repo.save(admin);
            System.out.println("✅ Admin user created: admin / admin123");
        }
    }

}
