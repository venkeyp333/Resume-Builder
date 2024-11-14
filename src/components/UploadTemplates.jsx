import React, { useState } from 'react';
import axios from 'axios';

function Templates() {
  const [templateName, setTemplateName] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleTemplateUpload = async () => {
    // Validate the input before making the request
    if (!templateName || !docFile || !imageFile) {
      setMessage('Please fill in all fields and select both files.');
      return;
    }

    const formData = new FormData();
    formData.append('template_name', templateName);
    formData.append('file', docFile);
    formData.append('image', imageFile);

    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('http://localhost:5000/upload_template', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Upload successful!');
      console.log('Upload success:', response.data);
    } catch (error) {
      setMessage('Error uploading template. Please try again.');
      console.error('Error uploading template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Upload Template</h1>

      {/* Display any feedback messages */}
      {message && <p className="alert alert-info text-center">{message}</p>}

      <div className="mb-3">
        {/* Template name input */}
        <label htmlFor="templateName" className="form-label">Template Name</label>
        <input
          id="templateName"
          type="text"
          className="form-control"
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        {/* DOCX file input */}
        <label htmlFor="docFile" className="form-label">Upload DOCX File</label>
        <input
          id="docFile"
          type="file"
          accept=".docx"
          className="form-control"
          onChange={(e) => setDocFile(e.target.files[0])}
        />
        <small className="form-text text-muted">Please upload a DOCX file.</small>
      </div>

      <div className="mb-3">
        {/* Image file input */}
        <label htmlFor="imageFile" className="form-label">Upload Image</label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <small className="form-text text-muted">Please upload an image file (JPG, PNG, etc.).</small>
      </div>

      <div className="d-flex justify-content-center">
        {/* Submit button */}
        <button
          className="btn btn-primary btn-lg"
          onClick={handleTemplateUpload}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="bi bi-arrow-repeat mr-2"></i>Uploading...
            </>
          ) : (
            <>
              <i className="bi bi-upload mr-2"></i>Upload Template
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Templates;
