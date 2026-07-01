import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
  Badge,
  Stack,
} from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaHeart,
  FaHandHoldingHeart,
} from "react-icons/fa";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const response = await api.post("/auth/register", formData);

      console.log(response.data);

      setFeedback({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });

      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      console.log(error);

      setFeedback({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Registration Failed. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5"
    >
      <Row className="justify-content-center w-100">
        <Col md={11} lg={9} xl={8}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Row className="g-0">
              {/* Brand panel */}
              <Col
                md={5}
                className="bg-danger text-white p-4 p-lg-5 d-flex flex-column justify-content-center"
              >
                <div
                  className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center mb-4"
                  style={{ width: 60, height: 60 }}
                >
                  <FaHeart size={26} />
                </div>

                <h3 className="fw-bold mb-3">Join BloodConnect Today</h3>

                <p className="text-white-50 mb-4">
                  Create your account and become part of a community that saves
                  lives every single day.
                </p>

                <Stack gap={3}>
                  <div className="d-flex align-items-center gap-3">
                    <FaHandHoldingHeart size={22} />
                    <span className="small">Donate blood & track donations</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <FaTint size={22} />
                    <span className="small">Request blood in emergencies</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <FaUser size={22} />
                    <span className="small">Connect with nearby donors</span>
                  </div>
                </Stack>
              </Col>

              {/* Form panel */}
              <Col md={7} className="p-4 p-lg-5">
                <Badge
                  bg="danger-subtle"
                  text="danger"
                  className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
                >
                  <FaUserPlus /> Create Account
                </Badge>

                <h2 className="fw-bold mb-1">Register</h2>
                <p className="text-muted mb-4">
                  Fill in your details to get started.
                </p>

                {feedback && (
                  <Alert
                    variant={feedback.type}
                    onClose={() => setFeedback(null)}
                    dismissible
                  >
                    {feedback.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col xs={12}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Full Name
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter name"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col xs={12}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Email
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaEnvelope />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col xs={12}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Password
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaLock />
                        </InputGroup.Text>
                        <Form.Control
                          type={showPass ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPass(!showPass)}
                          aria-label={
                            showPass ? "Hide password" : "Show password"
                          }
                        >
                          {showPass ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>

                  <p className="text-muted small mt-3 mb-0">
                    You can apply to become a donor with your full details after
                    logging in.
                  </p>

                  <Button
                    type="submit"
                    variant="danger"
                    size="lg"
                    disabled={loading}
                    className="w-100 fw-bold mt-4 d-flex align-items-center justify-content-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <FaUserPlus /> Register
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-danger text-decoration-none fw-semibold"
                  >
                    Login
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
