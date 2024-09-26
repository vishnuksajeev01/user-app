import { useEffect, useState } from "react";
import "./styles/Dashboard.css";
import Update from "./Update";

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
  userId: number | null;
  onLogout: () => void; // empty call on logout
}

function Dashboard({ userId, onLogout }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const fetchUserDetails = async () => {
    if (userId === null) return;

    try {
      const response = await fetch(`http://localhost:8080/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result);
      } else {
        console.error("Error: Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleUpdateButton = () => {
    setUpdateMode(true);
  };

  const handleUpdateUserData = (updatedUser: User) => {
    setUser(updatedUser);
    setUpdateMode(false);
  };

  if (updateMode && user) {
    return (
      <Update
        user={user}
        setUpdateMode={setUpdateMode}
        onUpdateUserData={handleUpdateUserData}
        fetchUserDetails={fetchUserDetails} // Passing fetched data to Update component
        userId={userId}
      />
    );
  }
  const fullName = `${user?.firstName} ${user?.middleName || ""} ${
    user?.lastName
  }`.trim();

  return (
    <>
      <div className="dashboard-wrapper">
        {/* <h1 className="dashboard-Heading">User Dashboard</h1> */}
        {user ? (
          <div className="dashboard-user-dashboard-container">
            <h1 className="dashboard-welcome-message">Welcome, {fullName}</h1>

            <div className="dashboard-details-and-photo-row">
              <div className="dashboard-user-details">
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Email:</span>
                  <span className="dashboard-detail-value">{user.email}</span>
                </div>
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Date of Birth:</span>
                  <span className="dashboard-detail-value">{user.dob}</span>
                </div>
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Gender:</span>
                  <span className="dashboard-detail-value">{user.gender}</span>
                </div>
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Address:</span>
                  <span className="dashboard-detail-value">{user.address}</span>
                </div>
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">State:</span>
                  <span className="dashboard-detail-value">{user.state}</span>
                </div>
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Country:</span>
                  <span className="dashboard-detail-value">{user.country}</span>
                </div>
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Occupation:</span>
                  <span className="dashboard-detail-value">
                    {user.occupation}
                  </span>
                </div>
              </div>
              <div className="dashboard-profile-image-container">
                {user.profileImage && (
                  <img
                    src={`data:image/jpeg;base64,${user.profileImage}`}
                    alt="Profile"
                    className="dashboard-profile-image"
                  />
                )}
              </div>
            </div>
            <div className="dashboard-buttons-container">
              <button className="dashboard-btn" onClick={handleUpdateButton}>
                Update Details
              </button>
              <button className="dashboard-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
