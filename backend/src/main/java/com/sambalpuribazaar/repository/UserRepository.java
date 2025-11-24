package com.sambalpuribazaar.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.sambalpuribazaar.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
