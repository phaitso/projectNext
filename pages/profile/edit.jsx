// ===== Edit Profile Page =====
// Allows the user to edit their profile information.
// Fields: photo, name, phone, bio, email.
// Changes are saved to LocalStorage via the AppContext.

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSave, FaImage, FaArrowLeft } from "react-icons/fa";
import { useApp } from "../../src/context/AppContext";
import Breadcrumb from "../../src/components/Breadcrumb/Breadcrumb";

function EditProfile() {
  const router = useRouter();
  const { currentUser, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    bio: currentUser?.bio || "",
    email: currentUser?.email || "",
  });

  const [imagePreview, setImagePreview] = useState(currentUser?.avatar || "");

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      avatar: imagePreview,
    });
    router.push("/profile");
  };

  return (
    <div className="editprofile page-fade">
      <div className="editprofile-container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Profile", to: "/profile" },
            { label: "Edit Profile" },
          ]}
        />

        {/* Back link */}
        <Link href="/profile" className="editprofile-back">
          <FaArrowLeft /> Back to Profile
        </Link>

        {/* Page header */}
        <div className="editprofile-header">
          <h1 className="editprofile-title">Edit Profile</h1>
          <p className="editprofile-subtitle">Update your account information</p>
        </div>

        {/* Form card */}
        <form className="editprofile-form" onSubmit={handleSubmit}>
          {/* Photo upload */}
          <div className="editprofile-field">
            <label className="editprofile-label">Profile Photo</label>
            <div className="editprofile-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="editprofile-file"
                className="editprofile-file-input"
              />
              <label htmlFor="editprofile-file" className="editprofile-upload-area">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="editprofile-preview" />
                ) : (
                  <div className="editprofile-upload-placeholder">
                    <FaImage className="editprofile-upload-icon" />
                    <span>Upload photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Name */}
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
            />
            <label>Phone</label>
          </div>

          {/* Bio */}
          <div className="floating-field">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="x"
              rows="4"
            />
            <label>Bio</label>
          </div>

          {/* Save button */}
          <button type="submit" className="editprofile-save-btn">
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
