package com.wipro.com.user_service.controller;

import com.wipro.com.user_service.entity.User;
import com.wipro.com.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);
        if (existingUser == null) return ResponseEntity.notFound().build();

//        user.setId(id);
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmailId(user.getEmailId());
        existingUser.setPassword(user.getPassword());
        existingUser.setAddress(user.getAddress());
        existingUser.setUserType(user.getUserType());
        existingUser.setLoggedIn(user.isLoggedIn());
        
        User updatedUser = userService.updateUser(existingUser);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        User existingUser = userService.getUserById(id);
        if (existingUser == null) return ResponseEntity.notFound().build();

        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<String> getMenu(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();

        String menu = (user.getUserType() == 0) ? "Admin Menu" : "Customer Menu";
        return ResponseEntity.ok(menu);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String userId, @RequestParam String password) {
        String message = userService.login(userId, password);
        if (message.equals("Login successful!")) return ResponseEntity.ok(message);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
    }

    @PostMapping("/logout/{id}")
    public ResponseEntity<String> logout(@PathVariable int id) {
        String message = userService.logout(id);
        if (message.equals("Logout successful!")) return ResponseEntity.ok(message);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }
}
