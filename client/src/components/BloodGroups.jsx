import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaTint, FaArrowUp, FaArrowDown, FaLightbulb } from "react-icons/fa";

import "./home-sections.css";

function BloodGroups() {
  const groups = [
    { type: "A+", percentage: "34%", canDonate: "A+, AB+", canReceive: "A+, A-, O+, O-" },
    { type: "A-", percentage: "6%", canDonate: "A+, A-, AB+, AB-", canReceive: "A-, O-" },
    { type: "B+", percentage: "9%", canDonate: "B+, AB+", canReceive: "B+, B-, O+, O-" },
    { type: "B-", percentage: "2%", canDonate: "B+, B-, AB+, AB-", canReceive: "B-, O-" },
    { type: "AB+", percentage: "3%", canDonate: "AB+", canReceive: "All Types" },
    { type: "AB-", percentage: "1%", canDonate: "AB+, AB-", canReceive: "AB-, A-, B-, O-" },
    { type: "O+", percentage: "37%", canDonate: "All Types", canReceive: "O+, O-" },
    { type: "O-", percentage: "8%", canDonate: "All Types", canReceive: "O-" },
  ];

  const getBloodGroupColor = (type) => {
    const colorMap = {
      "A+": "#FF6B6B",
      "A-": "#EE5A52",
      "B+": "#FF8E72",
      "B-": "#FF7961",
      "AB+": "#EC407A",
      "AB-": "#E91E63",
      "O+": "#D32F2F",
      "O-": "#B71C1C",
    };
    return colorMap[type] || "#FF6B6B";
  };

  return (
    <section className="py-5 bg-light">
      <Container className="py-3">
        {/* Section header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <Badge
              bg="danger-subtle"
              text="danger"
              className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
            >
              <FaTint /> Compatibility
            </Badge>
            <h2 className="section-heading mb-3">Blood Groups</h2>
            <p className="text-muted mb-0">
              Discover your blood type and donation compatibility
            </p>
          </Col>
        </Row>

        {/* Blood group cards */}
        <Row className="g-4">
          {groups.map((group, index) => {
            const color = getBloodGroupColor(group.type);
            return (
              <Col xs={6} md={4} lg={3} key={index}>
                <Card
                  className="lift-card border-0 shadow-sm rounded-4 h-100 text-center overflow-hidden"
                  style={{ borderTop: `4px solid ${color}` }}
                >
                  <Card.Body className="p-4 d-flex flex-column align-items-center">
                    {/* Blood type badge */}
                    <div
                      className="section-icon rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-3 shadow-sm"
                      style={{
                        width: 72,
                        height: 72,
                        backgroundColor: color,
                        fontSize: "1.4rem",
                      }}
                    >
                      {group.type}
                    </div>

                    {/* Population */}
                    <small className="text-muted text-uppercase">
                      Population
                    </small>
                    <div
                      className="fw-bold mb-3"
                      style={{ color, fontSize: "1.2rem" }}
                    >
                      {group.percentage}
                    </div>

                    <hr className="w-100 my-2" />

                    {/* Compatibility info */}
                    <div className="w-100 text-start mt-2">
                      <small className="text-muted d-flex align-items-center gap-1">
                        <FaArrowUp size={10} className="text-success" /> Can
                        Donate To
                      </small>
                      <p className="fw-semibold small mb-3">{group.canDonate}</p>

                      <small className="text-muted d-flex align-items-center gap-1">
                        <FaArrowDown size={10} className="text-primary" /> Can
                        Receive From
                      </small>
                      <p className="fw-semibold small mb-0">
                        {group.canReceive}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Did you know */}
        <Card className="border-0 shadow-sm rounded-4 mt-5">
          <Card.Body className="p-4 d-flex align-items-start gap-3">
            <div
              className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 44, height: 44 }}
            >
              <FaLightbulb />
            </div>
            <p className="text-muted mb-0">
              <strong>Did you know?</strong> O- blood type donors are universal
              donors and can help anyone in need, while AB+ recipients can
              receive from any blood type. Every drop counts!
            </p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default BloodGroups;
