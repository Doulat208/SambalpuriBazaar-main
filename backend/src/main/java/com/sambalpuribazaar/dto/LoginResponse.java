package com.sambalpuribazaar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public
class LoginResponse {
    public String id;
    public String name;
    public String email;
    public String role;
}

