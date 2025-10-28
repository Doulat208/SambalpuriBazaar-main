package com.sambalpuribazaar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sambalpuribazaar.dto.ProductDTO;
import com.sambalpuribazaar.entity.Product;
import com.sambalpuribazaar.repository.ProductRepository;

@Service
public class ProductserviceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;
    

    @Override
    public Product addProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        return productRepository.save( product);
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product updateProduct(String id, Product update) {
        Product existing = productRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setName(update.getName() != null ? update.getName() : existing.getName());
        existing.setPrice(update.getPrice() != null ? update.getPrice() : existing.getPrice());
        existing.setDescription(update.getDescription() != null ? update.getDescription() : existing.getDescription());
        existing.setCategory(update.getCategory() != null ? update.getCategory() : existing.getCategory());
        existing.setCategoryType(update.getCategoryType() != null ? update.getCategoryType() : existing.getCategoryType());
        existing.setResources(update.getResources() != null ? update.getResources() : existing.getResources());
        existing.setProductVarient(update.getProductVarient() != null ? update.getProductVarient() : existing.getProductVarient());
        existing.setNewarrival(update.isNewarrival());
        return productRepository.save(existing);
    }

    @Override
    public boolean deleteProduct(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private Product createProduct(ProductDTO productDto){
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setNewarrival(productDto.isNewarrival());

        return null;
    }
}
