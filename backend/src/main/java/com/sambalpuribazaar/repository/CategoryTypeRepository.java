package com.sambalpuribazaar.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sambalpuribazaar.entity.CategoryType;

@Repository
public interface CategoryTypeRepository extends MongoRepository<CategoryType, String>{
    
}
