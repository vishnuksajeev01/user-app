import "./styles/Login.css";
import { useState } from "react";

interface Props {
  setUserId: (id: number) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function Login({ setUserId, setIsLoggedIn }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/user/login?email=${email}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsLoggedIn(true);
        setUserId(result.id);
      } else {
        alert("Please check if email and password is correct");
        console.error("Error: Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container login-container">
      <div className="card login-card">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form className="form-container" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
