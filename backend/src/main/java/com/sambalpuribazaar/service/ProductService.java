package com.sambalpuribazaar.service;

import java.util.List;

import com.sambalpuribazaar.entity.Product;

public interface ProductService {
    
    public Product addProduct(Product product);

    public List<Product> getAllProduct();
    
    public Product getProductById(String id);

    public Product updateProduct(String id, Product product);

    public boolean deleteProduct(String id);

}
