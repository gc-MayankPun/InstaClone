import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setformData] = useState({ username: "", password: "" });
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const { username, password } = formData;
    handleLogin(username, password).then((res) => {
      console.log(res);
      navigate("/");
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
