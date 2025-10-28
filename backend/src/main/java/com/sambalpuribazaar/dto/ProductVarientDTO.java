package com.sambalpuribazaar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVarientDTO {
    
    private String id;
    private String color;
    private String size;
    private Integer stockQuantity;
    
}
