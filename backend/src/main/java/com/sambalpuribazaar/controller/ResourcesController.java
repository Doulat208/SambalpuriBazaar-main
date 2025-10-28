package com.sambalpuribazaar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sambalpuribazaar.entity.Resources;
import com.sambalpuribazaar.service.ResourcesService;

@RestController
@RequestMapping("/api/product/{productId}/resources")
public class ResourcesController {

    @Autowired
    private ResourcesService resourcesService;

    @GetMapping
    public ResponseEntity<List<Resources>> list(@PathVariable String productId){
        return new ResponseEntity<>(resourcesService.getByProduct(productId), HttpStatus.OK);
    }

    @GetMapping("/primary")
    public ResponseEntity<Resources> getPrimary(@PathVariable String productId){
        Resources primary = resourcesService.getPrimaryByProduct(productId);
        if (primary == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(primary, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Resources> create(@PathVariable String productId, @RequestBody Resources resource){
        Resources saved = resourcesService.addToProduct(productId, resource);
        if (saved == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PostMapping("/{resourceId}/primary")
    public ResponseEntity<Resources> makePrimary(@PathVariable String productId, @PathVariable String resourceId){
        Resources updated = resourcesService.setPrimary(productId, resourceId);
        if (updated == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{resourceId}")
    public ResponseEntity<Void> delete(@PathVariable String productId, @PathVariable String resourceId){
        boolean ok = resourcesService.delete(productId, resourceId);
        return ok ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
