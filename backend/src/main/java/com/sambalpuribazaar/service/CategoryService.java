package com.sambalpuribazaar.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sambalpuribazaar.dto.CategoryDTO;
import com.sambalpuribazaar.dto.CategoryTypeDTO;
import com.sambalpuribazaar.entity.Category;
import com.sambalpuribazaar.entity.CategoryType;
import com.sambalpuribazaar.repository.CategoryRepository;
import com.sambalpuribazaar.repository.CategoryTypeRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryTypeRepository categoryTypeRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category createCategory(CategoryDTO categoryDto) {
        Category category = mapToEntity(categoryDto);
        return categoryRepository.save(category);
    }

    public Category updateCategory(String id, CategoryDTO categoryDto) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(categoryDto.getName() != null ? categoryDto.getName() : category.getName());
            category.setCode(categoryDto.getCode() != null ? categoryDto.getCode() : category.getCode());
            category.setDescription(categoryDto.getDescription() != null ? categoryDto.getDescription() : category.getDescription());
            return categoryRepository.save(category);
        }
        return null;
    }

    public boolean deleteCategory(String id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<CategoryType> getCategoryTypesByCategory(String categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        return category != null ? category.getCategorytype() : null;
    }

    public CategoryType addCategoryType(String categoryId, CategoryTypeDTO categoryTypeDto) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) return null;

        CategoryType categoryType = new CategoryType();
        categoryType.setName(categoryTypeDto.getName());
        categoryType.setCode(categoryTypeDto.getCode());
        categoryType.setDescription(categoryTypeDto.getDescription());
        categoryType.setCategory(category);

        categoryType = categoryTypeRepository.save(categoryType);

        category.getCategorytype().add(categoryType);
        categoryRepository.save(category);

        return categoryType;
    }

    public CategoryType updateCategoryType(String typeId, CategoryTypeDTO categoryTypeDto) {
        CategoryType categoryType = categoryTypeRepository.findById(typeId).orElse(null);
        if (categoryType != null) {
            categoryType.setName(categoryTypeDto.getName() != null ? categoryTypeDto.getName() : categoryType.getName());
            categoryType.setCode(categoryTypeDto.getCode() != null ? categoryTypeDto.getCode() : categoryType.getCode());
            categoryType.setDescription(categoryTypeDto.getDescription() != null ? categoryTypeDto.getDescription() : categoryType.getDescription());
            return categoryTypeRepository.save(categoryType);
        }
        return null;
    }

    public boolean deleteCategoryType(String typeId) {
        if (categoryTypeRepository.existsById(typeId)) {
            categoryTypeRepository.deleteById(typeId);
            return true;
        }
        return false;
    }

    private Category mapToEntity(CategoryDTO categoryDto) {
        Category category = new Category();
        category.setCode(categoryDto.getCode());
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        if (categoryDto.getCategoryTypeList() != null) {
            List<CategoryType> categoryTypes = categoryDto.getCategoryTypeList().stream()
                    .map(typeDto -> {
                        CategoryType type = new CategoryType();
                        type.setCode(typeDto.getCode());
                        type.setName(typeDto.getName());
                        type.setDescription(typeDto.getDescription());
                        type.setCategory(category);
                        return type;
                    }).collect(Collectors.toList());
            category.setCategorytype(categoryTypes);
        }
        return category;
    }
}
