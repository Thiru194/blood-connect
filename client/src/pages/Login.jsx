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
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTint,
  FaSignInAlt,
  FaHeart,
} from "react-icons/fa";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import { getCurrentUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const userData = await getCurrentUser(res.data.token);

      setUser(userData.user);

      if (userData.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5"
    >
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8} xl={7}>
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

                <h3 className="fw-bold mb-3">Welcome Back to BloodConnect</h3>

                <p className="text-white-50 mb-4">
                  Sign in to continue your journey of saving lives. Every login
                  brings hope a little closer.
                </p>

                <Stack direction="horizontal" gap={4}>
                  <div>
                    <div className="fs-4 fw-bold lh-1">5,000+</div>
                    <small className="text-white-50">Donors</small>
                  </div>
                  <div>
                    <div className="fs-4 fw-bold lh-1">12,000+</div>
                    <small className="text-white-50">Lives Saved</small>
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
                  <FaTint /> Member Login
                </Badge>

                <h2 className="fw-bold mb-1">Sign In</h2>
                <p className="text-muted mb-4">
                  Enter your credentials to access your account.
                </p>

                {error && (
                  <Alert
                    variant="danger"
                    onClose={() => setError(null)}
                    dismissible
                  >
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-uppercase text-secondary">
                      Email Address
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white text-danger">
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold text-uppercase text-secondary">
                      Password
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white text-danger">
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
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
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="remember-me"
                      label="Remember me"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <Link
                      to="/forgot-password"
                      className="text-danger text-decoration-none fw-semibold small"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="danger"
                    size="lg"
                    className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt /> Sign In
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-danger text-decoration-none fw-semibold"
                  >
                    Register
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

export default Login;
