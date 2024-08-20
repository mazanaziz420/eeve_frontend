import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail, AiTwotonePhone } from "react-icons/ai";
import sendEmail from '../Components/Email'; // Adjust the path if needed

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(formData);
      setStatusMessage('Your message has been sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        contact: '',
        message: '',
      });
    } catch (error) {
      setStatusMessage(`Failed to send your message: ${error.text}`);
    }
  };

  return (
    <div>
      {/* <div className="relative">
        <img
          src="/../images/21.jpg"
          alt="/"
          className="w-full h-[25vh] opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
          Contact Us
        </div>
      </div> */}

      <div className='border-b-2 border-cyan-900 w-40 ms-14 px-4 py-2 '>
        <h1 className='font-bold text-zinc-500 text-xl'>Contact Us</h1>
      </div>

      <div className="grid grid-cols-3 mb-10 gap-8 mt-10 ">
        <div className="col-span-1 ms-16 w-[50vh]">
          <div className="bg-slate-100 opacity-95 p-12 shadow-md">
            <p className="text-slate-600 text-lg mb-2">
              <IoLocationOutline />
              <strong>Address:</strong>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Hajj+Complex,+I-14/3+I-14,+Islamabad,+Islamabad+Capital+Territory+46000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-700 hover:underline"
              >
                Hajj Complex, I-14/3 I-14, Islamabad, Islamabad Capital Territory 46000
              </a>
            </p>
            <div className='border-b-2 border-zinc-400 w-50 px-4 mt-6'> </div>
            <p className="text-slate-600 text-lg mb-2 mt-3">
              <AiOutlineMail />
              <strong>Email us:</strong>
              <a 
                href="mailto:26404@students.riphah.edu.pk"
                className="text-cyan-700 hover:underline"
              >
                26404@students.riphah.edu.pk
              </a>
            </p>
            <div className='border-b-2 border-zinc-400 w-50 px-4 mt-6'> </div>
            <p className="text-slate-600 text-lg mt-3">
              <AiTwotonePhone />
              <strong>Phone:</strong>
              <a 
                href="tel:+923322757328"
                className="text-cyan-700 hover:underline"
              >
                +92 332 2757328
              </a>
            </p>
          </div>
        </div>

        <div className="col-span-1 ms-4 w-[110vh]">
          <div className="bg-slate-100 opacity-95 p-14 text-lg shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="firstName" className="block text-gray-600 font-semibold"></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-cyan-500"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="lastName" className="block text-gray-600 font-semibold"></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-cyan-500"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="contact" className="block text-gray-600 font-semibold"></label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-cyan-500"
                    placeholder="Phone or Email"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="message" className="block text-gray-600 font-semibold"></label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-cyan-500"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="bg-cyan-700 text-white w-full mt-4 py-2 hover:bg-cyan-700 focus:outline-none focus:ring focus:border-cyan-500"
              >
                Submit Now
              </button>
            </form>
            {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
          </div>
        </div>
      </div>

      <Link to="/contact"></Link>
    </div>
  );
}

export default Contact;
