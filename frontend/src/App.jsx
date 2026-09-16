import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import MyBooking from "./pages/MyBooking";
import ProviderBookings from "./pages/ProviderBooking";
import CreateService from "./pages/CreateService";
import MyServices from "./pages/MyServices";
import GiveReview from "./pages/GiveReview";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminServices from "./pages/AdminServices";
import AdminUsers from "./pages/AdminUsers";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/create" element={<CreateService />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route
            path="/services/:id/review"
            element={
              <ProtectedRoutes allowedRoles={["customer"]}>
                <GiveReview />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/services/:id/book"
            element={
              <ProtectedRoutes allowedRoles={["customer"]}>
                <Booking />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoutes allowedRoles={["customer"]}>
                <MyBooking />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/provider/bookings"
            element={
              <ProtectedRoutes allowedRoles={["provider"]}>
                <ProviderBookings />
              </ProtectedRoutes>
            }
          />
          <Route path="/provider/services" element={<MyServices />} />
          <Route path="/provider/services/create" element={<CreateService />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminCategories />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminServices />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
