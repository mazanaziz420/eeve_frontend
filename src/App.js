import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Career from './Components/Career';
import DescriptionPage from './Components/Description';
import Auth from './Components/SigninSignup'; // Updated import
import MainApp from './Pages/Addlistings';
import CustomerDashboard from './Pages/CustomerDash';
import EventOrganizerDashboard from './Pages/Eventorgdash';
import VenueProviderDashboard from './Pages/Venueprodash';
import StaffDashboard from './Pages/Staffdash';
import EditProfile from './Pages/Editprofile';

import PaymentMethod from './Components/PaymentMethod';
import './index.css';
import SigninSignup from './Components/SigninSignup';
import PrivateRoute from './PrivateRoute/PrivateRoute';


function AppRoutes() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="/description/:category/:id" element={<DescriptionPage />} />
          <Route path="/signinsignup" element={<Auth />} /> {/* Updated route */}
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/event-organizer" element={<EventOrganizerDashboard />} />
          <Route path="/venue" element={<VenueProviderDashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/MainApp" element={<MainApp />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="*" element={<SigninSignup />} /> {/* Updated route */}
        </Routes>
        <ToastContainer
          position="top-center" // This positions the toast at the top center
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
      </div>
    </Router>
  );
}

export default AppRoutes;
