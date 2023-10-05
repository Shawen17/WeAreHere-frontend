import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import store from "./stores";
import Home from "./pages/Home";
import ConfirmBooking from "./pages/ConfirmBooking";
import LoginForm from "./components/form/LoginForm";
import SignupVerify from "./pages/SignupVerify";
import Activate from "./pages/Activate";
import SignupFormPartner from "./components/form/SignupFormPartner";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Layout from "./hoc/Layout";
import About from "./pages/About";
import Account from "./pages/Account";
import Service from "./pages/Service";
import MakeOrder from "./pages/MakeOrder";
import ProctectedRoute from "./components/ProctectedRoute";
import NotFound from "./pages/NotFound";
import AdminForm from "./components/realEstate/AdminForm";
import EditForm from "./components/realEstate/EditForm";
import RealEstateHome from "./pages/RealEstateHome";
import PropertyPage from "./pages/PropertyPage";
import RealEstateAdmin from "./pages/RealEstateAdmin";
import PropertyDetails from "./pages/PropertyDetails";
import EditBookingForm from "./components/form/EditBookingForm";
import Subscription from "./components/Subscription";
import MakePayment from "./components/MakePayment";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/admin/real-estate"
                element={
                  <ProctectedRoute>
                    <RealEstateAdmin />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/admin/subscribe"
                element={
                  <ProctectedRoute>
                    <Subscription />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/admin/makepayment"
                element={
                  <ProctectedRoute>
                    <MakePayment />
                  </ProctectedRoute>
                }
              />
              <Route path="/properties" element={<PropertyPage />} />
              <Route path="/real-estate" element={<RealEstateHome />} />
              <Route
                path="/admin/add"
                element={
                  <ProctectedRoute>
                    <AdminForm />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/admin/edit"
                element={
                  <ProctectedRoute>
                    <EditForm />
                  </ProctectedRoute>
                }
              />
              <Route path="/property-details" element={<PropertyDetails />} />
              <Route
                path="/booking"
                element={
                  <ProctectedRoute>
                    <MakeOrder />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/booking-confirmed"
                element={
                  <ProctectedRoute>
                    <ConfirmBooking />
                  </ProctectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/account"
                element={
                  <ProctectedRoute>
                    <Account />
                  </ProctectedRoute>
                }
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/service" element={<Service />} />
              <Route path="/signup/partner" element={<SignupFormPartner />} />
              <Route path="/signup/verify" element={<SignupVerify />} />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
              />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/admin/booking/edit"
                element={
                  <ProctectedRoute>
                    <EditBookingForm />
                  </ProctectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
