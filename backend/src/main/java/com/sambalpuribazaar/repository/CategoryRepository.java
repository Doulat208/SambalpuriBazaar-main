package com.sambalpuribazaar.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sambalpuribazaar.entity.Category;

public interface CategoryRepository extends MongoRepository<Category, String>{
    
}
