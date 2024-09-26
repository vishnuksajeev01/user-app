package com.project.user_app.service;

import com.project.user_app.dao.UserCredentialDao;
import com.project.user_app.dao.UserDetailsDao;
import com.project.user_app.dto.UserDto;
import com.project.user_app.model.UserCredential;
import com.project.user_app.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserCredentialDao userCredentialDao;

    @Autowired
    UserDetailsDao userDetailsDao;

    //save
    public ResponseEntity<String> saveUser(String email, String password, UserDetails userDetails, MultipartFile file) {
        try {
            Optional<UserCredential> existingUser = userCredentialDao.getUserByEmailAndPassword(email, password);
            if (existingUser.isPresent()) {
                return new ResponseEntity<>("User with this email and password already exists!", HttpStatus.CONFLICT);
            }

            if (file != null && !file.isEmpty()) {
                userDetails.setProfileImage(file.getBytes()); // Save image as byte array
            }


            UserCredential userCredential = new UserCredential();
            userCredential.setEmail(email);
            userCredential.setPassword(password);

            // relationship
            userCredential.setUserDetails(userDetails);
            userDetails.setUserCredential(userCredential);


            userDetailsDao.save(userDetails);

            return new ResponseEntity<>("User saved successfully!", HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to save user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //show
    public ResponseEntity<UserDto> getUserById(int id) {
        Optional<UserCredential> optionalUserCredential = userCredentialDao.findById(id);

        if (optionalUserCredential.isPresent()) {
            UserCredential userCredential = optionalUserCredential.get();
            UserDto userDto = new UserDto();
            userDto.setUserId(userCredential.getId());
            userDto.setEmail(userCredential.getEmail());
            userDto.setPassword(userCredential.getPassword());


            if (userCredential.getUserDetails() != null) {
                userDto.setFirstName(userCredential.getUserDetails().getFirstName());
                userDto.setMiddleName(userCredential.getUserDetails().getMiddleName());
                userDto.setLastName(userCredential.getUserDetails().getLastName());
                userDto.setDob(userCredential.getUserDetails().getDob());
                userDto.setGender(userCredential.getUserDetails().getGender());
                userDto.setAddress(userCredential.getUserDetails().getAddress());
                userDto.setState(userCredential.getUserDetails().getState());
                userDto.setCountry(userCredential.getUserDetails().getCountry());
                userDto.setOccupation(userCredential.getUserDetails().getOccupation());
                userDto.setProfileImage(userCredential.getUserDetails().getProfileImage());  //image

            }

            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //update
    public ResponseEntity<UserDto> updateUser(int id, String email, String password, UserDetails userDetails) throws IOException {
        Optional<UserCredential> optionalUserCredential = userCredentialDao.findById(id);

        if (optionalUserCredential.isPresent()) {


            UserCredential existingUserCredential = optionalUserCredential.get();


            existingUserCredential.setEmail(email);
            existingUserCredential.setPassword(password);


            UserDetails existingUserDetails = existingUserCredential.getUserDetails();
            if (existingUserDetails != null) {
                existingUserDetails.setFirstName(userDetails.getFirstName());
                existingUserDetails.setMiddleName(userDetails.getMiddleName());
                existingUserDetails.setLastName(userDetails.getLastName());
                existingUserDetails.setDob(userDetails.getDob());
                existingUserDetails.setGender(userDetails.getGender());
                existingUserDetails.setAddress(userDetails.getAddress());
                existingUserDetails.setState(userDetails.getState());
                existingUserDetails.setCountry(userDetails.getCountry());
                existingUserDetails.setOccupation(userDetails.getOccupation());

                existingUserDetails.setProfileImage(userDetails.getProfileImage());

            }

            userCredentialDao.save(existingUserCredential);

            // UserDto to return
            UserDto updatedUserDto = new UserDto();
            updatedUserDto.setUserId(existingUserCredential.getId()); // Assuming getId() returns user ID
            updatedUserDto.setEmail(existingUserCredential.getEmail());
            updatedUserDto.setPassword(existingUserCredential.getPassword());
            updatedUserDto.setFirstName(existingUserDetails.getFirstName());
            updatedUserDto.setMiddleName(existingUserDetails.getMiddleName());
            updatedUserDto.setLastName(existingUserDetails.getLastName());
            updatedUserDto.setDob(existingUserDetails.getDob());
            updatedUserDto.setGender(existingUserDetails.getGender());
            updatedUserDto.setAddress(existingUserDetails.getAddress());
            updatedUserDto.setState(existingUserDetails.getState());
            updatedUserDto.setCountry(existingUserDetails.getCountry());
            updatedUserDto.setOccupation(existingUserDetails.getOccupation());

            // Convert profile image to Base64 if needed
            if (existingUserDetails.getProfileImage() != null) {
                updatedUserDto.setProfileImage(existingUserDetails.getProfileImage());
            }

            return new ResponseEntity<>(updatedUserDto, HttpStatus.OK);
        } else {
            UserDto UserDto = new UserDto();
            return new ResponseEntity<>(UserDto, HttpStatus.NOT_FOUND);
        }
    }

    public Optional<UserCredential> getUserByEmailAndPassword(String email, String password) {

        return userCredentialDao.getUserByEmailAndPassword(email, password);
    }
}