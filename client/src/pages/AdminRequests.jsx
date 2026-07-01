import React, { useEffect, useState } from "react";

import {
  Container,
  Card,
  Table,
  Button,
  ButtonGroup,
  Badge,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaSearch,
  FaCheck,
  FaCheckDouble,
  FaTrashAlt,
  FaTint,
  FaHospital,
  FaInbox,
  FaUserShield,
  FaHourglassHalf,
  FaThumbsUp,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getAllRequests,
  deleteRequest,
  updateStatus,
} from "../services/requestAdminService";

function AdminRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getAllRequests(token);
      setRequests(data.requests || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setBusyId(id);
    try {
      const token = localStorage.getItem("token");
      await updateStatus(id, status, token);
      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this request?");
    if (!confirmDelete) return;

    setBusyId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteRequest(id, token);
      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const statusVariant = (status = "") => {
    switch (status) {
      case "Approved":
        return { bg: "info-subtle", text: "info" };
      case "Completed":
        return { bg: "success-subtle", text: "success" };
      case "Rejected":
      case "Cancelled":
        return { bg: "danger-subtle", text: "danger" };
      default:
        return { bg: "warning-subtle", text: "warning" };
    }
  };

  const filtered = requests.filter((r) => {
    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;
    const matchesQuery = query
      ? [r.patientName, r.hospital, r.city, r.bloodGroup]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      : true;
    return matchesStatus && matchesQuery;
  });

  const countBy = (status) =>
    requests.filter((r) => r.status === status).length;

  const statCards = [
    {
      icon: <FaClipboardList size={22} />,
      label: "Total Requests",
      value: requests.length,
      variant: "danger",
    },
    {
      icon: <FaHourglassHalf size={22} />,
      label: "Pending",
      value: countBy("Pending"),
      variant: "warning",
    },
    {
      icon: <FaThumbsUp size={22} />,
      label: "Approved",
      value: countBy("Approved"),
      variant: "info",
    },
    {
      icon: <FaCheckDouble size={22} />,
      label: "Completed",
      value: countBy("Completed"),
      variant: "success",
    },
  ];

  const statusFilters = ["All", "Pending", "Approved", "Completed"];

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
          <h1 className="fw-bold display-5 mb-1">Manage Blood Requests</h1>
          <p className="lead text-white-50 mb-0">
            Review, approve and track all incoming blood requests.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {/* Summary stat cards */}
        <Row className="g-3 g-md-4 mb-4">
          {statCards.map((stat, i) => (
            <Col xs={6} lg={3} key={i}>
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
                  <FaClipboardList className="text-danger" />
                  <h4 className="fw-bold mb-0">All Requests</h4>
                  <Badge
                    bg="danger-subtle"
                    text="danger"
                    className="rounded-pill"
                  >
                    {filtered.length}
                  </Badge>
                </div>
              </Col>
              <Col xs={12} lg="auto">
                <ButtonGroup className="flex-wrap">
                  {statusFilters.map((s) => (
                    <Button
                      key={s}
                      variant={
                        statusFilter === s ? "danger" : "outline-danger"
                      }
                      size="sm"
                      onClick={() => setStatusFilter(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              <Col xs={12} lg="auto">
                <InputGroup>
                  <InputGroup.Text className="bg-white text-danger">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search requests..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center text-muted py-5">
                <Spinner animation="border" variant="danger" className="mb-3" />
                <p className="mb-0">Loading requests...</p>
              </div>
            ) : filtered.length > 0 ? (
              <Table responsive hover className="align-middle mb-0">
                <thead className="text-secondary">
                  <tr>
                    <th>Patient</th>
                    <th>Blood</th>
                    <th>Units</th>
                    <th>Hospital</th>
                    <th>City</th>
                    <th>Requested By</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((request) => {
                    const sv = statusVariant(request.status);
                    const busy = busyId === request._id;
                    return (
                      <tr key={request._id}>
                        <td>
                          <Button
                            variant="link"
                            className="p-0 fw-semibold text-danger text-decoration-none"
                            onClick={() =>
                              navigate(`/requests/${request._id}`)
                            }
                            title="View request details"
                          >
                            {request.patientName}
                          </Button>
                        </td>
                        <td>
                          <Badge bg="danger" className="rounded-3 px-2 py-1">
                            <FaTint size={10} className="me-1" />
                            {request.bloodGroup}
                          </Badge>
                        </td>
                        <td>{request.unitsRequired}</td>
                        <td>
                          <span className="d-inline-flex align-items-center gap-1 text-muted">
                            <FaHospital size={12} />
                            {request.hospital}
                          </span>
                        </td>
                        <td>{request.city}</td>
                        <td>{request.requestedBy?.name || "N/A"}</td>
                        <td>
                          <Badge
                            bg={sv.bg}
                            text={sv.text}
                            className="rounded-pill px-3 py-2"
                          >
                            {request.status}
                          </Badge>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-2">
                            {request.status === "Pending" && (
                              <Button
                                variant="outline-success"
                                size="sm"
                                className="rounded-pill d-inline-flex align-items-center gap-1"
                                disabled={busy}
                                onClick={() =>
                                  handleStatusUpdate(request._id, "Approved")
                                }
                              >
                                <FaCheck size={11} /> Approve
                              </Button>
                            )}

                            {request.status === "Approved" && (
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="rounded-pill d-inline-flex align-items-center gap-1"
                                disabled={busy}
                                onClick={() =>
                                  handleStatusUpdate(request._id, "Completed")
                                }
                              >
                                <FaCheckDouble size={11} /> Complete
                              </Button>
                            )}

                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-pill d-inline-flex align-items-center gap-1"
                              disabled={busy}
                              onClick={() => handleDelete(request._id)}
                            >
                              {busy ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                />
                              ) : (
                                <>
                                  <FaTrashAlt size={11} /> Delete
                                </>
                              )}
                            </Button>
                          </div>
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
                  {query || statusFilter !== "All"
                    ? "No requests match your filters."
                    : "No Requests Found"}
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

export default AdminRequests;
