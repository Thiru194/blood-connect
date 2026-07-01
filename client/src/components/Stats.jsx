import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaTint, FaHospital } from "react-icons/fa";
import "./Stats.css";

function Stats() {
  const stats = [
    {
      icon: <FaUsers size={32} />,
      number: "5,000+",
      title: "Donors",
      theme: "red",
    },
    {
      icon: <FaTint size={32} />,
      number: "1,200+",
      title: "Blood Donations",
      theme: "blue",
    },
    {
      icon: <FaHospital size={32} />,
      number: "200+",
      title: "Hospitals",
      theme: "teal",
    },
  ];

  return (
    <section className="stats-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="stats-heading">Our Impact</h2>
          <p className="stats-subtitle">
            Connecting donors, hospitals and communities with fast, lifesaving blood support.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {stats.map((item, index) => (
            <Col key={index} sm={6} lg={4}>
              <Card className={`stats-card text-center shadow-sm border-0 p-4 rounded-4 h-100 stats-card--${item.theme}`}>
                <div className="stats-icon mx-auto">{item.icon}</div>
                <div className="mt-3">
                  <h3 className="stats-number">{item.number}</h3>
                  <p className="stats-title-card mb-0">{item.title}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Stats;