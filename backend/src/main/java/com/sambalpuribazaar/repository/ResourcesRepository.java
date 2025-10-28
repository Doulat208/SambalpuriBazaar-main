package com.sambalpuribazaar.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sambalpuribazaar.entity.Resources;

@Repository
public interface ResourcesRepository extends MongoRepository<Resources, String> {
    List<Resources> findByProduct_Id(String productId);
    Resources findFirstByProduct_IdAndIsPrimaryTrue(String productId);
}
