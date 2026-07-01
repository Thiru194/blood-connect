import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaHospital,
  FaHandshake,
  FaBolt,
  FaArrowRight,
  FaTint,
} from "react-icons/fa";

import "./home-sections.css";

function WhyDonate() {
  const benefits = [
    {
      id: 1,
      icon: <FaHeart />,
      title: "Save Up to 3 Lives",
      description:
        "Your single donation can save up to three lives through blood components.",
    },
    {
      id: 2,
      icon: <FaHospital />,
      title: "Support Hospitals",
      description:
        "Help medical facilities maintain adequate blood supply for critical procedures.",
    },
    {
      id: 3,
      icon: <FaHandshake />,
      title: "Improve Community Health",
      description:
        "Build a healthier community by contributing to emergency blood reserves.",
    },
    {
      id: 4,
      icon: <FaBolt />,
      title: "Help Accident Victims",
      description:
        "Provide immediate help during emergencies and accidents when lives depend on it.",
    },
  ];

  const stats = [
    { number: "10", label: "Minutes", desc: "to donate" },
    { number: "3", label: "Lives", desc: "per donation" },
    { number: "42", label: "Days", desc: "wait time" },
    { number: "365", label: "Days", desc: "blood shelf life" },
  ];

  return (
    <section className="py-5 bg-light">
      <Container className="py-3">
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge
              bg="danger-subtle"
              text="danger"
              className="mb-3 px-3 py-2 rounded-pill"
            >
              Why It Matters
            </Badge>
            <h2 className="section-heading mb-3">Why Donate Blood?</h2>
            <p className="text-muted">
              Every donation is a lifesaving gift. Be a hero and make a
              difference in someone&apos;s life today.
            </p>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="align-items-center g-4 g-lg-5 mb-5">
          {/* Image Column */}
          <Col lg={5} md={6}>
            <div className="position-relative">
              <img
                src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-2787.jpg"
                alt="Blood Donation"
                className="img-fluid rounded-4 shadow-sm w-100"
              />
              <Card
                className="border-0 shadow position-absolute bottom-0 end-0 m-3 rounded-4 bg-danger text-white text-center"
                style={{ width: 110 }}
              >
                <Card.Body className="p-3">
                  <div className="fs-4 fw-bold lh-1">1M+</div>
                  <small className="text-white-50">Lives Saved</small>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Content Column */}
          <Col lg={7} md={6}>
            <h3 className="fw-bold mb-3 text-danger">Make a Real Difference</h3>
            <p className="text-muted mb-4">
              Blood donation is a simple yet powerful way to help save lives.
              Every single donation you make can assist patients with injuries,
              illnesses, or medical conditions. Your contribution is vital during
              emergencies, surgeries, and ongoing medical treatments.
            </p>

            {/* Key Stats */}
            <Row className="g-3">
              {stats.map((stat, i) => (
                <Col xs={6} sm={3} key={i}>
                  <Card className="lift-card border-0 shadow-sm rounded-4 h-100 text-center">
                    <Card.Body className="p-3">
                      <div className="fs-3 fw-bold text-danger lh-1">
                        {stat.number}
                      </div>
                      <div className="fw-semibold small">{stat.label}</div>
                      <small className="text-muted">{stat.desc}</small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Benefits Cards */}
        <Row className="g-4">
          {benefits.map((benefit) => (
            <Col lg={6} key={benefit.id}>
              <Card className="lift-card border-0 shadow-sm rounded-4 h-100">
                <Card.Body className="p-4 d-flex align-items-start gap-3">
                  <div
                    className="section-icon bg-danger-subtle text-danger rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 fs-4"
                    style={{ width: 60, height: 60 }}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{benefit.title}</h5>
                    <p className="text-muted mb-2">{benefit.description}</p>
                    <span className="text-danger fw-semibold small d-inline-flex align-items-center gap-1">
                      Learn more <FaArrowRight size={11} />
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <Row className="mt-5">
          <Col lg={10} className="mx-auto">
            <Card
              className="cta-panel border-0 shadow-sm rounded-4 text-white"
              style={{
                background: "linear-gradient(135deg, #CC1036 0%, #7A1062 100%)",
              }}
            >
              <Card.Body className="p-4 p-md-5 text-center">
                <h4 className="fw-bold mb-2">Ready to Save Lives?</h4>
                <p className="text-white opacity-75 mb-4 mx-auto" style={{ maxWidth: 640 }}>
                  Join thousands of donors who have already made a difference.
                  Your donation takes just 10 minutes and can save up to 3 lives.
                </p>
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="lg"
                  className="text-danger fw-bold rounded-pill px-4 d-inline-flex align-items-center gap-2"
                >
                  <FaTint /> Start Your Journey
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default WhyDonate;
