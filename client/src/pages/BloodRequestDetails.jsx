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
  FaCopy,
  FaCheck,
  FaShareAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getRequestById } from "../services/requestService";

import "./BloodRequestDetails.css";

function BloodRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null); // which field was just copied
  const [shareMsg, setShareMsg] = useState(null);

  // Copy a value to the clipboard and briefly flag which one was copied.
  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  // Share the request via the native share sheet, or fall back to copying the link.
  const handleShare = async () => {
    const shareData = {
      title: "BloodConnect - Blood Request",
      text: "A blood request on BloodConnect needs help.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMsg("Link copied!");
        setTimeout(() => setShareMsg(null), 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="rd-hero text-white py-5">
        <Container>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="rd-back-btn text-decoration-none p-0 mb-3 d-inline-flex align-items-center gap-2"
          >
            <FaArrowLeft /> Back
          </Button>

          <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4">
            {request && (
              <div className="rd-blood-badge">{request.bloodGroup}</div>
            )}
            <div className="flex-grow-1">
              <h1 className="rd-hero-title mb-1">
                {request ? `${request.patientName}` : "Blood Request Details"}
              </h1>
              <p className="text-white opacity-75 mb-0">
                {request
                  ? `Needs ${request.unitsRequired} unit${
                      request.unitsRequired > 1 ? "s" : ""
                    } of ${request.bloodGroup}${
                      request.city ? ` in ${request.city}` : ""
                    }`
                  : "Full information about this blood request and the requester."}
              </p>
            </div>
            {request && (
              <div className="d-flex align-items-center gap-2">
                <Badge
                  bg="light"
                  text={statusVariant(request.status).text}
                  className="rounded-pill px-3 py-2 fw-semibold"
                >
                  {request.status}
                </Badge>
                <Button
                  onClick={handleShare}
                  variant="light"
                  className="rd-action-btn text-danger fw-semibold d-inline-flex align-items-center gap-2"
                >
                  <FaShareAlt /> {shareMsg || "Share"}
                </Button>
              </div>
            )}
          </div>
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
              <Card className="rd-card border-0 shadow-sm h-100">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <FaClipboardList className="text-danger" />
                    <h4 className="fw-bold mb-0">Request Information</h4>
                  </div>

                  <Row className="g-3">
                    {[
                      {
                        icon: <FaUser />,
                        label: "Patient Name",
                        value: request.patientName,
                      },
                      {
                        icon: <FaTint />,
                        label: "Blood Group",
                        value: request.bloodGroup,
                      },
                      {
                        icon: <FaHeartbeat />,
                        label: "Units Required",
                        value: `${request.unitsRequired} unit${
                          request.unitsRequired > 1 ? "s" : ""
                        }`,
                      },
                      {
                        icon: <FaHospital />,
                        label: "Hospital",
                        value: request.hospital || "—",
                      },
                      {
                        icon: <FaMapMarkerAlt />,
                        label: "City",
                        value: request.city || "—",
                      },
                      {
                        icon: <FaCalendarAlt />,
                        label: "Requested On",
                        value: formatDate(request.createdAt),
                      },
                    ].map((item, i) => (
                      <Col sm={6} key={i}>
                        <div className="rd-tile d-flex align-items-start gap-3">
                          <span className="rd-tile-icon">{item.icon}</span>
                          <div className="min-w-0">
                            <div className="rd-tile-label">{item.label}</div>
                            <div className="rd-tile-value">{item.value}</div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact for this request */}
            <Col lg={5}>
              <Card className="rd-contact-card rd-contact-sticky border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-4">Contact for this Request</h4>

                  {contactPhone || contactEmail ? (
                    <>
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="rd-avatar">
                          {getInitials(contactName)}
                        </div>
                        <div className="min-w-0">
                          <h5 className="fw-bold mb-1 text-truncate">
                            {contactName}
                          </h5>
                          <Badge bg="danger" className="rounded-3">
                            Needs {request.bloodGroup}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        {contactPhone && (
                          <div className="rd-contact-row">
                            <span className="rd-contact-icon">
                              <FaPhoneAlt />
                            </span>
                            <div className="rd-contact-text">
                              <div className="label">Phone</div>
                              <div className="value">{contactPhone}</div>
                            </div>
                            <button
                              type="button"
                              className={`rd-copy-btn ${
                                copied === "phone" ? "copied" : ""
                              }`}
                              onClick={() =>
                                copyToClipboard(contactPhone, "phone")
                              }
                              title="Copy phone number"
                              aria-label="Copy phone number"
                            >
                              {copied === "phone" ? <FaCheck /> : <FaCopy />}
                            </button>
                          </div>
                        )}
                        {contactEmail && (
                          <div className="rd-contact-row">
                            <span className="rd-contact-icon">
                              <FaEnvelope />
                            </span>
                            <div className="rd-contact-text">
                              <div className="label">Email</div>
                              <div className="value">{contactEmail}</div>
                            </div>
                            <button
                              type="button"
                              className={`rd-copy-btn ${
                                copied === "email" ? "copied" : ""
                              }`}
                              onClick={() =>
                                copyToClipboard(contactEmail, "email")
                              }
                              title="Copy email address"
                              aria-label="Copy email address"
                            >
                              {copied === "email" ? <FaCheck /> : <FaCopy />}
                            </button>
                          </div>
                        )}
                        {contactCity && (
                          <div className="rd-contact-row">
                            <span className="rd-contact-icon">
                              <FaMapMarkerAlt />
                            </span>
                            <div className="rd-contact-text">
                              <div className="label">City</div>
                              <div className="value">{contactCity}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="d-grid gap-2">
                        {contactPhone && (
                          <Button
                            as="a"
                            href={`tel:${contactPhone}`}
                            variant="danger"
                            className="rd-action-btn fw-semibold d-flex align-items-center justify-content-center gap-2"
                          >
                            <FaPhoneAlt /> Call Now
                          </Button>
                        )}
                        {contactEmail && (
                          <Button
                            as="a"
                            href={`mailto:${contactEmail}`}
                            variant="outline-danger"
                            className="rd-action-btn fw-semibold d-flex align-items-center justify-content-center gap-2"
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
