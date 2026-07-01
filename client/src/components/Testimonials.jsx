import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaStar, FaQuoteRight, FaMapMarkerAlt } from "react-icons/fa";

import "./home-sections.css";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Kumar",
      role: "Blood Recipient",
      text: "BloodConnect helped me find donors during an emergency. The platform's quick response saved my father's life. I can't thank them enough!",
      rating: 5,
      location: "Mumbai, India",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Blood Donor",
      text: "The platform is simple and connects donors quickly. I'm proud to be part of a community that saves lives. It's easy and fulfilling!",
      rating: 5,
      location: "Delhi, India",
    },
    {
      id: 3,
      name: "Karthik Reddy",
      role: "Healthcare Professional",
      text: "A great initiative that saves lives every day. We recommend BloodConnect to all our patients. Outstanding service and support!",
      rating: 5,
      location: "Bangalore, India",
    },
    {
      id: 4,
      name: "Anaya Patel",
      role: "Blood Donor",
      text: "Being able to help someone in need has never been easier. BloodConnect makes the entire process transparent and trustworthy.",
      rating: 5,
      location: "Ahmedabad, India",
    },
    {
      id: 5,
      name: "Arjun Singh",
      role: "Blood Recipient",
      text: "During my surgery, I needed blood urgently. BloodConnect connected me with perfect donors within hours. Lifesaving platform!",
      rating: 5,
      location: "Pune, India",
    },
    {
      id: 6,
      name: "Dr. Meera Gupta",
      role: "Medical Director",
      text: "The most efficient blood donation network I've come across. Our hospital partners with BloodConnect for emergency blood supplies.",
      rating: 5,
      location: "Hyderabad, India",
    },
  ];

  const ctaStats = [
    { number: "10K+", label: "Lives Saved" },
    { number: "25K+", label: "Active Donors" },
    { number: "98%", label: "Success Rate" },
  ];

  const getInitials = (name = "") =>
    name
      .replace(/^Dr\.?\s*/i, "")
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        size={14}
        className={i < rating ? "text-warning" : "text-secondary opacity-25"}
      />
    ));

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
              Testimonials
            </Badge>
            <h2 className="section-heading mb-3">Success Stories</h2>
            <p className="text-muted">
              Hear from the donors and recipients whose lives have been
              transformed by BloodConnect.
            </p>
          </Col>
        </Row>

        {/* Testimonials Grid */}
        <Row className="g-4">
          {testimonials.map((t) => (
            <Col lg={4} md={6} key={t.id}>
              <Card className="lift-card border-0 shadow-sm rounded-4 h-100 position-relative">
                <Card.Body className="p-4 d-flex flex-column">
                  <FaQuoteRight
                    className="text-danger opacity-25 position-absolute top-0 end-0 m-4"
                    size={28}
                  />

                  <div className="d-flex gap-1 mb-3">{renderStars(t.rating)}</div>

                  <p className="text-muted flex-grow-1">{t.text}</p>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <div
                      className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                      style={{ width: 48, height: 48 }}
                    >
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{t.name}</h6>
                      <small className="text-danger d-block">{t.role}</small>
                      <small className="text-muted d-inline-flex align-items-center gap-1">
                        <FaMapMarkerAlt size={10} /> {t.location}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <Card
          className="cta-panel border-0 shadow-sm rounded-4 mt-5 text-white"
          style={{
            background: "linear-gradient(135deg, #CC1036 0%, #7A1062 100%)",
          }}
        >
          <Card.Body className="p-4 p-md-5 text-center">
            <h3 className="fw-bold mb-2">Join Our Community of Life Savers</h3>
            <p className="text-white opacity-75 mb-4 mx-auto" style={{ maxWidth: 620 }}>
              Become a donor today and be the reason someone gets a second chance.
            </p>
            <Row className="justify-content-center g-4">
              {ctaStats.map((stat, i) => (
                <Col xs={4} md={3} key={i}>
                  <div className="fs-2 fw-bold lh-1">{stat.number}</div>
                  <small className="text-white opacity-75">{stat.label}</small>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Testimonials;
