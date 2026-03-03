import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useState } from "react";
import "../style/form.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;
    await handleLogin(username, password);
    console.log("User loggedIn");

    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            value={formData.username}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <input
            onChange={handleInputChange}
            value={formData.password}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button className="button primary-button" type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <Link to={"/register"}>Create One.</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
