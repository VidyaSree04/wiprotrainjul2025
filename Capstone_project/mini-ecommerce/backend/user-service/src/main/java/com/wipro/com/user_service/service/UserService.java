package com.wipro.com.user_service.service;

import com.wipro.com.user_service.entity.User;
import java.util.List;

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
