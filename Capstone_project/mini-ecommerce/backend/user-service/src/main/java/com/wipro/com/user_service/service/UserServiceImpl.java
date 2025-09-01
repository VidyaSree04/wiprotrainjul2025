package com.wipro.com.user_service.service;

import com.wipro.com.user_service.entity.User;
import com.wipro.com.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        user.setLoggedIn(false); // default
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public String login(String userId, String password) {
        User user = userRepository.findByUserId(userId);
        if (user != null && user.getPassword().equals(password)) {
            user.setLoggedIn(true);
            userRepository.save(user);
            return "Login successful!";
        }
        return "Invalid credentials!";
    }

    @Override
    public String logout(int id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setLoggedIn(false);
            userRepository.save(user);
            return "Logout successful!";
        }
        return "User not found!";
    }

    @Override
    public String getMenu(int id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return "User not found!";
        return (user.getUserType() == 0) ? "Admin Menu" : "Customer Menu";
    }
}
