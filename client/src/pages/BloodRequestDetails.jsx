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
  FaHospital,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowLeft,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getRequestById } from "../services/requestService";

function BloodRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getRequestById(id, token);
        setRequest(data.request);
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.message || "Unable to load request details."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

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

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const requester = request?.requestedBy;

  // Prefer the contact entered on the request itself; fall back to the account.
  const contactName = requester?.name || request?.patientName;
  const contactPhone = request?.phone || requester?.phone;
  const contactEmail = request?.email || requester?.email;
  const contactCity = request?.city || requester?.city;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="bg-danger text-white py-5">
        <Container>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="text-white text-decoration-none p-0 mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft /> Back
          </Button>
          <h1 className="fw-bold display-6 mb-1">Blood Request Details</h1>
          <p className="text-white-50 mb-0">
            Full information about this blood request and the requester.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {loading ? (
          <div className="text-center text-muted py-5">
            <Spinner animation="border" variant="danger" className="mb-3" />
            <p className="mb-0">Loading request...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="rounded-4">
            {error}
          </Alert>
        ) : (
          <Row className="g-4 justify-content-center">
            {/* Request details */}
            <Col lg={7}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <FaClipboardList className="text-danger" />
                      <h4 className="fw-bold mb-0">Request Information</h4>
                    </div>
                    <Badge
                      bg={statusVariant(request.status).bg}
                      text={statusVariant(request.status).text}
                      className="rounded-pill px-3 py-2"
                    >
                      {request.status}
                    </Badge>
                  </div>

                  <Row className="g-4">
                    <Col sm={6}>
                      <small className="text-muted d-flex align-items-center gap-2">
                        <FaUser /> Patient Name
                      </small>
                      <div className="fw-semibold fs-5">
                        {request.patientName}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <small className="text-muted d-flex align-items-center gap-2">
                        <FaTint /> Blood Group
                      </small>
                      <Badge bg="danger" className="rounded-3 px-3 py-2 fs-6 mt-1">
                        {request.bloodGroup}
                      </Badge>
                    </Col>
                    <Col sm={6}>
                      <small className="text-muted d-flex align-items-center gap-2">
                        <FaHeartbeat /> Units Required
                      </small>
                      <div className="fw-semibold fs-5">
                        {request.unitsRequired}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <small className="text-muted d-flex align-items-center gap-2">
                        <FaHospital /> Hospital
                      </small>
                      <div className="fw-semibold fs-5">{request.hospital}</div>
                    </Col>
                    <Col sm={6}>
                      <small className="text-muted d-flex align-items-center gap-2">
                        <FaMapMarkerAlt /> City
                      </small>
                      <div className="fw-semibold fs-5">{request.city}</div>
                    </Col>
                    <Col sm={6}>
                      <small className="text-muted d-flex align-items-center gap-2">
                        <FaCalendarAlt /> Requested On
                      </small>
                      <div className="fw-semibold fs-5">
                        {formatDate(request.createdAt)}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact for this request */}
            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-4">Contact for this Request</h4>

                  {contactPhone || contactEmail ? (
                    <>
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div
                          className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                          style={{ width: 60, height: 60, fontSize: "1.3rem" }}
                        >
                          {getInitials(contactName)}
                        </div>
                        <div>
                          <h5 className="fw-bold mb-0">{contactName}</h5>
                          <Badge bg="danger" className="rounded-3 mt-1">
                            Needs {request.bloodGroup}
                          </Badge>
                        </div>
                      </div>

                      <ul className="list-unstyled mb-4">
                        {contactEmail && (
                          <li className="d-flex align-items-center gap-3 mb-3">
                            <span className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }}>
                              <FaEnvelope />
                            </span>
                            <span className="text-break">{contactEmail}</span>
                          </li>
                        )}
                        {contactPhone && (
                          <li className="d-flex align-items-center gap-3 mb-3">
                            <span className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }}>
                              <FaPhoneAlt />
                            </span>
                            <span>{contactPhone}</span>
                          </li>
                        )}
                        {contactCity && (
                          <li className="d-flex align-items-center gap-3">
                            <span className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }}>
                              <FaMapMarkerAlt />
                            </span>
                            <span>{contactCity}</span>
                          </li>
                        )}
                      </ul>

                      <div className="d-grid gap-2">
                        {contactPhone && (
                          <Button
                            as="a"
                            href={`tel:${contactPhone}`}
                            variant="danger"
                            className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                          >
                            <FaPhoneAlt /> Call Now
                          </Button>
                        )}
                        {contactEmail && (
                          <Button
                            as="a"
                            href={`mailto:${contactEmail}`}
                            variant="outline-danger"
                            className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                          >
                            <FaEnvelope /> Send Email
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-muted mb-0">
                      No contact details are available for this request.
                    </p>
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

export default BloodRequestDetails;
