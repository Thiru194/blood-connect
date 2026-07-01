import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Alert,
  Spinner,
  InputGroup,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaTint,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaWeight,
  FaCalendarAlt,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaHeartbeat,
  FaUserShield,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { applyDonor } from "../services/donorService";

import {
  getDonorEligibility,
  formatDonationDate,
} from "../utils/donorEligibility";

function ApplyDonor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    bloodGroup: "",
    city: "",
    age: "",
    gender: "",
    weight: "",
    lastDonationDate: "",
    available: true,
  });

  const [neverDonated, setNeverDonated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const eligibility = getDonorEligibility(
    neverDonated ? null : formData.lastDonationDate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!neverDonated && !formData.lastDonationDate) {
      setFeedback({
        type: "danger",
        message:
          "Please enter your last donation date, or tick \"Never donated\".",
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const token = localStorage.getItem("token");
      await applyDonor(
        {
          ...formData,
          lastDonationDate: neverDonated ? "" : formData.lastDonationDate,
        },
        token
      );

      setFeedback({
        type: "success",
        message:
          "Thank you! Your donor application has been submitted successfully.",
      });

      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.log(error);
      setFeedback({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Application failed. Please try again.",
      });
      setLoading(false);
    }
  };

  const perks = [
    {
      icon: <FaHandHoldingHeart />,
      title: "Save up to 3 lives",
      text: "One donation can help multiple patients in need.",
    },
    {
      icon: <FaUserShield />,
      title: "Safe & confidential",
      text: "Your details stay private and secure at all times.",
    },
    {
      icon: <FaClock />,
      title: "Get notified instantly",
      text: "Receive requests that match your blood group nearby.",
    },
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="bg-danger text-white text-center py-5">
        <Container>
          <Badge
            bg="light"
            text="danger"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
          >
            <FaHeartbeat /> Become a Donor
          </Badge>
          <h1 className="fw-bold display-5 mb-2">Apply for Donor</h1>
          <p
            className="lead text-white-50 mb-0 mx-auto"
            style={{ maxWidth: 560 }}
          >
            Complete your donor profile and join our community of life savers.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        <Row className="g-4 justify-content-center">
          {/* Info panel */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm rounded-4 bg-danger text-white h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-1">Why Become a Donor?</h4>
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
                <h2 className="fw-bold mb-1">Donor Details</h2>
                <p className="text-muted mb-4">
                  Please provide accurate information for your donor profile.
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
                        Phone Number
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaPhone />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6}>
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

                    <Col md={6}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        City
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaMapMarkerAlt />
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

                    <Col sm={6} md={3}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Age
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaBirthdayCake />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Age"
                          min="18"
                          max="65"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col sm={6} md={3}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Gender
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaVenusMars />
                        </InputGroup.Text>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Weight (kg)
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaWeight />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          placeholder="e.g. 60"
                          min="45"
                          required
                        />
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">
                        Last Donation Date
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="lastDonationDate"
                          value={formData.lastDonationDate}
                          onChange={handleChange}
                          max={new Date().toISOString().slice(0, 10)}
                          disabled={neverDonated}
                          required={!neverDonated}
                        />
                      </InputGroup>
                      <Form.Check
                        type="checkbox"
                        id="never-donated"
                        label="I have never donated before (NIL)"
                        className="mt-2"
                        checked={neverDonated}
                        onChange={(e) => setNeverDonated(e.target.checked)}
                      />
                    </Col>

                    {/* Eligibility preview */}
                    {(neverDonated || formData.lastDonationDate) && (
                      <Col xs={12}>
                        <Alert
                          variant={eligibility.eligible ? "success" : "warning"}
                          className="d-flex align-items-center gap-2 mb-0"
                        >
                          <FaCheckCircle />
                          {eligibility.neverDonated
                            ? "You are eligible to donate."
                            : eligibility.eligible
                            ? `Eligible to donate (last donated ${eligibility.daysSince} days ago).`
                            : `Not eligible yet — ${eligibility.daysRemaining} day(s) left. You can donate from ${formatDonationDate(
                                eligibility.nextEligibleDate
                              )}.`}
                        </Alert>
                      </Col>
                    )}

                    <Col xs={12}>
                      <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-between">
                        <div>
                          <div className="fw-semibold">
                            Available to donate
                          </div>
                          <small className="text-muted">
                            Turn off if you're temporarily unavailable.
                          </small>
                        </div>
                        <Form.Check
                          type="switch"
                          id="available-switch"
                          name="available"
                          checked={formData.available}
                          onChange={handleChange}
                        />
                      </div>
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
                        <FaHandHoldingHeart /> Submit Application
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

export default ApplyDonor;
