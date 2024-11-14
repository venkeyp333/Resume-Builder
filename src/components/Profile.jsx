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
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Retrieve the user details from localStorage and set the user ID
    getUserDetails();
  }, []);

  useEffect(() => {
    // Fetch profile data only after user ID is set
    if (userid) {
      fetchProfile();
    }
  }, [userid]);

  const getUserDetails = () => {
    const userdata = localStorage.getItem("user");
    if (userdata) {
      const parsedUserData = JSON.parse(userdata);
      console.log("Parsed userdata:", parsedUserData);
      console.log("User ID:", parsedUserData.id);
      setUserid(parsedUserData.id);
      setFormData((prevData) => ({
        ...prevData,
        user_id: parsedUserData.id,
      }));
    } else {
      console.log("No user data found in localStorage.");
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/get_profile/${userid}`
      );
      if (response.data) {
        setFormData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch profile data. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/save_profile",
        formData
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
      <h2 className="text-center text-primary font-weight-bold mb-4">
        Profile Form
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
        {fields.map((field) => (
          <div key={field.id} className="form-group">
            <label
              htmlFor={field.id}
              className="text-secondary font-weight-bold"
            >
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

        <button
          type="submit"
          className="btn btn-primary btn-block font-weight-bold shadow-sm"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
