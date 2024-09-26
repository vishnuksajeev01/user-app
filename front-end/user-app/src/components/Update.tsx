import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Update.css";

interface User {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  state: string;
  country: string;
  occupation: string;
  profileImage: string | null;
}

interface Props {
  user: User;
  setUpdateMode: (value: boolean) => void;
  onUpdateUserData: (updatedUser: User) => void;
  userId: number | null;
  fetchUserDetails: () => Promise<void>;
}

function Update({
  user,
  setUpdateMode,
  onUpdateUserData,
  fetchUserDetails,
  userId,
}: Props) {
  //   let userId = 101;
  const navigate = useNavigate();

  const [newFormData, setNewFormData] = useState({
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    dob: user.dob,
    gender: user.gender,
    occupation: user.occupation,
    address: user.address,
    state: user.state,
    country: user.country,
    profileImage: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewFormData({ ...newFormData, profileImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(newFormData).forEach((key) => {
      if (key !== "profileImage") {
        formDataToSend.append(key, (newFormData as any)[key]);
      }
    });

    if (newFormData.profileImage) {
      formDataToSend.append("profileImage", newFormData.profileImage);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/user/update/" + userId,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        onUpdateUserData(updatedUser);
        await fetchUserDetails();
        navigate("/dashboard");
      } else {
        console.error("Error: Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setUpdateMode(false);
    fetchUserDetails();
    navigate("/dashboard"); // redirect back to dashboard
  };

  const handleCancel = () => {
    setUpdateMode(false);
    navigate("/dashboard");
  };

  const handleReset = () => {
    setNewFormData({
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
      profileImage: null,
    });
  };

  return (
    <>
      <h1 className="update-form-heading">Update User Information</h1>
      <div className="update-form-container">
        <form
          action={`/update/${userId}`}
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="update-form"
        >
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="update-input"
              value={newFormData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="middleName">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="update-input"
              value={newFormData.middleName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="update-input"
              required
              value={newFormData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="update-input"
              disabled
              value={newFormData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="update-input"
              required
              value={newFormData.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="update-input"
              required
              value={newFormData.dob}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              className="update-select"
              required
              value={newFormData.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="occupation">Occupation:</label>
            <select
              id="occupation"
              name="occupation"
              className="update-select"
              value={newFormData.occupation}
              onChange={handleInputChange}
            >
              <option value="">Select Occupation</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              className="update-input"
              value={newFormData.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              className="update-input"
              value={newFormData.state}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              className="update-input"
              value={newFormData.country}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              className="update-input"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            <button type="submit" className="update-button">
              Update Data
            </button>
            <button
              type="button"
              className="update-button"
              onClick={handleReset}
            >
              Reset
            </button>
            <button onClick={handleCancel} className="update-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Update;
