package com.project.user_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "user_credential_seq")
    @SequenceGenerator(name = "user_credential_seq", sequenceName = "user_credential_sequence", initialValue = 101, allocationSize = 1)
    private int id;
    private String email;
    private String password;

    @JsonIgnore
    @OneToOne(mappedBy = "userCredential")
    private UserDetails userDetails;
}
