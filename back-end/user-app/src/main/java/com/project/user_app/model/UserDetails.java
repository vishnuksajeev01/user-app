package com.project.user_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String dob;
    private String gender;
    private String address;
    private String state;
    private String country;
    private String occupation;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] profileImage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private UserCredential userCredential;
}
