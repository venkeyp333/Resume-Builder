import React from 'react';
import { FaUser, FaFile, FaRegLightbulb, FaRocket } from 'react-icons/fa';  // Importing Font Awesome icons

function Home() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the Resume Builder</h1>
        <p className="text-lg text-gray-600">Create and manage your professional resumes with ease</p>
      </div>

      <div className="row text-center">
        {/* Section 1 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-lg p-4">
            <FaUser className="text-5xl text-blue-500 mb-3" />
            <h3 className="font-semibold text-xl text-gray-700">Personal Information</h3>
            <p className="text-gray-500">Add your contact details and personal information to get started.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-lg p-4">
            <FaFile className="text-5xl text-green-500 mb-3" />
            <h3 className="font-semibold text-xl text-gray-700">Professional Experience</h3>
            <p className="text-gray-500">Add your work experience and skills to stand out to employers.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-lg p-4">
            <FaRegLightbulb className="text-5xl text-yellow-500 mb-3" />
            <h3 className="font-semibold text-xl text-gray-700">Guides & Tips</h3>
            <p className="text-gray-500">Get useful tips to enhance your resume and increase your chances.</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-lg p-4">
            <FaRocket className="text-5xl text-red-500 mb-3" />
            <h3 className="font-semibold text-xl text-gray-700">Launch Your Career</h3>
            <p className="text-gray-500">Once your resume is ready, take it to the next level and apply for jobs!</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-5">
        <button className="btn btn-primary px-5 py-3 rounded-lg text-white text-xl">
          Start Building Your Resume
        </button>
      </div>
    </div>
  );
}

export default Home;
