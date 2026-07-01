import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaLifeRing,
  FaSearch,
  FaUserPlus,
  FaTint,
  FaSearchLocation,
  FaClipboardList,
  FaUserShield,
  FaCog,
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Help() {
  const [query, setQuery] = useState("");

  const categories = [
    {
      icon: <FaUserPlus size={22} />,
      title: "Account & Registration",
      text: "Create an account, log in, and manage your profile details.",
      link: "/register",
    },
    {
      icon: <FaTint size={22} />,
      title: "Donating Blood",
      text: "Record donations and keep track of your contribution history.",
      link: "/donate",
    },
    {
      icon: <FaSearchLocation size={22} />,
      title: "Finding Donors",
      text: "Search nearby donors by blood group and city in emergencies.",
      link: "/donors",
    },
    {
      icon: <FaClipboardList size={22} />,
      title: "Blood Requests",
      text: "Raise a request and reach available donors around you instantly.",
      link: "/requests",
    },
    {
      icon: <FaUserShield size={22} />,
      title: "Safety & Privacy",
      text: "Learn how we keep your personal information safe and secure.",
      link: "/faq",
    },
    {
      icon: <FaCog size={22} />,
      title: "Account Settings",
      text: "Update your profile, blood group, city and contact details.",
      link: "/profile",
    },
  ];

  const steps = [
    {
      no: 1,
      title: "Create your account",
      text: "Register with your name, email, city and blood group.",
    },
    {
      no: 2,
      title: "Complete your profile",
      text: "Add your contact details so donors and seekers can reach you.",
    },
    {
      no: 3,
      title: "Donate or request blood",
      text: "Log a donation or raise a request whenever the need arises.",
    },
    {
      no: 4,
      title: "Connect & save lives",
      text: "Get matched with nearby donors and make a real difference.",
    },
  ];

  const popular = [
    { text: "How do I reset my password?", link: "/contact" },
    { text: "Who is eligible to donate blood?", link: "/faq" },
    { text: "How often can I donate blood?", link: "/faq" },
    { text: "How do I raise a blood request?", link: "/requests" },
    { text: "Is my personal data kept private?", link: "/faq" },
  ];

  const filteredPopular = query
    ? popular.filter((p) => p.text.toLowerCase().includes(query.toLowerCase()))
    : popular;

  return (
    <div className="bg-light">
      <Navbar />

      {/* Hero with search */}
      <div className="bg-danger text-white text-center py-5">
        <Container>
          <Badge
            bg="light"
            text="danger"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
          >
            <FaLifeRing /> Help Center
          </Badge>
          <h1 className="fw-bold display-5 mb-2">How can we help you?</h1>
          <p
            className="lead text-white-50 mb-4 mx-auto"
            style={{ maxWidth: 580 }}
          >
            Search our help center or browse the topics below to find what you
            need.
          </p>

          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <InputGroup size="lg" className="shadow-sm rounded-pill overflow-hidden">
                <InputGroup.Text className="bg-white text-danger border-0">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  className="border-0"
                  placeholder="Search for help..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Categories */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Browse by Topic</h2>
          <p className="text-muted">Pick a category to find detailed guidance.</p>
        </div>

        <Row className="g-4 mb-5">
          {categories.map((cat, i) => (
            <Col key={i} sm={6} lg={4}>
              <Card
                as={Link}
                to={cat.link}
                className="border-0 shadow-sm rounded-4 h-100 text-decoration-none text-reset"
              >
                <Card.Body className="p-4 d-flex align-items-start gap-3">
                  <div
                    className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 50, height: 50 }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{cat.title}</h5>
                    <p className="text-muted small mb-2">{cat.text}</p>
                    <span className="text-danger fw-semibold small d-inline-flex align-items-center gap-1">
                      Learn more <FaArrowRight size={11} />
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Getting started steps */}
        <Row className="g-4 align-items-center mb-5">
          <Col lg={5}>
            <h2 className="fw-bold mb-2">Getting Started</h2>
            <p className="text-muted mb-0">
              New to BloodConnect? Follow these four simple steps to start
              saving lives in minutes.
            </p>
          </Col>
          <Col lg={7}>
            <Row className="g-3">
              {steps.map((step) => (
                <Col sm={6} key={step.no}>
                  <Card className="border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4 d-flex gap-3">
                      <div
                        className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold"
                        style={{ width: 38, height: 38 }}
                      >
                        {step.no}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{step.title}</h6>
                        <p className="text-muted small mb-0">{step.text}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Popular articles */}
        <Row className="justify-content-center mb-5">
          <Col lg={9}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FaQuestionCircle className="text-danger" />
                  <h4 className="fw-bold mb-0">Popular Questions</h4>
                </div>

                <ListGroup variant="flush">
                  {filteredPopular.length === 0 ? (
                    <ListGroup.Item className="text-muted px-0">
                      No results found for &quot;{query}&quot;. Try the{" "}
                      <Link to="/contact" className="text-danger">
                        contact form
                      </Link>
                      .
                    </ListGroup.Item>
                  ) : (
                    filteredPopular.map((item, i) => (
                      <ListGroup.Item
                        key={i}
                        as={Link}
                        to={item.link}
                        action
                        className="px-0 d-flex justify-content-between align-items-center text-reset"
                      >
                        <span>{item.text}</span>
                        <FaArrowRight className="text-danger" size={13} />
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Support CTA */}
        <Row className="justify-content-center">
          <Col lg={9}>
            <Card className="border-0 shadow-sm rounded-4 bg-danger text-white">
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center g-4">
                  <Col md={8}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FaHeadset size={22} />
                      <h4 className="fw-bold mb-0">Still need help?</h4>
                    </div>
                    <p className="text-white-50 mb-0">
                      Our support team is here for you. Reach out and we&apos;ll
                      get back to you as soon as possible.
                    </p>
                  </Col>
                  <Col md={4} className="text-md-end">
                    <Button
                      as={Link}
                      to="/contact"
                      variant="light"
                      className="fw-bold text-danger rounded-pill px-4"
                    >
                      <FaEnvelope className="me-2" />
                      Contact Us
                    </Button>
                  </Col>
                </Row>

                <hr className="border-light opacity-25 my-4" />

                <Row className="g-3 text-white-50 small">
                  <Col sm={6} className="d-flex align-items-center gap-2">
                    <FaEnvelope /> support@bloodconnect.com
                  </Col>
                  <Col sm={6} className="d-flex align-items-center gap-2">
                    <FaPhoneAlt /> +91 98765 43210
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Help;
