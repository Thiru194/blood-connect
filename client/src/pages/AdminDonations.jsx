import React, { useEffect, useState } from "react";

import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  FaHandHoldingMedical,
  FaSearch,
  FaTrashAlt,
  FaTint,
  FaHospital,
  FaInbox,
  FaUserShield,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getAllDonations,
  deleteDonation,
} from "../services/donationService";

import { formatDonationDate } from "../utils/donorEligibility";

function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getAllDonations(token);
      setDonations(data.donations || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this donation record?");
    if (!confirmDelete) return;

    setBusyId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteDonation(id, token);
      fetchDonations();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const filtered = donations.filter((d) =>
    query
      ? [d.donor?.name, d.hospital, d.city, d.bloodGroup]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      : true
  );

  const totalUnits = donations.reduce(
    (sum, d) => sum + (Number(d.unitsDonated) || 0),
    0
  );

  const uniqueDonors = new Set(
    donations.map((d) => d.donor?._id).filter(Boolean)
  ).size;

  const statCards = [
    {
      icon: <FaHandHoldingMedical size={22} />,
      label: "Total Donations",
      value: donations.length,
      variant: "danger",
    },
    {
      icon: <FaTint size={22} />,
      label: "Units Donated",
      value: totalUnits,
      variant: "warning",
    },
    {
      icon: <FaUsers size={22} />,
      label: "Unique Donors",
      value: uniqueDonors,
      variant: "success",
    },
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero */}
      <div className="bg-danger text-white py-5">
        <Container>
          <Badge
            bg="light"
            text="danger"
            className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
          >
            <FaUserShield /> Admin Panel
          </Badge>
          <h1 className="fw-bold display-5 mb-1">Manage Donations</h1>
          <p className="lead text-white-50 mb-0">
            Review and manage all blood donations logged on the platform.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {/* Summary stat cards */}
        <Row className="g-3 g-md-4 mb-4">
          {statCards.map((stat, i) => (
            <Col xs={6} lg={4} key={i}>
              <Card
                className={`border-0 border-top border-4 border-${stat.variant} shadow-sm rounded-4 h-100`}
              >
                <Card.Body className="p-3 p-md-4 d-flex align-items-center gap-3">
                  <div
                    className={`bg-${stat.variant}-subtle text-${stat.variant} rounded-4 d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={{ width: 52, height: 52 }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="fs-3 fw-bold lh-1">{stat.value}</div>
                    <div className="text-muted small">{stat.label}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4">
            {/* Toolbar */}
            <Row className="align-items-center g-3 mb-4">
              <Col xs={12} md>
                <div className="d-flex align-items-center gap-2">
                  <FaHandHoldingMedical className="text-danger" />
                  <h4 className="fw-bold mb-0">All Donations</h4>
                  <Badge
                    bg="danger-subtle"
                    text="danger"
                    className="rounded-pill"
                  >
                    {filtered.length}
                  </Badge>
                </div>
              </Col>
              <Col xs={12} md="auto">
                <InputGroup>
                  <InputGroup.Text className="bg-white text-danger">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search donations..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center text-muted py-5">
                <Spinner animation="border" variant="danger" className="mb-3" />
                <p className="mb-0">Loading donations...</p>
              </div>
            ) : filtered.length > 0 ? (
              <Table responsive hover className="align-middle mb-0">
                <thead className="text-secondary">
                  <tr>
                    <th>Donor</th>
                    <th>Blood</th>
                    <th>Units</th>
                    <th>Hospital</th>
                    <th>City</th>
                    <th>Date</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((donation) => {
                    const busy = busyId === donation._id;
                    return (
                      <tr key={donation._id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                              style={{ width: 40, height: 40 }}
                            >
                              {getInitials(donation.donor?.name)}
                            </div>
                            <div>
                              <div className="fw-semibold">
                                {donation.donor?.name || "N/A"}
                              </div>
                              <small className="text-muted">
                                {donation.donor?.email}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="danger" className="rounded-3 px-2 py-1">
                            <FaTint size={10} className="me-1" />
                            {donation.bloodGroup}
                          </Badge>
                        </td>
                        <td>{donation.unitsDonated}</td>
                        <td>
                          <span className="d-inline-flex align-items-center gap-1 text-muted">
                            <FaHospital size={12} />
                            {donation.hospital}
                          </span>
                        </td>
                        <td>{donation.city}</td>
                        <td>
                          <span className="d-inline-flex align-items-center gap-1 text-muted">
                            <FaCalendarAlt size={12} />
                            {formatDonationDate(donation.donationDate)}
                          </span>
                        </td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-pill d-inline-flex align-items-center gap-1"
                            disabled={busy}
                            onClick={() => handleDelete(donation._id)}
                          >
                            {busy ? (
                              <Spinner as="span" animation="border" size="sm" />
                            ) : (
                              <>
                                <FaTrashAlt size={11} /> Delete
                              </>
                            )}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div className="text-center text-muted py-5">
                <FaInbox size={40} className="text-danger-subtle mb-3" />
                <p className="mb-0">
                  {query
                    ? "No donations match your search."
                    : "No Donations Found"}
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}

export default AdminDonations;
