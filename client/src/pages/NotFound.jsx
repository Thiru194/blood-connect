import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTint, FaHome, FaArrowLeft } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Catch-all page shown for any route that doesn't match.
function NotFound() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center py-5">
        <FaTint className="text-danger mb-3" style={{ fontSize: "4rem" }} />
        <h1 className="fw-bold display-1 text-danger mb-0">404</h1>
        <h2 className="fw-bold mb-3">Page Not Found</h2>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: 480 }}>
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to safety.
        </p>

        <div className="d-flex gap-3 flex-column flex-sm-row">
          <Button
            as={Link}
            to="/"
            variant="danger"
            size="lg"
            className="rounded-pill fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
          >
            <FaHome /> Go Home
          </Button>
          <Button
            variant="outline-danger"
            size="lg"
            onClick={() => window.history.back()}
            className="rounded-pill fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </Button>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default NotFound;
