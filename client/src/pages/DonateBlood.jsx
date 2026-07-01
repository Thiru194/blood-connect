import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
  InputGroup,
  Badge,
  Stack,
} from "react-bootstrap";
import {
  FaTint,
  FaHospital,
  FaCalendarAlt,
  FaCity,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaClock,
  FaUserShield,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createDonation } from "../services/donationService";

function DonateBlood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospital: "",
    donationDate: "",
    bloodGroup: "",
    unitsDonated: "",
    city: "",
  });

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
      const token = localStorage.getItem("token");

      const response = await createDonation(formData, token);

      console.log(response);

      setFeedback({
        type: "success",
        message:
          "Donation submitted successfully. Thank you for saving lives! ❤️",
      });

      setFormData({
        hospital: "",
        donationDate: "",
        bloodGroup: "",
        unitsDonated: "",
        city: "",
      });

      // Show the new donation and updated eligibility on the profile
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.log(error);

      setFeedback({
        type: "danger",
        message:
          error.response?.data?.message || "Donation Failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    {
      icon: <FaHandHoldingHeart />,
      title: "Save up to 3 lives",
      text: "A single donation can help multiple patients in need.",
    },
    {
      icon: <FaClock />,
      title: "Takes only 15 minutes",
      text: "A quick, safe and simple process from start to finish.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Good for your health",
      text: "Regular donation supports healthy blood circulation.",
    },
    {
      icon: <FaUserShield />,
      title: "Safe & confidential",
      text: "Your details are kept private and secure at all times.",
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
            <FaTint /> Every Drop Counts
          </Badge>
          <h1 className="fw-bold display-5 mb-2">Donate Blood, Give Life</h1>
          <p className="lead text-white-50 mb-0 mx-auto" style={{ maxWidth: 560 }}>
            Fill in your donation details below and become someone&apos;s hero
            today.
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-5">
        <Row className="g-4 justify-content-center">
          {/* Info panel */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm rounded-4 bg-danger text-white h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-1">Why Donate?</h4>
                <p className="text-white-50 mb-4">
                  Your contribution matters more than you know.
                </p>

                <Stack gap={3}>
                  {perks.map((perk, i) => (
                    <div key={i} className="d-flex align-items-start gap-3">
                      <div
                        className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: 42, height: 42 }}
                      >
                        {perk.icon}
                      </div>
                      <div>
                        <div className="fw-semibold">{perk.title}</div>
                        <small className="text-white-50">{perk.text}</small>
                      </div>
                    </div>
                  ))}
                </Stack>
              </Card.Body>
            </Card>
          </Col>

          {/* Form */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h2 className="fw-bold mb-1">Donation Details</h2>
                <p className="text-muted mb-4">
                  Please provide accurate information about your donation.
                </p>

                {feedback && (
                  <Alert
                    variant={feedback.type}
                    onClose={() => setFeedback(null)}
                    dismissible
                    className="d-flex align-items-center gap-2"
                  >
                    <FaCheckCircle />
                    {feedback.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Hospital Name
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaHospital />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="hospital"
                          value={formData.hospital}
                          onChange={handleChange}
                          placeholder="Enter hospital name"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Donation Date
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="donationDate"
                          value={formData.donationDate}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>

                    <Col sm={6} md={4}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Blood Group
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaTint />
                        </InputGroup.Text>
                        <Form.Select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Group</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                          <option>O+</option>
                          <option>O-</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col sm={6} md={4}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Units Donated
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaHeartbeat />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="unitsDonated"
                          value={formData.unitsDonated}
                          onChange={handleChange}
                          placeholder="e.g. 1"
                          min="1"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col md={4}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        City
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaCity />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter city"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaTint /> Submit Donation
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

export default DonateBlood;
