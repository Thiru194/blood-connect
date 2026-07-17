import React, { useState, useEffect } from "react";

import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Badge,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaHospital,
  FaTint,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaPlusCircle,
  FaClipboardList,
  FaInbox,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createRequest, getRequests } from "../services/requestService";

import "./BloodRequests.css";

function BloodRequests() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    hospital: "",
    bloodGroup: "",
    unitsRequired: "",
    city: "",
    email: "",
    phone: "",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data.requests || []);
    } catch (error) {
      console.log(error);
    }
  };

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
      await createRequest(formData, token);

      setFeedback({
        type: "success",
        message: "Blood request submitted successfully.",
      });

      fetchRequests();

      setFormData({
        patientName: "",
        hospital: "",
        bloodGroup: "",
        unitsRequired: "",
        city: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);
      setFeedback({
        type: "danger",
        message: error.response?.data?.message || "Request Failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusVariant = (status = "") => {
    const s = status.toLowerCase();
    if (s.includes("fulfil") || s.includes("complete") || s.includes("approve"))
      return { bg: "success-subtle", text: "success" };
    if (s.includes("reject") || s.includes("cancel"))
      return { bg: "danger-subtle", text: "danger" };
    return { bg: "warning-subtle", text: "warning" };
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Live stats for the hero, derived from the loaded requests.
  const totalUnits = requests.reduce(
    (sum, r) => sum + (Number(r.unitsRequired) || 0),
    0
  );
  const cityCount = new Set(
    requests.map((r) => (r.city || "").trim().toLowerCase()).filter(Boolean)
  ).size;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="request-hero text-white text-center py-5">
        <Container className="pb-4">
          <Badge
            bg="light"
            text="danger"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill fw-semibold"
          >
            <FaTint /> Blood Requests
          </Badge>
          <h1 className="request-hero-title mb-2">Request Blood</h1>
          <p className="request-hero-sub text-white opacity-75 mb-4 mx-auto">
            Raise a request and reach available donors around you instantly.
          </p>

          <div className="request-hero-stats">
            <span className="request-stat-pill">
              <FaClipboardList />
              <span>
                <strong>{requests.length}</strong> Requests
              </span>
            </span>
            <span className="request-stat-pill">
              <FaTint />
              <span>
                <strong>{totalUnits}</strong> Units needed
              </span>
            </span>
            <span className="request-stat-pill">
              <FaMapMarkerAlt />
              <span>
                <strong>{cityCount}</strong> {cityCount === 1 ? "City" : "Cities"}
              </span>
            </span>
          </div>
        </Container>
      </div>

      <Container className="pb-5 flex-grow-1">
        <Row className="g-4">
          {/* Request form */}
          <Col xs={12}>
            <Card className="request-form-card border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex align-items-center gap-3 mb-1">
                  <span className="request-icon-chip">
                    <FaPlusCircle />
                  </span>
                  <div>
                    <h4 className="fw-bold mb-0">New Request</h4>
                    <p className="text-muted mb-0 small">
                      Fill in the patient and hospital details below.
                    </p>
                  </div>
                </div>
                <hr className="my-4" />

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
                        Requester Name
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="patientName"
                          value={formData.patientName}
                          onChange={handleChange}
                          placeholder="Enter name"
                          required
                        />
                      </InputGroup>
                    </Col>

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
                          <option value="">Select</option>
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
                        Units Required
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaHeartbeat />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="unitsRequired"
                          value={formData.unitsRequired}
                          onChange={handleChange}
                          placeholder="e.g. 2"
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

                    <Col md={6}>
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
                  </Row>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="request-submit-btn w-100 fw-bold mt-4 d-flex align-items-center justify-content-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaPlusCircle /> Submit Request
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Recent requests */}
          <Col xs={12}>
            <div className="d-flex align-items-center gap-2 mb-3 px-1">
              <FaClipboardList className="text-danger" />
              <h5 className="fw-bold mb-0">Recent Requests</h5>
              {requests.length > 0 && (
                <Badge bg="danger-subtle" text="danger" className="rounded-pill ms-1">
                  {requests.length}
                </Badge>
              )}
            </div>

            {requests.length > 0 ? (
              <Row className="g-3 g-md-4">
                {requests.map((request) => {
                  const sv = statusVariant(request.status);
                  return (
                    <Col md={6} xl={4} key={request._id}>
                      <Card
                        className={`request-card h-100 border-0 shadow-sm border-top border-4 border-${sv.text}`}
                        role="button"
                        onClick={() => navigate(`/requests/${request._id}`)}
                        style={{ cursor: "pointer" }}
                        title="View request & contact details"
                      >
                        <Card.Body className="p-4 d-flex flex-column">
                          {/* Top row */}
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="request-avatar">
                              {getInitials(request.patientName)}
                            </div>
                            <div className="flex-grow-1 min-w-0">
                              <div className="fw-bold text-truncate">
                                {request.patientName}
                              </div>
                              <Badge
                                bg={sv.bg}
                                text={sv.text}
                                className="rounded-pill text-capitalize"
                              >
                                {request.status}
                              </Badge>
                            </div>
                            <span className="request-bloodtag flex-shrink-0">
                              {request.bloodGroup}
                            </span>
                          </div>

                          {/* Meta */}
                          <div className="text-muted small mb-3">
                            <div className="d-flex align-items-center gap-2 py-1">
                              <FaHeartbeat size={13} className="text-danger" />
                              {request.unitsRequired} unit
                              {request.unitsRequired > 1 ? "s" : ""} needed
                            </div>
                            {request.city && (
                              <div className="d-flex align-items-center gap-2 py-1">
                                <FaMapMarkerAlt size={13} className="text-danger" />
                                {request.city}
                              </div>
                            )}
                            {request.hospital && (
                              <div className="d-flex align-items-center gap-2 py-1">
                                <FaHospital size={13} className="text-danger" />
                                <span className="text-truncate">
                                  {request.hospital}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Contact actions */}
                          <div className="d-flex flex-wrap gap-2 mt-auto">
                            {request.phone && (
                              <Button
                                as="a"
                                href={`tel:${request.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                variant="danger"
                                size="sm"
                                className="rounded-pill fw-semibold d-inline-flex align-items-center gap-2 flex-grow-1 justify-content-center"
                              >
                                <FaPhoneAlt size={11} /> Call
                              </Button>
                            )}
                            {request.email && (
                              <Button
                                as="a"
                                href={`mailto:${request.email}`}
                                onClick={(e) => e.stopPropagation()}
                                variant="outline-danger"
                                size="sm"
                                className="rounded-pill fw-semibold d-inline-flex align-items-center gap-2 flex-grow-1 justify-content-center"
                              >
                                <FaEnvelope size={11} /> Email
                              </Button>
                            )}
                            {!request.phone && !request.email && (
                              <small className="text-muted fst-italic">
                                No contact provided
                              </small>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="text-center text-muted py-5">
                  <FaInbox size={42} className="text-danger mb-3 opacity-50" />
                  <h5 className="fw-bold text-dark">No requests yet</h5>
                  <p className="mb-0">
                    Submit the form above to raise the first blood request.
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default BloodRequests;
