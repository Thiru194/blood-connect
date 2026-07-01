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
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCommentDots,
  FaHeadset,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Simulate sending (no backend endpoint wired up)
    setTimeout(() => {
      setFeedback({
        type: "success",
        message: "Thanks for reaching out! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 800);
  };

  const info = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "support@bloodconnect.com",
    },
    {
      icon: <FaPhoneAlt />,
      label: "Phone",
      value: "+91 98765 43210",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Address",
      value: "Hosur, Tamil Nadu, India",
    },
    {
      icon: <FaClock />,
      label: "Working Hours",
      value: "Mon - Sat, 9:00 AM - 7:00 PM",
    },
  ];

  return (
    <div className="bg-light">
      <Navbar />

      {/* Hero */}
      <div className="bg-danger text-white text-center py-5">
        <Container>
          <Badge
            bg="light"
            text="danger"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
          >
            <FaHeadset /> We're Here to Help
          </Badge>
          <h1 className="fw-bold display-5 mb-2">Contact Us</h1>
          <p className="lead text-white-50 mb-0 mx-auto" style={{ maxWidth: 560 }}>
            Have a question or need assistance? We&apos;d love to hear from you.
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-5">
        <Row className="g-4 justify-content-center">
          {/* Contact info panel */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm rounded-4 bg-danger text-white h-100">
              <Card.Body className="p-4 p-md-5">
                <h4 className="fw-bold mb-1">Get in Touch</h4>
                <p className="text-white-50 mb-4">
                  Reach us through any of the channels below.
                </p>

                <Stack gap={4}>
                  {info.map((item, i) => (
                    <div key={i} className="d-flex align-items-center gap-3">
                      <div
                        className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: 46, height: 46 }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <small className="text-white-50 d-block">
                          {item.label}
                        </small>
                        <span className="fw-semibold">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </Stack>
              </Card.Body>
            </Card>
          </Col>

          {/* Message form */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h4 className="fw-bold mb-1">Send a Message</h4>
                <p className="text-muted mb-4">
                  Fill out the form and we&apos;ll respond as soon as possible.
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
                    <Col sm={6}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Name
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
                          placeholder="Enter your name"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col sm={6}>
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
                          placeholder="Enter your email"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col xs={12}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Message
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger align-items-start pt-2">
                          <FaCommentDots />
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Enter your message"
                          required
                        />
                      </InputGroup>
                    </Col>
                  </Row>

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
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Contact;
