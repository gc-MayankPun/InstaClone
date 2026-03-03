import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const { username, email, password } = formData;
    handleRegister(username, email, password).then((res) => {
      console.log(res);
      navigate("/");
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={handleChange}
            value={formData.username}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggle-auth-form" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
