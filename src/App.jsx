import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, ToastContainer } from 'react-bootstrap';
import NavbarComponent from './components/NavbarComponent.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Templates from './components/Templates.jsx';
import Profile from './components/Profile.jsx';
import UploadTemplates from './components/uploadTemplates.jsx';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>

      {/* Toast container to render toast notifications */}
      <Toaster />

      <NavbarComponent />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/viewTemplates" element={<Templates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/UploadTemplate" element={<UploadTemplates />} />



        </Routes>
      </Container>
    </Router>
  );
}

export default App;
