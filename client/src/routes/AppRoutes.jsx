import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import DonateBlood from "../pages/DonateBlood";
import ApplyDonor from "../pages/ApplyDonor";
import BloodRequests from "../pages/BloodRequests";
import BloodRequestDetails from "../pages/BloodRequestDetails";
import DonorList from "../pages/DonorList";
import DonorDetails from "../pages/DonorDetails";
import AdminDashboard from "../pages/AdminDashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Help from "../pages/Help";
import AdminRequests from "../pages/AdminRequests";
import AdminDonations from "../pages/AdminDonations";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ScrollToTop from "../components/ScrollToTop";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/help"
          element={<Help />}
        />

        {/* Protected Routes */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <DonateBlood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-donor"
          element={
            <ProtectedRoute>
              <ApplyDonor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <BloodRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests/:id"
          element={
            <ProtectedRoute>
              <BloodRequestDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donors"
          element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donors/:id"
          element={
            <ProtectedRoute>
              <DonorDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-requests"
          element={
            <AdminRoute>
              <AdminRequests />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-donations"
          element={
            <AdminRoute>
              <AdminDonations />
            </AdminRoute>
          }
        />

        {/* Catch-all: any unknown URL renders the 404 page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;