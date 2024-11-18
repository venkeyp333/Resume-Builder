import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaLinkedin, FaGithub, FaEdit } from 'react-icons/fa'; // Icons from react-icons
// import { Toast } from "bootstrap";
import toast, { Toaster } from 'react-hot-toast'; 
const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    full_name: "",
    phone_number: "",
    address: "",
    education: "",
    work_experience: "",
    skills: "",
    linkedin_profile: "",
    github_profile: "",
    profile_image: null, // file input for profile image
  });
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false); // Flag to toggle image edit mode
  const [userid, setUserid] = useState("");

  // Fetch the user details and populate the form
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const userdata = localStorage.getItem("user");
    if (userdata) {
      const parsedUserData = JSON.parse(userdata);
      setUserid(parsedUserData.id);
      fetchProfile(parsedUserData.id);
    }
  };

  const fetchProfile = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/get_profile/${id}`);
      if (response.status === 200) {
        setFormData(response.data);
        // Handle profile image preview if it exists
        if (response.data.profile_image) {
          setProfileImagePreview(`data:image/jpeg;base64,${response.data.profile_image}`);
        }
      } else if (response.status === 404) {
        toast.error("User data not found");
      }
    } catch (error) {
      toast.error("Failed to fetch profile data. Please try again.");
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // set the first file from the file input
      });
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImagePreview(reader.result); // Preview the image
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("formData");
    console.log(formData);
  
    const { full_name, education, work_experience } = formData;
  
    // Validation for required fields
    if (!userid || !full_name || !education || !work_experience) {
      toast.error("User ID, Full Name, Education, and Work Experience are required");
      return;
    }
  
    const form = new FormData();
    form.append("user_id", userid); // use userid state
    form.append("full_name", full_name);
    form.append("phone_number", formData.phone_number);
    form.append("address", formData.address);
    form.append("education", education);
    form.append("work_experience", work_experience);
    form.append("skills", formData.skills);
    form.append("linkedin_profile", formData.linkedin_profile);
    form.append("github_profile", formData.github_profile);
  
    // Only append the profile image if the user is editing it
    if (isEditingImage && formData.profile_image) {
      form.append("profile_image", formData.profile_image); // append file data if present
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/save_profile", form, {
        headers: {
          "Content-Type": "multipart/form-data", // important for file upload
        },
      });
  
      // Log the response to check its content
      console.log("API Response:", response);
  
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);  // Hot Toast success notification
      } else {
        toast.error("Failed to save or update profile");  // Hot Toast error notification
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      toast.error("Failed to save or update profile");
    }
  };
  
  
  

  // Toggle the edit profile image mode
  const handleImageEditToggle = () => {
    setIsEditingImage(!isEditingImage); // Toggle between edit and view mode
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="text-center mb-4">
                {/* Profile Image with Edit Icon */}
                <div className="position-relative">
                  <img
                    src={profileImagePreview || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-circle border border-5 border-primary"
                    width="150"
                    height="150"
                  />
                  {/* Edit Icon */}
                  {!isEditingImage && (
                    <button
                      className="position-absolute top-0 end-0 btn btn-light btn-sm rounded-circle"
                      onClick={handleImageEditToggle}
                      style={{ zIndex: 1 }}
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {/* File input for editing image */}
                {isEditingImage && (
                  <div className="mt-2">
                    <input
                      type="file"
                      className="form-control"
                      name="profile_image"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUser /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaPhoneAlt /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaMapMarkerAlt /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Education</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaGraduationCap /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Work Experience</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaBriefcase /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="work_experience"
                      value={formData.work_experience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Skills</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaCode /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">LinkedIn Profile</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaLinkedin /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="linkedin_profile"
                      value={formData.linkedin_profile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">GitHub Profile</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaGithub /></span>
                    <input
                      type="text"
                      className="form-control"
                      name="github_profile"
                      value={formData.github_profile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
