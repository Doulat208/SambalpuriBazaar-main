package com.sambalpuribazaar.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundEx extends RuntimeException{

    public ResourceNotFoundEx(String e){
        super(e);
    }

    public ResourceNotFoundEx(String e, Throwable cause){
        super(e, cause);
    }
    
}
