package com.sambalpuribazaar.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sambalpuribazaar.entity.Product;
import com.sambalpuribazaar.entity.Resources;
import com.sambalpuribazaar.repository.ProductRepository;
import com.sambalpuribazaar.repository.ResourcesRepository;

@Service
public class ResourcesService {

    @Autowired
    private ResourcesRepository resourcesRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Resources> getByProduct(String productId){
        return resourcesRepository.findByProduct_Id(productId);
    }

    public Resources getPrimaryByProduct(String productId){
        return resourcesRepository.findFirstByProduct_IdAndIsPrimaryTrue(productId);
    }

    public Resources addToProduct(String productId, Resources resource){
        Product product = productRepository.findById(productId).orElse(null);
        if(product == null){
            return null;
        }
        // Ensure product reference is set
        resource.setProduct(product);

        // If this resource is marked primary, demote any existing primary
        if (resource.isPrimary()) {
            Resources currentPrimary = resourcesRepository.findFirstByProduct_IdAndIsPrimaryTrue(productId);
            if (currentPrimary != null) {
                currentPrimary.setPrimary(false);
                resourcesRepository.save(currentPrimary);
            }
        }

        Resources saved = resourcesRepository.save(resource);

        // Maintain reverse reference list on Product (optional but helpful)
        List<Resources> list = product.getResources();
        if (list == null) list = new ArrayList<>();
        list.add(saved);
        product.setResources(list);
        productRepository.save(product);

        return saved;
    }

    public Resources setPrimary(String productId, String resourceId){
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return null;

        Resources target = resourcesRepository.findById(resourceId).orElse(null);
        if (target == null) return null;
        if (target.getProduct() == null || !productId.equals(target.getProduct().getId())) return null;

        Resources currentPrimary = resourcesRepository.findFirstByProduct_IdAndIsPrimaryTrue(productId);
        if (currentPrimary != null && !currentPrimary.getId().equals(resourceId)) {
            currentPrimary.setPrimary(false);
            resourcesRepository.save(currentPrimary);
        }
        target.setPrimary(true);
        return resourcesRepository.save(target);
    }

    public boolean delete(String productId, String resourceId){
        Resources target = resourcesRepository.findById(resourceId).orElse(null);
        if (target == null) return false;
        if (target.getProduct() == null || !productId.equals(target.getProduct().getId())) return false;

        // Remove from product.resources list
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null && product.getResources() != null) {
            product.getResources().removeIf(r -> r.getId().equals(resourceId));
            productRepository.save(product);
        }
        resourcesRepository.deleteById(resourceId);
        return true;
    }
}
