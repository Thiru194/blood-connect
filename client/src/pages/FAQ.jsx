import React from "react";
import { Container, Row, Col, Accordion, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaTint,
  FaUserCheck,
  FaHeartbeat,
  FaHandHoldingMedical,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FAQ() {
  const faqs = [
    {
      icon: <FaUserCheck />,
      q: "Who can donate blood?",
      a: "Healthy individuals aged 18-65 with a minimum weight of 50 kg can generally donate blood, provided they meet basic health requirements.",
    },
    {
      icon: <FaHeartbeat />,
      q: "How often can I donate?",
      a: "Most donors can donate whole blood once every 56 days (about 3 months). BloodConnect tracks this for you and shows when you're eligible again.",
    },
    {
      icon: <FaTint />,
      q: "Is blood donation safe?",
      a: "Yes. Blood donation is completely safe. Sterile, single-use, disposable equipment is used for every donation, so there is no risk of infection.",
    },
    {
      icon: <FaQuestionCircle />,
      q: "How long does a donation take?",
      a: "The actual donation takes about 8-10 minutes. Including registration, a quick health check, and rest afterwards, plan for around 30-45 minutes.",
    },
    {
      icon: <FaHandHoldingMedical />,
      q: "What should I do before and after donating?",
      a: "Eat a healthy meal, stay well hydrated, and get a good night's sleep before donating. Afterwards, rest for a few minutes and avoid heavy exercise for the day.",
    },
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="bg-danger text-white text-center py-5">
        <Container>
          <Badge
            bg="light"
            text="danger"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
          >
            <FaQuestionCircle /> Frequently Asked Questions
          </Badge>
          <h1 className="fw-bold display-5 mb-2">Questions &amp; Answers</h1>
          <p
            className="lead text-white-50 mb-0 mx-auto"
            style={{ maxWidth: 560 }}
          >
            Everything you need to know about donating blood with BloodConnect.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        <Row className="justify-content-center">
          <Col lg={9}>
            <Accordion
              defaultActiveKey="0"
              flush
              className="rounded-4 shadow-sm overflow-hidden"
            >
              {faqs.map((item, i) => (
                <Accordion.Item eventKey={String(i)} key={i}>
                  <Accordion.Header>
                    <span className="text-danger me-3 d-flex align-items-center">
                      {item.icon}
                    </span>
                    <span className="fw-semibold">{item.q}</span>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted">
                    {item.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <p className="text-center text-muted mt-4 mb-0">
              Need more help? Visit the{" "}
              <Link to="/help" className="text-danger fw-semibold text-decoration-none">
                Help Center
              </Link>{" "}
              or{" "}
              <Link
                to="/contact"
                className="text-danger fw-semibold text-decoration-none"
              >
                contact us
              </Link>
              .
            </p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default FAQ;
