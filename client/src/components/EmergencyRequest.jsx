import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaBullseye,
  FaRocket,
  FaCheck,
  FaPhoneAlt,
  FaWhatsapp,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaExclamationTriangle,
  FaFirstAid,
} from "react-icons/fa";

import "./home-sections.css";

function EmergencyRequest() {
  const [donorCount, setDonorCount] = useState(0);

  useEffect(() => {
    if (donorCount < 1000) {
      const timer = setTimeout(() => setDonorCount(donorCount + 20), 20);
      return () => clearTimeout(timer);
    }
  }, [donorCount]);

  const emergencyInfo = [
    {
      icon: <FaBolt />,
      title: "Instant Connection",
      description: "Connect with available donors in real-time.",
    },
    {
      icon: <FaBullseye />,
      title: "Blood Type Match",
      description: "Find compatible blood types instantly.",
    },
    {
      icon: <FaRocket />,
      title: "Fast Response",
      description: "Get results within minutes, not hours.",
    },
  ];

  const features = [
    "24/7 availability across the network",
    "Verified and tested blood units",
    "Rapid matching and delivery",
  ];

  const visualStats = [
    { icon: <FaClock />, label: "Response Time", value: "<2 min" },
    {
      icon: <FaUsers />,
      label: "Active Donors",
      value: `${Math.min(donorCount, 1000)}+`,
    },
    { icon: <FaCheckCircle />, label: "Success Rate", value: "98%" },
  ];

  return (
    <section className="py-5 bg-light">
      <Container className="py-3">
        {/* Main Emergency Banner */}
        <Card
          className="border-0 shadow rounded-4 overflow-hidden text-white"
          style={{
            background: "linear-gradient(135deg, #CC1036 0%, #7A1062 100%)",
          }}
        >
          <Card.Body className="p-4 p-lg-5">
            <Row className="align-items-center g-4 g-lg-5">
              {/* Text side */}
              <Col lg={6} className="order-2 order-lg-1">
                <Badge
                  bg="light"
                  text="danger"
                  className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill fw-semibold"
                >
                  <FaExclamationTriangle /> URGENT REQUEST
                </Badge>

                <h2 className="section-heading mb-3">
                  Need Blood{" "}
                  <span className="text-warning">Urgently?</span>
                </h2>

                <p className="text-white opacity-75 mb-4">
                  Life-critical situations demand immediate action. Submit a blood
                  request and our network of donors will respond instantly.
                  Connect with available blood types in real-time.
                </p>

                {/* Features */}
                <ul className="list-unstyled mb-4">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="d-flex align-items-center gap-2 mb-2"
                    >
                      <span className="bg-white text-danger rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 22, height: 22 }}>
                        <FaCheck size={11} />
                      </span>
                      <span className="opacity-75">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="d-flex gap-2 gap-sm-3 flex-column flex-sm-row">
                  <Button
                    as={Link}
                    to="/requests"
                    variant="light"
                    size="lg"
                    className="text-danger fw-bold rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <FaFirstAid /> Request Blood Now
                  </Button>
                  <Button
                    as={Link}
                    to="/contact"
                    variant="outline-light"
                    size="lg"
                    className="fw-bold rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <FaPhoneAlt /> Call for Help
                  </Button>
                </div>
              </Col>

              {/* Visual side */}
              <Col lg={6} className="order-1 order-lg-2">
                <div className="text-center mb-4">
                  <div
                    className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: 130, height: 130 }}
                  >
                    <div
                      className="bg-white text-danger rounded-circle d-flex align-items-center justify-content-center fs-1"
                      style={{ width: 90, height: 90 }}
                    >
                      <FaFirstAid />
                    </div>
                  </div>
                </div>

                <Row className="g-3">
                  {visualStats.map((stat, i) => (
                    <Col xs={4} key={i}>
                      <Card className="border-0 bg-white bg-opacity-10 text-white text-center rounded-4 h-100">
                        <Card.Body className="p-3">
                          <div className="fs-4 mb-1">{stat.icon}</div>
                          <div className="fw-bold">{stat.value}</div>
                          <small className="opacity-75 d-block lh-sm">
                            {stat.label}
                          </small>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Benefits Section */}
        <Row className="g-3 g-lg-4 mt-4">
          {emergencyInfo.map((info, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="lift-card border-0 shadow-sm rounded-4 h-100">
                <Card.Body className="p-4">
                  <div
                    className="section-icon bg-danger-subtle text-danger rounded-4 d-flex align-items-center justify-content-center fs-4 mb-3"
                    style={{ width: 60, height: 60 }}
                  >
                    {info.icon}
                  </div>
                  <h5 className="fw-bold mb-1">{info.title}</h5>
                  <p className="text-muted mb-2">{info.description}</p>
                  <span className="text-danger fw-semibold small d-inline-flex align-items-center gap-1">
                    Learn more <FaArrowRight size={11} />
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Emergency Hotline */}
        <Card className="border-0 shadow-sm rounded-4 mt-4">
          <Card.Body className="p-4 p-sm-5">
            <Row className="align-items-center g-4">
              <Col md={5}>
                <h4 className="fw-bold mb-2">Can&apos;t Wait?</h4>
                <p className="text-muted mb-0">
                  Our dedicated emergency team is available 24/7 to assist you
                  immediately.
                </p>
              </Col>
              <Col md={7}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Card className="border-0 bg-light rounded-4 h-100">
                      <Card.Body className="d-flex align-items-center gap-3 p-3">
                        <div
                          className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: 46, height: 46 }}
                        >
                          <FaPhoneAlt />
                        </div>
                        <div>
                          <small className="text-muted d-block">Emergency</small>
                          <span className="fw-bold">1-800-BLOOD-911</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card className="border-0 bg-light rounded-4 h-100">
                      <Card.Body className="d-flex align-items-center gap-3 p-3">
                        <div
                          className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: 46, height: 46 }}
                        >
                          <FaWhatsapp />
                        </div>
                        <div>
                          <small className="text-muted d-block">WhatsApp</small>
                          <span className="fw-bold">+1-555-BLOOD-HELP</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default EmergencyRequest;
