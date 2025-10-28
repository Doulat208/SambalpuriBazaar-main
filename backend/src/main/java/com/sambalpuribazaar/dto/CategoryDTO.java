package com.sambalpuribazaar.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private String id;
    private String name;
    private String code;
    private String description;
    private List<CategoryTypeDTO> categoryTypeList;

}
