// src/Components/PaymentMethod.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

const PaymentMethod = ({ role }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  useEffect(() => {
    // Fetch payment methods from the server
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment-methods');
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();

    const newPaymentMethod = {
      cardNumber,
      expiryDate,
      cvv,
      cardHolderName,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/payment-methods', newPaymentMethod);
      if (response.status === 200) {
        setPaymentMethods([...paymentMethods, response.data]);
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setCardHolderName('');
      } else {
        console.error('Failed to add payment method');
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
    }
  };

  const handleDeletePaymentMethod = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/payment-methods/${id}`);
      if (response.status === 200) {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      } else {
        console.error('Failed to delete payment method');
      }
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  return (
    <Layout role={role}>
      <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>

      <form onSubmit={handleAddPaymentMethod} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Payment Method</h2>
        <div className="mb-4">
          <label className="block mb-2">Card Holder Name</label>
          <input
            type="text"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="block w-full p-2 border rounded"
            maxLength="16"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block mb-2">Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="block w-full p-2 border rounded"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="block w-full p-2 border rounded"
              maxLength="3"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add Payment Method</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Payment Methods</h2>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
        {paymentMethods.length === 0 ? (
          <p>No payment methods available.</p>
        ) : (
          paymentMethods.map((method) => (
            <div key={method.id} className="flex justify-between items-center mb-4">
              <div>
                <p>{method.cardHolderName}</p>
                <p>**** **** **** {method.cardNumber.slice(-4)}</p>
                <p>Expiry: {method.expiryDate}</p>
              </div>
              <button
                onClick={() => handleDeletePaymentMethod(method.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default PaymentMethod;
