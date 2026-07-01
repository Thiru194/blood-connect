import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaHandshake,
  FaBolt,
  FaGlobe,
  FaBullseye,
  FaStar,
  FaTint,
  FaFirstAid,
  FaUsers,
  FaHospital,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  const [stats, setStats] = useState({ donors: 0, donations: 0, hospitals: 0 });

  useEffect(() => {
    const timers = [
      setInterval(
        () =>
          setStats((s) =>
            s.donors < 5000 ? { ...s, donors: s.donors + 50 } : s
          ),
        20
      ),
      setInterval(
        () =>
          setStats((s) =>
            s.donations < 1200 ? { ...s, donations: s.donations + 10 } : s
          ),
        20
      ),
      setInterval(
        () =>
          setStats((s) =>
            s.hospitals < 200 ? { ...s, hospitals: s.hospitals + 2 } : s
          ),
        20
      ),
    ];
    return () => timers.forEach(clearInterval);
  }, []);

  const values = [
    {
      icon: <FaHeart />,
      title: "Compassion",
      description:
        "We care deeply about every life and dedicate ourselves to saving them.",
    },
    {
      icon: <FaHandshake />,
      title: "Trust",
      description:
        "Building a community where donors and recipients trust each other completely.",
    },
    {
      icon: <FaBolt />,
      title: "Speed",
      description:
        "Quick response times ensure blood reaches patients when they need it most.",
    },
    {
      icon: <FaGlobe />,
      title: "Accessibility",
      description:
        "Making blood donation and requests accessible to everyone, everywhere.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "BloodConnect was founded with a vision to revolutionize blood donation.",
    },
    {
      year: "2021",
      title: "First Network Launch",
      description: "Launched in 5 major cities with 500+ registered donors.",
    },
    {
      year: "2022",
      title: "Hospital Partnerships",
      description: "Partnered with 50+ hospitals across the country.",
    },
    {
      year: "2024",
      title: "National Expansion",
      description:
        "Expanded to 25 cities with 5000+ active donors and 200+ hospital partners.",
    },
  ];

  const impact = [
    {
      icon: <FaUsers />,
      number: `${stats.donors}+`,
      label: "Registered Donors",
      detail: "Active community members saving lives",
    },
    {
      icon: <FaTint />,
      number: `${stats.donations}+`,
      label: "Blood Donations",
      detail: "Lives saved through successful donations",
    },
    {
      icon: <FaHospital />,
      number: `${stats.hospitals}+`,
      label: "Partner Hospitals",
      detail: "Trusted medical institutions collaborating",
    },
  ];

  return (
    <div className="bg-light">
      <Navbar />

      {/* Hero Section */}
      <section
        className="text-white py-5"
        style={{
          background: "linear-gradient(135deg, #CC1036 0%, #7A1062 100%)",
        }}
      >
        <Container className="py-4">
          <Row className="align-items-center g-4">
            <Col lg={7} className="order-2 order-lg-1 text-center text-lg-start">
              <Badge
                bg="light"
                text="danger"
                className="mb-3 px-3 py-2 rounded-pill"
              >
                About BloodConnect
              </Badge>
              <h1 className="display-4 fw-bold mb-3">
                Building a Community of{" "}
                <span className="text-warning">Life Savers</span>
              </h1>
              <p className="fs-5 text-white opacity-75 mb-4">
                BloodConnect connects passionate blood donors with those in urgent
                need, saving thousands of lives every year through trust, speed,
                and compassion.
              </p>
              <div className="d-flex gap-3 flex-column flex-sm-row justify-content-center justify-content-lg-start">
                <Button
                  as={Link}
                  to="/donate"
                  variant="light"
                  size="lg"
                  className="text-danger fw-bold rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <FaTint /> Become a Donor
                </Button>
                <Button
                  as={Link}
                  to="/requests"
                  variant="outline-light"
                  size="lg"
                  className="fw-bold rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <FaFirstAid /> Request Blood
                </Button>
              </div>
            </Col>
            <Col lg={5} className="order-1 order-lg-2 text-center">
              <div
                className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 220, height: 220 }}
              >
                <div
                  className="bg-white text-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 150, height: 150, fontSize: "4rem" }}
                >
                  <FaTint />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4 p-md-5">
                <div
                  className="bg-danger-subtle text-danger rounded-4 d-flex align-items-center justify-content-center fs-3 mb-3"
                  style={{ width: 64, height: 64 }}
                >
                  <FaBullseye />
                </div>
                <h2 className="fw-bold mb-3">Our Mission</h2>
                <p className="text-muted">
                  To build a reliable, transparent platform that seamlessly
                  connects blood donors, hospitals, and patients during
                  emergencies. We believe every life matters, and every second
                  counts.
                </p>
                <ul className="list-unstyled mb-0">
                  {[
                    "Connect donors efficiently with those in need",
                    "Provide rapid response during emergencies",
                    "Foster trust within the community",
                  ].map((point, i) => (
                    <li key={i} className="d-flex align-items-center gap-2 mb-2">
                      <FaCheckCircle className="text-danger flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4 p-md-5">
                <div
                  className="bg-danger-subtle text-danger rounded-4 d-flex align-items-center justify-content-center fs-3 mb-3"
                  style={{ width: 64, height: 64 }}
                >
                  <FaStar />
                </div>
                <h2 className="fw-bold mb-3">Our Vision</h2>
                <p className="text-muted">
                  To create a world where blood availability is never a barrier to
                  life-saving treatment. We envision a future where every patient
                  gets the blood they need, when they need it.
                </p>
                <ul className="list-unstyled mb-0">
                  {[
                    "Build a strong donor network across all regions",
                    "Empower donors to save lives easily",
                    "Ensure every emergency has a solution",
                  ].map((point, i) => (
                    <li key={i} className="d-flex align-items-center gap-2 mb-2">
                      <FaCheckCircle className="text-danger flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Values */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge bg="danger-subtle" text="danger" className="mb-3 px-3 py-2 rounded-pill">
              What Drives Us
            </Badge>
            <h2 className="fw-bold mb-3">Our Core Values</h2>
            <p className="text-muted">
              The principles that guide everything we do at BloodConnect.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {values.map((value, index) => (
            <Col lg={3} md={6} key={index}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center">
                <Card.Body className="p-4">
                  <div
                    className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fs-3 mx-auto mb-3"
                    style={{ width: 70, height: 70 }}
                  >
                    {value.icon}
                  </div>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p className="text-muted small mb-0">{value.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Impact Stats */}
      <section
        className="text-white py-5"
        style={{
          background: "linear-gradient(135deg, #CC1036 0%, #7A1062 100%)",
        }}
      >
        <Container className="py-3">
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold mb-2">Our Impact</h2>
              <p className="text-white opacity-75">
                Transforming lives through blood donation.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {impact.map((stat, i) => (
              <Col lg={4} md={6} key={i}>
                <Card className="border-0 bg-white bg-opacity-10 text-white rounded-4 h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="fs-1 mb-2 d-flex justify-content-center">
                      {stat.icon}
                    </div>
                    <div className="display-6 fw-bold lh-1 mb-2">
                      {stat.number}
                    </div>
                    <h6 className="fw-bold">{stat.label}</h6>
                    <small className="opacity-75">{stat.detail}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">10,000+ Lives Saved</h3>
            <p className="text-white opacity-75 mx-auto" style={{ maxWidth: 720 }}>
              Through our platform, we&apos;ve helped connect generous donors with
              patients in critical need, ensuring life-saving blood reaches them
              in time. Every statistic represents real lives, real families, and
              real hope.
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge bg="danger-subtle" text="danger" className="mb-3 px-3 py-2 rounded-pill">
              Our Journey
            </Badge>
            <h2 className="fw-bold mb-3">From Vision to Impact</h2>
          </Col>
        </Row>

        <Row className="g-4">
          {timeline.map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Body className="p-4">
                  <Badge bg="danger" className="rounded-pill mb-3 px-3 py-2">
                    {item.year}
                  </Badge>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted small mb-0">{item.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA */}
      <Container className="pb-5">
        <Card
          className="border-0 shadow-sm rounded-4 text-white"
          style={{
            background: "linear-gradient(135deg, #CC1036 0%, #7A1062 100%)",
          }}
        >
          <Card.Body className="p-4 p-md-5">
            <Row className="align-items-center g-4">
              <Col lg={8} className="text-center text-lg-start">
                <h2 className="fw-bold mb-2">Ready to Save Lives?</h2>
                <p className="text-white opacity-75 mb-0">
                  Join our community of life-savers today and make a real
                  difference in someone&apos;s life.
                </p>
              </Col>
              <Col lg={4} className="text-center text-lg-end">
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="lg"
                  className="text-danger fw-bold rounded-pill px-4"
                >
                  Join BloodConnect
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}

export default About;
