package com.sambalpuribazaar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

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
    @NonNull
    private String name;
    @Indexed(unique = true)
    @NonNull
    private String email;
    @NonNull
    private String password;

    private String address;

    private String phone;

    @NonNull
    private Role role;

    public enum Role {
        ADMIN, USER
    }

}
