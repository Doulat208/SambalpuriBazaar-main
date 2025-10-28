package com.sambalpuribazaar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sambalpuribazaar.dto.CategoryDTO;
import com.sambalpuribazaar.dto.CategoryTypeDTO;
import com.sambalpuribazaar.entity.Category;
import com.sambalpuribazaar.entity.CategoryType;
import com.sambalpuribazaar.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // -------------------- CATEGORY --------------------
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        Category category = categoryService.getCategoryById(id);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDto) {
        return new ResponseEntity<>(categoryService.createCategory(categoryDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody CategoryDTO categoryDto) {
        Category updated = categoryService.updateCategory(id, categoryDto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        return categoryService.deleteCategory(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // -------------------- CATEGORY TYPE --------------------
    @GetMapping("/{id}/types")
    public ResponseEntity<List<CategoryType>> getCategoryTypes(@PathVariable String id) {
        List<CategoryType> types = categoryService.getCategoryTypesByCategory(id);
        return types != null ? ResponseEntity.ok(types) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/types")
    public ResponseEntity<CategoryType> addCategoryType(@PathVariable String id, @RequestBody CategoryTypeDTO dto) {
        CategoryType type = categoryService.addCategoryType(id, dto);
        return type != null ? new ResponseEntity<>(type, HttpStatus.CREATED) : ResponseEntity.notFound().build();
    }

    @PutMapping("/types/{typeId}")
    public ResponseEntity<CategoryType> updateCategoryType(@PathVariable String typeId, @RequestBody CategoryTypeDTO dto) {
        CategoryType updated = categoryService.updateCategoryType(typeId, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/types/{typeId}")
    public ResponseEntity<Void> deleteCategoryType(@PathVariable String typeId) {
        return categoryService.deleteCategoryType(typeId) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
