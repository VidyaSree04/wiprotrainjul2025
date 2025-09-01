package com.wipro.ecom.user_service.service;

import java.util.List;

import com.wipro.ecom.user_service.entity.User;

public interface UserService {
    User createUser(User user);
    User updateUser(User user);
    void deleteUser(int id);
    List<User> getAllUsers();
    User getUserById(int id);
    String login(String userId, String password);
    String logout(int id);
    String getMenu(int id);
}
