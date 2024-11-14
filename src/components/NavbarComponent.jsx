// components/NavbarComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg p-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-light d-flex align-items-center">
          <FaHome className="me-2" /> MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-light d-flex align-items-center me-3">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-light d-flex align-items-center me-3">
              <FaInfoCircle className="me-1" /> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-light d-flex align-items-center me-3">
              <FaEnvelope className="me-1" /> Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-light d-flex align-items-center me-3">
              <FaSignInAlt className="me-1" /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-light d-flex align-items-center">
              <FaUserPlus className="me-1" /> Register
            </Nav.Link>
            
            <Nav.Link as={Link} to="/viewTemplates" className="text-light d-flex align-items-center">
              <FaUserPlus className="me-1" /> Templates
            </Nav.Link>
                
            <Nav.Link as={Link} to="/profile" className="text-light d-flex align-items-center">
              <FaUserPlus className="me-1" /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
