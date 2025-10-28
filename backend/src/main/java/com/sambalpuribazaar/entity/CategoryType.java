package com.sambalpuribazaar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "category_type")
@AllArgsConstructor
@NoArgsConstructor
public class CategoryType {
    
    @Id
    private String id;

    @NonNull
    private String name;
    
    @NonNull
    private String code;

    private String description;

    @DBRef
    private Category category;
    
    
}
