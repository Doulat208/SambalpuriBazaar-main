package com.sambalpuribazaar.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "category")
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    
    @Id
    private String id;

    // @NonNull
    private String name;
    
    // @NonNull
    private String code;

    private String description;

    @DBRef
    @JsonIgnore
    private List<CategoryType> categorytype;

}
