package com.sambalpuribazaar.dto;

import java.util.List;

import com.sambalpuribazaar.entity.Category;
import com.sambalpuribazaar.entity.CategoryType;
import com.sambalpuribazaar.entity.Resources;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private String id;
    private String name;
    private Number price;
    private String description;
    private boolean isNewarrival;
    private Category category;
    private CategoryType categoryType;
    private List<ProductVarientDTO> productVarient;
    private List<Resources> productResources;
    
}
