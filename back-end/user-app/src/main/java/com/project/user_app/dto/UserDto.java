package com.project.user_app.dto;

import lombok.Data;

import java.util.Base64;

@Data
public class UserDto {

    private int userId;
    private String email;
    private String password;

    private String firstName;
    private String middleName;
    private String lastName;
    private String dob;
    private String gender;
    private String address;
    private String state;
    private String country;
    private String occupation;
    private String profileImage; // Base64 encoded string

    //byte to string
    public void setProfileImage(byte[] profileImageBytes) {
        // Convert byte[] to Base64 String
        this.profileImage = Base64.getEncoder().encodeToString(profileImageBytes);
    }



}
