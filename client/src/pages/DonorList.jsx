import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  FaTint,
  FaMapMarkerAlt,
  FaSearch,
  FaPhoneAlt,
  FaUserFriends,
  FaUserSlash,
  FaCalendarAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { searchDonors } from "../services/donorService";

import {
  getDonorEligibility,
  formatDonationDate,
} from "../utils/donorEligibility";

function DonorList() {
  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Preload a few donors so the page is useful without searching first
  useEffect(() => {
    const loadInitialDonors = async () => {
      setLoading(true);
      try {
        const data = await searchDonors("", "");
        setDonors((data.donors || []).slice(0, 5));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialDonors();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const data = await searchDonors(bloodGroup, city);
      setDonors(data.donors || []);
    } catch (error) {
      console.log(error);
      setDonors([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="bg-success text-white text-center py-5">
        <Container>
          <Badge
            bg="light"
            text="success"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
          >
            <FaUserFriends /> Donor Directory
          </Badge>
          <h1 className="fw-bold display-5 mb-2">Find Blood Donors</h1>
          <p
            className="lead text-white-50 mb-0 mx-auto"
            style={{ maxWidth: 560 }}
          >
            Search for available donors by blood group and city near you.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {/* Search card */}
        <Card className="border-0 shadow-sm rounded-4 mb-4">
          <Card.Body className="p-4">
            <Form onSubmit={handleSearch}>
              <Row className="g-3 align-items-end">
                <Col md={5}>
                  <Form.Label className="small fw-semibold text-uppercase text-secondary">
                    Blood Group
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white text-success">
                      <FaTint />
                    </InputGroup.Text>
                    <Form.Select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                    >
                      <option value="">All Blood Groups</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </Form.Select>
                  </InputGroup>
                </Col>

                <Col md={5}>
                  <Form.Label className="small fw-semibold text-uppercase text-secondary">
                    City
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white text-success">
                      <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </InputGroup>
                </Col>

                <Col md={2}>
                  <Button
                    type="submit"
                    variant="success"
                    disabled={loading}
                    className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                  >
                    {loading ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : (
                      <>
                        <FaSearch /> Search
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Results header */}
        {!loading && donors.length > 0 && (
          <p className="text-muted mb-4">
            {searched ? (
              <>
                Showing <strong>{donors.length}</strong> available donor
                {donors.length > 1 ? "s" : ""}.
              </>
            ) : (
              <>
                <strong>Featured donors</strong> &mdash; search above to find
                donors by blood group and city.
              </>
            )}
          </p>
        )}

        {/* Results */}
        {loading ? (
          <div className="text-center text-muted py-5">
            <Spinner animation="border" variant="success" className="mb-3" />
            <p className="mb-0">
              {searched ? "Searching for donors..." : "Loading donors..."}
            </p>
          </div>
        ) : donors.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {donors.map((donor) => {
              const elig = getDonorEligibility(donor.lastDonationDate);
              return (
                <Card
                  key={donor._id}
                  className="border-0 shadow-sm rounded-4"
                  role="button"
                  onClick={() => navigate(`/donors/${donor._id}`)}
                  style={{ cursor: "pointer" }}
                  title="View donor details"
                >
                  <Card.Body className="p-3 p-md-4">
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      {/* Avatar */}
                      <div
                        className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                        style={{ width: 60, height: 60, fontSize: "1.2rem" }}
                      >
                        {getInitials(donor.name)}
                      </div>

                      {/* Blood group */}
                      <Badge
                        bg="danger"
                        className="fs-5 rounded-3 px-3 py-2 flex-shrink-0"
                      >
                        {donor.bloodGroup}
                      </Badge>

                      {/* Info */}
                      <div className="flex-grow-1" style={{ minWidth: 160 }}>
                        <h5 className="fw-bold mb-1">{donor.name}</h5>
                        <div className="d-flex flex-wrap gap-3 text-muted small">
                          <span className="d-inline-flex align-items-center gap-1">
                            <FaMapMarkerAlt size={11} /> {donor.city}
                          </span>
                          <span className="d-inline-flex align-items-center gap-1">
                            <FaPhoneAlt size={11} /> {donor.phone}
                          </span>
                          <span className="d-inline-flex align-items-center gap-1">
                            <FaCalendarAlt size={11} /> Last donated:{" "}
                            {formatDonationDate(donor.lastDonationDate)}
                          </span>
                        </div>
                      </div>

                      {/* Status + action */}
                      <div className="d-flex align-items-center gap-2 ms-auto">
                        {elig.eligible ? (
                          <Badge
                            bg="success-subtle"
                            text="success"
                            className="rounded-pill px-3 py-2"
                          >
                            ● Eligible
                          </Badge>
                        ) : (
                          <Badge
                            bg="warning-subtle"
                            text="dark"
                            className="rounded-pill px-3 py-2"
                          >
                            Eligible in {elig.daysRemaining}d
                          </Badge>
                        )}

                        <Button
                          as="a"
                          href={`tel:${donor.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          variant={elig.eligible ? "success" : "outline-secondary"}
                          size="sm"
                          className="rounded-pill fw-semibold d-flex align-items-center gap-2"
                        >
                          <FaPhoneAlt size={12} /> Call
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="text-center text-muted py-5">
              <FaUserSlash size={42} className="text-success mb-3 opacity-50" />
              <h5 className="fw-bold text-dark">
                {searched ? "No Donors Found" : "Start Your Search"}
              </h5>
              <p className="mb-0">
                {searched
                  ? "Try a different blood group or city."
                  : "Select a blood group and city, then hit search."}
              </p>
            </Card.Body>
          </Card>
        )}
      </Container>

      <Footer />
    </div>
  );
}

export default DonorList;
