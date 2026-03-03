import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useState } from "react";
import "../style/form.scss";

const Register = () => {
  const { loading, handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = formData;
    await handleRegister(username, email, password);
    console.log("User registered");

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
        <h1>Register</h1>
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
            value={formData.email}
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
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
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to={"/login"}>Login to account.</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
