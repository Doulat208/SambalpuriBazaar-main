package com.sambalpuribazaar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;

    @Field("name")
    private String name;

    @Indexed(unique = true)
    @Field("email")
    private String email;

    @Field("password")
    private String password;

    @Field("address")
    private String address;

    @Field("phone")
    private String phone;

    // Store Enum directly - MongoDB supports it
    private Role role = Role.USER;  // Default role

    // Helper methods
    @JsonIgnore
    public boolean isAdmin() {
        return this.role == Role.ADMIN;
    }

    @JsonIgnore
    public boolean isUser() {
        return this.role == Role.USER;
    }

    // Setter (optional) - ensures null role becomes USER
    public void setRole(Role role) {
        this.role = (role == null) ? Role.USER : role;
    }
}
