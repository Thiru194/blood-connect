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

import "./DonorList.css";

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

  // Live stats for the hero, derived from the currently loaded donors.
  const eligibleCount = donors.filter(
    (d) => getDonorEligibility(d.lastDonationDate).eligible
  ).length;
  const cityCount = new Set(
    donors.map((d) => (d.city || "").trim().toLowerCase()).filter(Boolean)
  ).size;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="donor-hero text-white text-center py-5">
        <Container className="pb-4">
          <Badge
            bg="light"
            text="success"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill fw-semibold"
          >
            <FaUserFriends /> Donor Directory
          </Badge>
          <h1 className="donor-hero-title mb-2">Find Blood Donors</h1>
          <p className="donor-hero-sub text-white opacity-75 mb-4 mx-auto">
            Search for available donors by blood group and city near you.
          </p>

          <div className="donor-hero-stats">
            <span className="donor-stat-pill">
              <FaUserFriends />
              <span>
                <strong>{donors.length}</strong> Donors
              </span>
            </span>
            <span className="donor-stat-pill">
              <FaTint />
              <span>
                <strong>{eligibleCount}</strong> Eligible now
              </span>
            </span>
            <span className="donor-stat-pill">
              <FaMapMarkerAlt />
              <span>
                <strong>{cityCount}</strong> {cityCount === 1 ? "City" : "Cities"}
              </span>
            </span>
          </div>
        </Container>
      </div>

      <Container className="pb-5 flex-grow-1">
        {/* Search card */}
        <Card className="donor-search-card border-0 mb-4 position-relative">
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
          <Row className="g-4">
            {donors.map((donor) => {
              const elig = getDonorEligibility(donor.lastDonationDate);
              return (
                <Col md={6} xl={4} key={donor._id}>
                  <Card
                    className="donor-card h-100 border-0 shadow-sm"
                    role="button"
                    onClick={() => navigate(`/donors/${donor._id}`)}
                    style={{ cursor: "pointer" }}
                    title="View donor details"
                  >
                    <div className="donor-card-strip" />
                    <Card.Body className="p-4 d-flex flex-column">
                      {/* Top row: avatar + name + blood group */}
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="donor-avatar">
                          {getInitials(donor.name)}
                        </div>
                        <div className="flex-grow-1 min-w-0">
                          <h5 className="fw-bold mb-1 text-truncate">
                            {donor.name}
                          </h5>
                          {elig.eligible ? (
                            <Badge
                              bg="success-subtle"
                              text="success"
                              className="rounded-pill px-2 py-1 small"
                            >
                              ● Eligible now
                            </Badge>
                          ) : (
                            <Badge
                              bg="warning-subtle"
                              text="dark"
                              className="rounded-pill px-2 py-1 small"
                            >
                              Eligible in {elig.daysRemaining}d
                            </Badge>
                          )}
                        </div>
                        <span className="donor-bloodtag">
                          {donor.bloodGroup}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="donor-meta text-muted mb-3">
                        <div className="donor-meta-row">
                          <FaMapMarkerAlt size={13} /> {donor.city || "—"}
                        </div>
                        <div className="donor-meta-row">
                          <FaPhoneAlt size={13} /> {donor.phone || "—"}
                        </div>
                        <div className="donor-meta-row">
                          <FaCalendarAlt size={13} /> Last donated:{" "}
                          {formatDonationDate(donor.lastDonationDate)}
                        </div>
                      </div>

                      {/* Call action pinned to the bottom */}
                      <Button
                        as="a"
                        href={`tel:${donor.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        variant={elig.eligible ? "success" : "outline-secondary"}
                        className="donor-call-btn mt-auto w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaPhoneAlt size={13} /> Call Donor
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
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
