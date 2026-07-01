import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTint,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaWeight,
  FaCalendarAlt,
  FaUserShield,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaClipboardList,
  FaInbox,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProfile, updateProfile } from "../services/profileService";

import { getMyRequests } from "../services/requestService";

import { getMyDonations } from "../services/donationService";

import {
  getDonorEligibility,
  formatDonationDate,
} from "../utils/donorEligibility";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "",
    age: "",
    gender: "",
    weight: "",
    lastDonationDate: "",
    available: true,
    isDonor: false,
    role: "",
  });

  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [neverDonated, setNeverDonated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }

  useEffect(() => {
    fetchProfile();
    fetchMyRequests();
    fetchMyDonations();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getProfile(token);
      setUser({ ...data.user });
      setNeverDonated(!data.user.lastDonationDate);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getMyRequests(token);
      setRequests(data.requests || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getMyDonations(token);
      setDonations(data.donations || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.isDonor && !neverDonated && !user.lastDonationDate) {
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

      await updateProfile(
        {
          name: user.name,
          phone: user.phone,
          bloodGroup: user.bloodGroup,
          city: user.city,
          age: user.age,
          gender: user.gender,
          weight: user.weight,
          lastDonationDate: neverDonated ? "" : user.lastDonationDate,
          available: user.available,
        },
        token
      );

      setFeedback({
        type: "success",
        message: "Profile updated successfully.",
      });

      fetchProfile();
    } catch (error) {
      console.log(error);
      setFeedback({
        type: "danger",
        message: error.response?.data?.message || "Update Failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const toDateInput = (d) => (d ? String(d).slice(0, 10) : "");

  const eligibility = getDonorEligibility(
    neverDonated ? null : user.lastDonationDate
  );

  const statusVariant = (status = "") => {
    switch (status) {
      case "Approved":
        return { bg: "info-subtle", text: "info" };
      case "Completed":
        return { bg: "success-subtle", text: "success" };
      case "Rejected":
      case "Cancelled":
        return { bg: "danger-subtle", text: "danger" };
      default:
        return { bg: "warning-subtle", text: "warning" };
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero / profile header */}
      <div className="bg-danger text-white py-5">
        <Container>
          <div className="d-flex flex-column flex-sm-row align-items-center gap-3 text-center text-sm-start">
            <div
              className="bg-white text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{ width: 80, height: 80, fontSize: "1.75rem" }}
            >
              {getInitials(user.name) || <FaUser />}
            </div>
            <div className="flex-grow-1">
              <h1 className="fw-bold mb-1">{user.name || "My Profile"}</h1>
              <p className="text-white-50 mb-2">{user.email}</p>
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-sm-start">
                <Badge bg="light" text="danger" className="rounded-pill text-capitalize">
                  <FaUserShield className="me-1" /> {user.role || "donor"}
                </Badge>
                {user.isDonor ? (
                  <Badge bg="light" text="success" className="rounded-pill">
                    <FaCheckCircle className="me-1" /> Registered Donor
                  </Badge>
                ) : (
                  <Badge bg="warning" text="dark" className="rounded-pill">
                    Not a donor yet
                  </Badge>
                )}
                {user.isDonor && (
                  <Badge
                    bg={user.available ? "success" : "secondary"}
                    className="rounded-pill"
                  >
                    {user.available ? "Available" : "Unavailable"}
                  </Badge>
                )}
                {user.isDonor && (
                  <Badge
                    bg={eligibility.eligible ? "light" : "warning"}
                    text={eligibility.eligible ? "success" : "dark"}
                    className="rounded-pill"
                  >
                    {eligibility.eligible
                      ? "Eligible to donate"
                      : `Eligible in ${eligibility.daysRemaining}d`}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {/* Become a donor prompt */}
        {!user.isDonor && (
          <Alert
            variant="danger"
            className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 rounded-4"
          >
            <span>
              <FaHandHoldingHeart className="me-2" />
              You haven&apos;t applied as a donor yet. Complete your donor
              profile to start saving lives.
            </span>
            <Button
              as={Link}
              to="/apply-donor"
              variant="danger"
              className="rounded-pill fw-semibold flex-shrink-0"
            >
              Apply as Donor
            </Button>
          </Alert>
        )}

        <Row className="g-4">
          {/* Edit profile */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h4 className="fw-bold mb-1">Profile Details</h4>
                <p className="text-muted mb-4">
                  Keep your information up to date.
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
                        Full Name
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white text-danger">
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          value={user.name || ""}
                          onChange={handleChange}
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
                          value={user.email || ""}
                          readOnly
                          className="bg-light"
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
                          value={user.phone || ""}
                          onChange={handleChange}
                          placeholder="Enter phone number"
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
                          value={user.bloodGroup || ""}
                          onChange={handleChange}
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
                          value={user.city || ""}
                          onChange={handleChange}
                          placeholder="Enter city"
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
                          value={user.age || ""}
                          onChange={handleChange}
                          min="18"
                          max="65"
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
                          value={user.gender || ""}
                          onChange={handleChange}
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
                          value={user.weight || ""}
                          onChange={handleChange}
                          min="45"
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
                          value={toDateInput(user.lastDonationDate)}
                          onChange={handleChange}
                          max={new Date().toISOString().slice(0, 10)}
                          disabled={neverDonated}
                        />
                      </InputGroup>
                      <Form.Check
                        type="checkbox"
                        id="profile-never-donated"
                        label="Never donated (NIL)"
                        className="mt-2"
                        checked={neverDonated}
                        onChange={(e) => setNeverDonated(e.target.checked)}
                      />
                    </Col>

                    {user.isDonor && (
                      <Col xs={12}>
                        <Alert
                          variant={
                            eligibility.eligible ? "success" : "warning"
                          }
                          className="d-flex align-items-center gap-2 mb-0"
                        >
                          <FaCheckCircle />
                          {eligibility.neverDonated
                            ? "You're eligible to donate."
                            : eligibility.eligible
                            ? `Eligible to donate — last donated on ${formatDonationDate(
                                user.lastDonationDate
                              )} (${eligibility.daysSince} days ago).`
                            : `Not eligible yet — ${eligibility.daysRemaining} day(s) left. Eligible from ${formatDonationDate(
                                eligibility.nextEligibleDate
                              )}.`}
                        </Alert>
                      </Col>
                    )}

                    <Col xs={12}>
                      <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-between">
                        <div>
                          <div className="fw-semibold">Available to donate</div>
                          <small className="text-muted">
                            Turn off if you&apos;re temporarily unavailable.
                          </small>
                        </div>
                        <Form.Check
                          type="switch"
                          id="available-switch"
                          name="available"
                          checked={!!user.available}
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
                        Saving...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* My requests */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaClipboardList className="text-danger" />
                    <h5 className="fw-bold mb-0">My Blood Requests</h5>
                  </div>
                  {requests.length > 0 && (
                    <Badge bg="danger-subtle" text="danger" className="rounded-pill">
                      {requests.length}
                    </Badge>
                  )}
                </div>

                {requests.length > 0 ? (
                  <Table responsive hover className="align-middle mb-0">
                    <thead className="text-secondary">
                      <tr>
                        <th>Patient</th>
                        <th>Blood</th>
                        <th>Units</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => {
                        const sv = statusVariant(request.status);
                        return (
                          <tr
                            key={request._id}
                            onClick={() =>
                              navigate(`/requests/${request._id}`)
                            }
                            style={{ cursor: "pointer" }}
                            title="View request details"
                          >
                            <td className="fw-semibold text-danger">
                              {request.patientName}
                            </td>
                            <td>
                              <Badge bg="danger" className="rounded-3">
                                {request.bloodGroup}
                              </Badge>
                            </td>
                            <td>{request.unitsRequired}</td>
                            <td>
                              <Badge
                                bg={sv.bg}
                                text={sv.text}
                                className="rounded-pill"
                              >
                                {request.status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div className="text-center text-muted py-5">
                    <FaInbox size={38} className="text-danger-subtle mb-3" />
                    <p className="mb-0">No requests yet.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* My Donations */}
        <Card className="border-0 shadow-sm rounded-4 mt-4">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <FaTint className="text-danger" />
                <h5 className="fw-bold mb-0">My Donations</h5>
              </div>
              {donations.length > 0 && (
                <Badge bg="danger-subtle" text="danger" className="rounded-pill">
                  {donations.length}
                </Badge>
              )}
            </div>

            {donations.length > 0 ? (
              <Table responsive hover className="align-middle mb-0">
                <thead className="text-secondary">
                  <tr>
                    <th>Date</th>
                    <th>Hospital</th>
                    <th>City</th>
                    <th>Blood</th>
                    <th>Units</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id}>
                      <td>{formatDonationDate(donation.donationDate)}</td>
                      <td>{donation.hospital}</td>
                      <td>{donation.city}</td>
                      <td>
                        <Badge bg="danger" className="rounded-3">
                          {donation.bloodGroup}
                        </Badge>
                      </td>
                      <td>{donation.unitsDonated}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center text-muted py-5">
                <FaInbox size={38} className="text-danger-subtle mb-3" />
                <p className="mb-2">No donations logged yet.</p>
                <Button
                  as={Link}
                  to="/donate"
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill fw-semibold"
                >
                  <FaHandHoldingHeart className="me-2" />
                  Donate Blood
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}

export default Profile;
