package com.project.user_app.dao;

import com.project.user_app.model.UserCredential;
import com.project.user_app.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsDao extends JpaRepository<UserDetails,Integer> {
}
