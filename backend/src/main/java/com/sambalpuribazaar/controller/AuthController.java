package com.sambalpuribazaar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sambalpuribazaar.entity.User;
import com.sambalpuribazaar.repository.UserRepository;
import com.sambalpuribazaar.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user){
        if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
            return new ResponseEntity<>("name, email and password are required", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("Email already registered", HttpStatus.CONFLICT);
        }
        userService.createUser(user);
        // do not return password back
        user.setPassword(null);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
