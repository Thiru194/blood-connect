import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  ButtonGroup,
  Badge,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  FaUsers,
  FaTint,
  FaHandHoldingMedical,
  FaHandHoldingHeart,
  FaSearch,
  FaTrashAlt,
  FaUserShield,
  FaUser,
  FaInbox,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDashboardStats } from "../services/dashboardService";

import { getAllUsers, deleteUser } from "../services/adminService";

import {
  getDonorEligibility,
  formatDonationDate,
} from "../utils/donorEligibility";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    totalDonations: 0,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // all | donors | admins
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getDashboardStats(token);
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getAllUsers(token);
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteUser(id, token);
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const filteredUsers = users.filter((u) => {
    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "donors" && u.isDonor) ||
      (roleFilter === "admins" && u.role === "admin");

    const matchesQuery = query
      ? [u.name, u.email, u.city, u.bloodGroup]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      : true;

    return matchesRole && matchesQuery;
  });

  const donorsCount = users.filter((u) => u.isDonor).length;

  const statCards = [
    {
      icon: <FaUsers size={24} />,
      label: "Total Users",
      value: stats.totalUsers,
      variant: "danger",
    },
    {
      icon: <FaHandHoldingHeart size={24} />,
      label: "Donors",
      value: donorsCount,
      variant: "primary",
    },
    {
      icon: <FaTint size={24} />,
      label: "Blood Requests",
      value: stats.totalRequests,
      variant: "warning",
    },
    {
      icon: <FaHandHoldingMedical size={24} />,
      label: "Donations",
      value: stats.totalDonations,
      variant: "success",
    },
  ];

  const roleFilters = [
    { key: "all", label: "All" },
    { key: "donors", label: "Donors" },
    { key: "admins", label: "Admins" },
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
          <h1 className="fw-bold display-5 mb-1">Admin Dashboard</h1>
          <p className="lead text-white-50 mb-0">
            Monitor platform activity and manage registered users.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        {/* Stat cards */}
        <Row className="g-3 g-md-4 mb-5">
          {statCards.map((stat, i) => (
            <Col xs={6} lg={3} key={i}>
              <Card
                className={`border-0 border-top border-4 border-${stat.variant} shadow-sm rounded-4 h-100`}
              >
                <Card.Body className="p-3 p-md-4 d-flex align-items-center gap-3">
                  <div
                    className={`bg-${stat.variant}-subtle text-${stat.variant} rounded-4 d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={{ width: 56, height: 56 }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="fs-2 fw-bold lh-1">{stat.value}</div>
                    <div className="text-muted small">{stat.label}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Users table */}
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4">
            <Row className="align-items-center g-3 mb-4">
              <Col xs={12} md>
                <div className="d-flex align-items-center gap-2">
                  <FaUsers className="text-danger" />
                  <h4 className="fw-bold mb-0">Registered Users</h4>
                  <Badge bg="danger-subtle" text="danger" className="rounded-pill">
                    {filteredUsers.length}
                  </Badge>
                </div>
              </Col>
              <Col xs={12} sm="auto">
                <ButtonGroup className="w-100 w-sm-auto">
                  {roleFilters.map((f) => (
                    <Button
                      key={f.key}
                      variant={
                        roleFilter === f.key ? "danger" : "outline-danger"
                      }
                      size="sm"
                      onClick={() => setRoleFilter(f.key)}
                    >
                      {f.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              <Col xs={12} sm="auto">
                <InputGroup>
                  <InputGroup.Text className="bg-white text-danger">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center text-muted py-5">
                <Spinner animation="border" variant="danger" className="mb-3" />
                <p className="mb-0">Loading users...</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <Table responsive hover className="align-middle mb-0">
                <thead className="text-secondary">
                  <tr>
                    <th>User</th>
                    <th>Phone</th>
                    <th>Blood Group</th>
                    <th>City</th>
                    <th>Last Donation</th>
                    <th>Role</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const elig = getDonorEligibility(user.lastDonationDate);
                    return (
                    <tr key={user._id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                            style={{ width: 42, height: 42 }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <div className="fw-semibold">{user.name}</div>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.phone}</td>
                      <td>
                        <Badge bg="danger" className="rounded-3 px-2 py-1">
                          {user.bloodGroup}
                        </Badge>
                      </td>
                      <td>{user.city}</td>
                      <td>
                        {user.isDonor ? (
                          <div>
                            <div className="small">
                              {formatDonationDate(user.lastDonationDate)}
                            </div>
                            <Badge
                              bg={elig.eligible ? "success-subtle" : "warning-subtle"}
                              text={elig.eligible ? "success" : "dark"}
                              className="rounded-pill"
                            >
                              {elig.eligible
                                ? "Eligible"
                                : `In ${elig.daysRemaining}d`}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <Badge
                          bg={
                            user.role === "admin"
                              ? "dark"
                              : "secondary-subtle"
                          }
                          text={user.role === "admin" ? undefined : "secondary"}
                          className="rounded-pill text-capitalize d-inline-flex align-items-center gap-1"
                        >
                          {user.role === "admin" ? (
                            <FaUserShield size={11} />
                          ) : (
                            <FaUser size={11} />
                          )}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-pill d-inline-flex align-items-center gap-2"
                          disabled={deletingId === user._id}
                          onClick={() => handleDelete(user._id)}
                        >
                          {deletingId === user._id ? (
                            <Spinner as="span" animation="border" size="sm" />
                          ) : (
                            <>
                              <FaTrashAlt size={12} /> Delete
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
                  {query || roleFilter !== "all"
                    ? "No users match your filters."
                    : "No Users Found"}
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

export default AdminDashboard;
