import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { FaWallet } from "react-icons/fa6";
import logo from "../assets/expense-img.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } 
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/");
  };

  return (
    <div className="login-page">
      {/* LEFT SECTION */}
      <div className="login-left">
        <img src={logo} alt="Logo" />
        <h1>Personal Expense Tracker</h1>
        <p>Track, manage & control your daily expenses easily</p>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <div className="login-card">
          <div className="header-row">
            <FaWallet className="login-icon" />
            <h3 className="app-title">Welcome Back</h3>
          </div>

          <h2 className="login-title">Login Now!</h2>

          <form onSubmit={handleSubmit} noValidate>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="validation">{errors.name}</p>}

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="validation">{errors.email}</p>}

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="validation">{errors.password}</p>}

            <button type="submit" className="signin-btn">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
