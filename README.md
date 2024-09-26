# User App

## Description
The User App allows users to register by providing their details, including a profile image. Once registered, users can log in using their email address and password. After logging in, users will have the ability to edit all profile fields except for their email address, which cannot be changed after registration.

## Tech Stack
- **Front-end:** React, JavaScript, HTML, CSS
- **Back-end:** Java, Spring Boot, JPA for database communication
- **Database:** MySQL

## Table Structure
1. **user_credential:** One-to-one mapping with user_details
   
![table1 - user_credential](https://github.com/user-attachments/assets/b0b490d3-7f36-42c7-b333-08c7538df340)

2. **user_details:** One-to-one mapping with user_credential
![table2 - user_details](https://github.com/user-attachments/assets/6e925e08-0595-47ba-b356-5f99d0ae9e54)


## Screenshots
1. **Login**
   ![login](https://github.com/user-attachments/assets/24220877-667e-4a0b-a31a-97af449e77ea)

2. **Register**
   ![register](https://github.com/user-attachments/assets/bcc5a8be-f3cd-4d78-9a04-a6533beb927b)

   
3. **Dashboard**
   ![dashboard](https://github.com/user-attachments/assets/c2520a1e-0824-4ff0-9bc1-56cc1706fdf7)


4. **Update**
  ![update](https://github.com/user-attachments/assets/4478df24-6a12-44a5-9734-2b2142aa286f)
  ![update2](https://github.com/user-attachments/assets/52453a9c-34a2-428c-9f0d-cf25356916c6)
   - Features reset and cancel buttons

5. **Password Validation on Register Screen**
 ![password validation](https://github.com/user-attachments/assets/961846fc-2388-4a7d-8215-bac1e6fd4de8)

