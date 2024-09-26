import React, { useState } from "react";

import "./styles/Register.css";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserId: (userId: number | null) => void;
}

function Register({}: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    occupation: "",
    address: "",
    state: "",
    country: "",
    profileImage: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("middleName", formData.middleName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("occupation", formData.occupation);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    if (formData.profileImage) {
      formDataToSend.append("file", formData.profileImage);
    }

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.text;
        console.log("Success:", result);
        navigate("/login");
      } else {
        console.error("Error: Failed to register user");
        alert("Registration not successful");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateForm = () => {
    const rePasswordElement = document.getElementById(
      "rePassword"
    ) as HTMLInputElement;
    if (!rePasswordElement) {
      alert("Re-enter password field is missing.");
      return false;
    }
    const rePassword = rePasswordElement.value;
    const { firstName, middleName, lastName, password } = formData;

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (
      !nameRegex.test(firstName) ||
      !nameRegex.test(lastName) ||
      (middleName && !nameRegex.test(middleName))
    ) {
      alert("Name fields must contain only letters.");
      return false;
    }

    if (password !== rePassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  return (
    <div className="container register-container">
      <div className="">
        <div className="">
          <h2 className="card-title text-center">Register</h2>
          <br />
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="form-container"
          >
            <div className="fullname-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleInputChange}
                className="form-control"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            {/* Gender Group */}
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <div className="d-flex">
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="password"
              name="password"
              id="rePassword"
              placeholder="Re-enter Password"
              className="form-control"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
              className="form-control"
            />

            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select Occupation</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <input
              type="file"
              name="profileImage"
              onChange={(e) => handleFileChange(e)}
              className="form-control"
              required
            />
            <button type="submit" className=" btn btn-primary btn-block">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
