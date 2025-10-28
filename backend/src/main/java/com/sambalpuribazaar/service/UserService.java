package com.sambalpuribazaar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.sambalpuribazaar.entity.User;
import com.sambalpuribazaar.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createUser(User user){
        // prevent duplicate email
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return;
        }
        // default role
        if (user.getRole() == null) {
            user.setRole(User.Role.USER);
        }
        // hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    public User getUserById(String id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            return user;
        }
        return null;
    }


}
