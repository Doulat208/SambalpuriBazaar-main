package com.sambalpuribazaar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "products_resources")
@AllArgsConstructor
@NoArgsConstructor
public class Resources {
    
    @Id
    private String id;
    private String name;
    private String url;
    private boolean isPrimary;
    private String type;
    @DBRef
    private Product product;
}
