package com.project.user_app.controller;

import com.project.user_app.dto.UserDto;
import com.project.user_app.model.UserCredential;
import com.project.user_app.model.UserDetails;
import com.project.user_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;


    //add user
    @PostMapping("/register")
    ResponseEntity<String> saveUser(@RequestParam String firstName, @RequestParam String middleName, @RequestParam String lastName, @RequestParam String email, @RequestParam String password, @RequestParam String dob, @RequestParam String gender, @RequestParam String occupation, @RequestParam String address, @RequestParam String state, @RequestParam String country, @RequestParam("file") MultipartFile file) {

        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName(firstName);
        userDetails.setMiddleName(middleName);
        userDetails.setLastName(lastName);
        userDetails.setDob(dob);
        userDetails.setGender(gender);
        userDetails.setOccupation(occupation);
        userDetails.setAddress(address);
        userDetails.setCountry(country);
        userDetails.setState(state);

        try {
            userDetails.setProfileImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return userService.saveUser(email, password, userDetails, file);
    }

    //show details
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> showUser(@PathVariable int id) {
        return userService.getUserById(id);
    }

    //update User
    @PutMapping(value = "/update/{id}", consumes = {"multipart/form-data"})
    ResponseEntity<UserDto> updateUser(@PathVariable int id,
                                      @RequestParam String firstName, @RequestParam String middleName, @RequestParam String lastName, @RequestParam String email, @RequestParam String password, @RequestParam String dob, @RequestParam String gender, @RequestParam String occupation, @RequestParam String address, @RequestParam String state, @RequestParam String country, @RequestParam("profileImage") MultipartFile file) throws IOException {

        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName(firstName);
        userDetails.setMiddleName(middleName);
        userDetails.setLastName(lastName);
        userDetails.setDob(dob);
        userDetails.setGender(gender);
        userDetails.setOccupation(occupation);
        userDetails.setAddress(address);
        userDetails.setCountry(country);
        userDetails.setState(state);
        // If file is provided, convert to byte[] and set as profile image
        if (file != null && !file.isEmpty()) {
            try {
                userDetails.setProfileImage(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return userService.updateUser(id, email, password, userDetails);
    }

    // login
    @GetMapping("/login")
    public ResponseEntity<UserCredential> login(@RequestParam String email, @RequestParam String password) {

        Optional<UserCredential> user = userService.getUserByEmailAndPassword(email, password);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


}
