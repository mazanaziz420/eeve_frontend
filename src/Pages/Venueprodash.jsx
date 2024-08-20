import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';

const VenueProviderDashboard = () => {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const history = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {

    if (!isAuthenticated) {
      history("/login");
    }

    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/venueProvider/get/makeups');
        console.log('Venues: ', response.data);
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    const fetchBookings = async () => {
      // Add API call to fetch bookings if available
    };

    fetchVenues();
    fetchBookings();
  }, []);

  const handleDeleteVenue = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/venueProvider/${id}`);
      setVenues(venues.filter(venue => venue._id !== id));
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const handleApproveBooking = async (id) => {
    // Add API call to approve booking
  };

  const handleDeclineBooking = async (id) => {
    // Add API call to decline booking
  };

  return (
    <Layout role="venue-provider">
      <h1 className="text-2xl font-bold mb-6">Venue Provider Dashboard</h1>

      {/* Manage Venues Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Manage Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map(venue => (
            <div key={venue._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">{venue.nameOfPlace}</h3>
              <p className="text-gray-600">Location: {venue.city}</p>
              <p className="text-gray-600">Capacity: {venue.capacity}</p>
              <div className="flex justify-between mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteVenue(venue._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Requests Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Booking Requests</h2>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Organizer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td className="p-3">{booking.event}</td>
                <td className="p-3">{booking.organizer}</td>
                <td className="p-3">{booking.date}</td>
                <td className="p-3 text-yellow-500">{booking.status}</td>
                <td className="p-3">
                  <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleApproveBooking(booking._id)}>Approve</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeclineBooking(booking._id)}>Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Profile Management Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Profile Management</h2>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Name: Sarah Connor</p>
          <p className="text-gray-600">Email: sarah.connor@example.com</p>
          <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded">Edit Profile</button>
        </div>
      </section>
    </Layout>
  );
};

export default VenueProviderDashboard;
