import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [formData, setformData] = useState({ username: "", password: "" });

  async function handleFormSubmit(event) {
    event.preventDefault();
    const { username, password } = formData;

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
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
            value={formData.password}
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link className="toggle-auth-form" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
