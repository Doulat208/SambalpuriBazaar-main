package com.sambalpuribazaar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "product_variant")
@AllArgsConstructor
@NoArgsConstructor
public class ProductVarient {

    @Id
    private String id;
    private String color;
    private String size;
    private Integer stockQuantity;

    @DBRef
    @JsonIgnore
    private Product product;
    
}
