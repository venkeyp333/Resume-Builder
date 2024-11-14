import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TemplateList({ userId }) {
  const [templates, setTemplates] = useState([]);
  const [userIdState, setUserIdState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch templates data from the server
    axios.get('http://localhost:5000/get_templates')
      .then(response => {
        if (response.data.templates) {
          setTemplates(response.data.templates);
        } else {
          console.log('No templates found');
        }
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      });

    // Retrieve and parse user data from localStorage
    const userdata = localStorage.getItem("user");
    if (userdata) {
      const parsedUserData = JSON.parse(userdata);
      console.log("Parsed userdata:", parsedUserData);
      console.log("User ID:", parsedUserData.id);
      setUserIdState(parsedUserData.id);
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  const handleDownload = (templateId) => {
    if (userIdState) {
      // Make an API call to download the document using the userId from state
      axios.get(`http://localhost:5000/get_profile_doc/${userIdState}/${templateId}`, {
        responseType: 'blob', // Ensure we get the file as a blob
      })
        .then(response => {
          // Create a link element and trigger a download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;

          // Set the download filename to template_<templateId>.docx
          link.setAttribute('download', `template_${templateId}.docx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error('Error downloading the template:', error);
        });
    } else {
      console.log('User ID is not available.');
    }
  };

  const handleDelete = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      // Make an API call to delete the template
      axios.delete(`http://localhost:5000/delete_template/${templateId}`)
        .then(response => {
          console.log('Template deleted:', response);
          // Remove the deleted template from the state
          setTemplates(templates.filter(template => template.template_id !== templateId));
        })
        .catch(error => {
          console.error('Error deleting the template:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Templates</h2>

      <div className="text-center mb-4">
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/UploadTemplate')}
        >
          <i className="bi bi-upload mr-2"></i>Upload New Template
        </button>
      </div>

      <div className="template-list">
        {templates.length === 0 ? (
          <p className="text-center">No templates available</p>
        ) : (
          templates.map((template) => (
            <div key={template.template_id} className="template-card mb-4 p-4 border shadow-sm rounded">
              <div className="text-center">
                <h3>{template.template_name}</h3>
                {template.template_image ? (
                  <img
                    src={`data:image/png;base64,${template.template_image}`}  // Render the base64 image
                    alt={template.template_name}
                    className="template-image mb-3"
                    style={{ width: '200px', height: 'auto', borderRadius: '8px' }}  // Customize the image size
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-success mt-3" onClick={() => handleDownload(template.template_id)}>
                  <i className="bi bi-download mr-2"></i>Download Template
                </button>
                <button 
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(template.template_id)}
                >
                  <i className="bi bi-trash mr-2"></i>Delete Template
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TemplateList;
