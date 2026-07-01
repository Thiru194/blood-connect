import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaTint,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowLeft,
  FaBirthdayCake,
  FaVenusMars,
  FaWeight,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDonorById } from "../services/donorService";

import {
  getDonorEligibility,
  formatDonationDate,
} from "../utils/donorEligibility";

function DonorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getDonorById(id, token);
        setDonor(data.donor);
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.message || "Unable to load donor details."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDonor();
  }, [id]);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const eligibility = donor
    ? getDonorEligibility(donor.lastDonationDate)
    : null;

  const details = donor
    ? [
        { icon: <FaMapMarkerAlt />, label: "City", value: donor.city || "—" },
        {
          icon: <FaBirthdayCake />,
          label: "Age",
          value: donor.age ? `${donor.age} years` : "—",
        },
        {
          icon: <FaVenusMars />,
          label: "Gender",
          value: donor.gender || "—",
        },
        {
          icon: <FaWeight />,
          label: "Weight",
          value: donor.weight ? `${donor.weight} kg` : "—",
        },
        {
          icon: <FaCalendarAlt />,
          label: "Last Donation",
          value: formatDonationDate(donor.lastDonationDate),
        },
      ]
    : [];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="bg-success text-white py-5">
        <Container>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="text-white text-decoration-none p-0 mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft /> Back to donors
          </Button>
          <h1 className="fw-bold display-6 mb-1">Donor Details</h1>
          <p className="text-white-50 mb-0">
            Full profile and contact information for this donor.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {loading ? (
          <div className="text-center text-muted py-5">
            <Spinner animation="border" variant="success" className="mb-3" />
            <p className="mb-0">Loading donor...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="rounded-4">
            {error}
          </Alert>
        ) : (
          <Row className="g-4 justify-content-center">
            {/* Profile card */}
            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center">
                <Card.Body className="p-4 p-md-5">
                  <div
                    className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
                    style={{ width: 90, height: 90, fontSize: "2rem" }}
                  >
                    {getInitials(donor.name)}
                  </div>

                  <h3 className="fw-bold mb-1">{donor.name}</h3>

                  <Badge bg="danger" className="fs-6 rounded-3 px-3 py-2 mb-3">
                    <FaTint className="me-1" /> {donor.bloodGroup || "—"}
                  </Badge>

                  <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                    {eligibility.eligible ? (
                      <Badge
                        bg="success-subtle"
                        text="success"
                        className="rounded-pill px-3 py-2"
                      >
                        <FaCheckCircle className="me-1" /> Eligible to donate
                      </Badge>
                    ) : (
                      <Badge
                        bg="warning-subtle"
                        text="dark"
                        className="rounded-pill px-3 py-2"
                      >
                        Eligible in {eligibility.daysRemaining} day(s)
                      </Badge>
                    )}
                    <Badge
                      bg={donor.available ? "success" : "secondary"}
                      className="rounded-pill px-3 py-2"
                    >
                      {donor.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <div className="d-grid gap-2">
                    {donor.phone && (
                      <Button
                        as="a"
                        href={`tel:${donor.phone}`}
                        variant="success"
                        className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaPhoneAlt /> Call {donor.phone}
                      </Button>
                    )}
                    {donor.email && (
                      <Button
                        as="a"
                        href={`mailto:${donor.email}`}
                        variant="outline-success"
                        className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaEnvelope /> Email Donor
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Info card */}
            <Col lg={7}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <FaUser className="text-success" />
                    <h4 className="fw-bold mb-0">Donor Information</h4>
                  </div>

                  <Row className="g-4">
                    {details.map((item, i) => (
                      <Col sm={6} key={i}>
                        <small className="text-muted d-flex align-items-center gap-2">
                          {item.icon} {item.label}
                        </small>
                        <div className="fw-semibold fs-5 text-capitalize">
                          {item.value}
                        </div>
                      </Col>
                    ))}
                    {donor.email && (
                      <Col xs={12}>
                        <small className="text-muted d-flex align-items-center gap-2">
                          <FaEnvelope /> Email
                        </small>
                        <div className="fw-semibold fs-5 text-break">
                          {donor.email}
                        </div>
                      </Col>
                    )}
                  </Row>

                  {!eligibility.eligible && (
                    <Alert variant="warning" className="mt-4 mb-0">
                      This donor recently donated and can next donate from{" "}
                      <strong>
                        {formatDonationDate(eligibility.nextEligibleDate)}
                      </strong>
                      .
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <Footer />
    </div>
  );
}

export default DonorDetails;
