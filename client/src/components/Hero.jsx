import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaTint,
  FaUsers,
  FaHospital,
  FaCheckCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "./Hero.css";

function Hero() {
  const { user } = useAuth();

  const stats = [
    { icon: <FaUsers />, number: "5,000+", label: "Donors" },
    { icon: <FaTint />, number: "12,000+", label: "Lives Saved" },
    { icon: <FaHospital />, number: "150+", label: "Hospitals" },
  ];

  const trust = ["100% Safe & Secure", "Verified Donors", "Free to Join"];

  // Send logged-in users straight into the app; new visitors to sign up.
  const donorLink = user ? "/apply-donor" : "/register";
  const donorLabel = user ? "Apply as Donor" : "Become a Donor";

  return (
    <section className="hero-section text-white py-5">
      {/* Decorative floating blood drops (hidden on mobile / reduced-motion) */}
      <FaTint className="hero-blob hero-blob--1" aria-hidden="true" />
      <FaTint className="hero-blob hero-blob--2" aria-hidden="true" />
      <FaTint className="hero-blob hero-blob--3" aria-hidden="true" />

      <Container className="py-3 py-lg-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} className="text-center hero-content">
            {/* Badge */}
            <Badge
              bg="light"
              text="danger"
              pill
              className="hero-badge d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 fw-semibold"
            >
              <FaHeartbeat className="hero-pulse" /> Join the life-saving mission
            </Badge>

            {/* Main Heading */}
            <h1 className="hero-title mb-4">
              Donate blood. Empower communities. Transform lives.
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-white opacity-75 mb-4 mx-auto px-2">
              BloodConnect makes it fast and simple to connect donors with people
              in urgent need. Every contribution brings hope and health to
              patients, families, and hospitals.
            </p>

            {/* Trust line */}
            <div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-4 mb-4">
              {trust.map((item, i) => (
                <span
                  key={i}
                  className="d-inline-flex align-items-center gap-2 text-white opacity-75 small"
                >
                  <FaCheckCircle className="text-warning" /> {item}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="d-flex gap-3 flex-column flex-sm-row justify-content-center mb-5">
              <Button
                as={Link}
                to={donorLink}
                size="lg"
                variant="light"
                className="hero-cta text-danger fw-bold rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2"
              >
                <FaHandHoldingHeart /> {donorLabel}
              </Button>
              <Button
                as={Link}
                to="/requests"
                size="lg"
                variant="outline-light"
                className="hero-cta fw-bold rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2"
              >
                <FaTint /> Request Blood
              </Button>
            </div>

            {/* Stats */}
            <Row className="justify-content-center g-2 g-sm-3 g-md-4">
              {stats.map((stat, i) => (
                <Col xs={4} md={3} key={i}>
                  <div className="hero-stat">
                    <div className="fs-3 mb-1 d-flex justify-content-center text-warning">
                      {stat.icon}
                    </div>
                    <div className="hero-stat-number fw-bold lh-1">
                      {stat.number}
                    </div>
                    <small className="text-white opacity-75">{stat.label}</small>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
