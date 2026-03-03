import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const { username, email, password } = formData;

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      });
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
