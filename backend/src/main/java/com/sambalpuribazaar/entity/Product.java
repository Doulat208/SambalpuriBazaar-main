package com.sambalpuribazaar.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "products")
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private String id;

    @NonNull
    private String name;

    @NonNull
    private Number price;

    // @NonNull
    // private String img_url;

    @NonNull
    private String description;

    @DBRef
    private List<ProductVarient> productVarient;

    @DBRef
    @NonNull
    private Category category;
    
    @DBRef
    @NonNull
    private CategoryType categoryType;

    @DBRef
    private List<Resources> resources;
    
    // @NonNull
    private boolean isNewarrival = false;
    
    private LocalDateTime createdAt;
    
}
