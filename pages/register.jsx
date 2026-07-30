// ===== Register Page =====
// Floating-label form pattern.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaImage, FaUserPlus } from "react-icons/fa";
import { useApp } from "../src/context/AppContext";
import { universities } from "../src/data/products";

function Register() {
  const router = useRouter();
  const { register } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    university: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    if (!formData.name) return "Full name is required";
    if (!formData.studentId) return "Student ID is required";
    if (!formData.university) return "Please select a university";
    if (!formData.email) return "Email is required";
    if (!formData.phone) return "Phone number is required";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = register({
      name: formData.name,
      studentId: formData.studentId,
      university: formData.university,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      avatar: imagePreview || `https://i.pravatar.cc/150?u=${Date.now()}`,
      bio: "New Student Marketplace member.",
    });

    if (result.success) {
      router.push("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="register page-fade">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join the Student Marketplace community</p>
          </div>

          {error && <div className="register-error">{error}</div>}

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="register-field">
              <label className="register-label">Profile Image</label>
              <div className="register-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="register-file"
                  className="register-file-input"
                />
                <label htmlFor="register-file" className="register-upload-area">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="register-preview" />
                  ) : (
                    <div className="register-upload-placeholder">
                      <FaImage className="register-upload-icon" />
                      <span>Upload photo</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div className="floating-field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="x"
                required
              />
              <label>Full Name *</label>
            </div>

            {/* Student ID and University */}
            <div className="register-row">
              <div className="floating-field">
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="x"
                  required
                />
                <label>Student ID *</label>
              </div>

              <div className="floating-field">
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
                <label>University *</label>
              </div>
            </div>

            {/* Email */}
            <div className="floating-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="x"
                required
              />
              <label>Email *</label>
            </div>

            {/* Phone */}
            <div className="floating-field">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="x"
                required
              />
              <label>Phone *</label>
            </div>

            {/* Password and Confirm Password */}
            <div className="register-row">
              <div className="floating-field">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="x"
                  required
                />
                <label>Password *</label>
              </div>

              <div className="floating-field">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="x"
                  required
                />
                <label>Confirm Password *</label>
              </div>
            </div>

            <button type="submit" className="register-btn">
              <FaUserPlus /> Register
            </button>
          </form>

          <p className="register-login-text">
            Already have an account? <Link href="/login" className="register-login-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
