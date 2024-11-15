import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
  const [userid, setUserid] = useState("");
  const initialFormData = {
    user_id: userid,
    full_name: "",
    phone_number: "",
    address: "",
    education: "",
    work_experience: "",
    skills: "",
    linkedin_profile: "",
    github_profile: "",
    profile_image: null, // New field for image
  };

  const [formData, setFormData] = useState(initialFormData);
  const [profileImagePreview, setProfileImagePreview] = useState(null); // To preview image

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userid) {
      fetchProfile();
    }
  }, [userid]);

  const getUserDetails = () => {
    const userdata = localStorage.getItem("user");
    if (userdata) {
      const parsedUserData = JSON.parse(userdata);
      setUserid(parsedUserData.id);
      setFormData((prevData) => ({
        ...prevData,
        user_id: parsedUserData.id,
      }));
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/get_profile/${userid}`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profile_image: file }));

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/save_profile",
        formDataToSubmit,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        toast.success("Profile saved successfully!");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const fields = [
    { id: "user_id", label: "User ID", type: "text", disabled: true },
    { id: "full_name", label: "Full Name", type: "text" },
    { id: "phone_number", label: "Phone Number", type: "text" },
    { id: "address", label: "Address", type: "textarea" },
    { id: "education", label: "Education", type: "textarea" },
    { id: "work_experience", label: "Work Experience", type: "textarea" },
    { id: "skills", label: "Skills", type: "text" },
    { id: "linkedin_profile", label: "LinkedIn Profile", type: "text" },
    { id: "github_profile", label: "GitHub Profile", type: "text" },
  ];

  return (
    <div className="container p-5 mt-5 border border-primary rounded shadow-lg bg-light">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center text-primary font-weight-bold mb-4">Profile Form</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded" encType="multipart/form-data">
        {fields.map((field) => (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id} className="text-secondary font-weight-bold">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                className="form-control border border-info rounded"
                value={formData[field.id]}
                onChange={handleChange}
                required={!field.disabled}
                disabled={field.disabled}
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                className="form-control border border-info rounded"
                value={formData[field.id]}
                onChange={handleChange}
                required={!field.disabled}
                disabled={field.disabled}
              />
            )}
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="profile_image" className="text-secondary font-weight-bold">
            Profile Image
          </label>
          <input
            type="file"
            id="profile_image"
            name="profile_image"
            className="form-control border border-info rounded"
            onChange={handleFileChange}
          />
          {profileImagePreview && (
            <div className="mt-3">
              <img src={profileImagePreview} alt="Profile Preview" className="img-fluid" style={{ maxWidth: "200px" }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block font-weight-bold shadow-sm">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
