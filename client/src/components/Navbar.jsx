import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FaTint,
  FaUserCircle,
  FaSignOutAlt,
  FaUserPlus,
  FaUser,
  FaTachometerAlt,
  FaClipboardList,
  FaHandHoldingMedical,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const { user, setUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/donors", label: "Donors" },
    { to: "/requests", label: "Requests" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
    { to: "/help", label: "Help" },
  ];

  return (
    <Navbar bg="danger" variant="dark" expand="lg" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 d-flex align-items-center gap-2"
        >
          <FaTint /> BloodConnect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center" activeKey={location.pathname}>
            {publicLinks.map((link) => (
              <Nav.Link
                key={link.to}
                as={Link}
                to={link.to}
                eventKey={link.to}
              >
                {link.label}
              </Nav.Link>
            ))}

            {!token ? (
              <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0 ms-lg-3">
                <Button as={Link} to="/login" variant="outline-light">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="light" className="text-danger fw-semibold">
                  Register
                </Button>
              </div>
            ) : user?.role === "admin" ? (
              <>
                <NavDropdown
                  title={
                    <span className="d-inline-flex align-items-center gap-2">
                      <FaTachometerAlt /> Admin
                    </span>
                  }
                  id="admin-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/admin-dashboard">
                    <FaTachometerAlt className="me-2 text-danger" /> Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin-requests">
                    <FaClipboardList className="me-2 text-danger" /> Manage
                    Requests
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin-donations">
                    <FaHandHoldingMedical className="me-2 text-danger" /> Manage
                    Donations
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span className="d-inline-flex align-items-center gap-2">
                      <FaUserCircle /> {user?.name || "Account"}
                    </span>
                  }
                  id="account-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    <FaUser className="me-2 text-danger" /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2 text-danger" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavDropdown
                title={
                  <span className="d-inline-flex align-items-center gap-2">
                    <FaUserCircle /> {user?.name || "Account"}
                  </span>
                }
                id="account-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <FaUser className="me-2 text-danger" /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/apply-donor">
                  <FaUserPlus className="me-2 text-danger" /> Apply as Donor
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2 text-danger" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
