package com.project.user_app.dao;

import com.project.user_app.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCredentialDao extends JpaRepository<UserCredential, Integer> {

    @Query(value = "SELECT * FROM user_credential WHERE email = :email AND password = :password", nativeQuery = true)
    Optional<UserCredential> getUserByEmailAndPassword(String email, String password);
}
