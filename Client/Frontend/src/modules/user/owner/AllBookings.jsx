import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

axios.defaults.withCredentials = true; 

const OwnerAllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();
 const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/owner/getallbookings",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message || "Unauthorized access");
        navigate("/login"); 
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch bookings");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/owner/handlebookingstatus",
        { bookingId, propertyId, status },
        { withCredentials: true }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update booking status");
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
  <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm backdrop-blur-md text-slate-600">
    <thead className="bg-slate-900 text-white">
      <tr>
        <th className="py-3 px-4 text-left">Booking ID</th>
        <th className="py-3 px-4 text-center">Property ID</th>
        <th className="py-3 px-4 text-center">Tenant Name</th>
        <th className="py-3 px-4 text-center">Tenant Phone</th>
        <th className="py-3 px-4 text-center">Booking Status</th>
        <th className="py-3 px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {allBookings.length > 0 ? (
        allBookings.map((booking, idx) => (
          <tr
            key={booking._id}
            className={`border-b border-slate-100 transition duration-200 hover:bg-slate-50 ${
              idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
            }`}
          >
            <td className="py-3 px-4 text-slate-500">{booking._id}</td>
            <td className="py-3 px-4 text-center text-slate-700">{booking.propertyId}</td>
            <td className="py-3 px-4 text-center text-slate-700">{booking.userName}</td>
            <td className="py-3 px-4 text-center text-slate-700">{booking.phone}</td>
            <td
              className={`py-3 px-4 text-center font-semibold ${
                booking.bookingStatus === "booked"
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {booking.bookingStatus}
            </td>
            <td className="py-3 px-4 text-center">
              {booking.bookingStatus === "pending" ? (
                <button
                  onClick={() =>
                    handleStatus(booking._id, booking.propertyId, "booked")
                  }
                  className="rounded-full bg-emerald-600 px-4 py-1 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Mark Booked
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleStatus(booking._id, booking.propertyId, "pending")
                  }
                  className="rounded-full bg-amber-500 px-4 py-1 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  Mark Pending
                </button>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="py-6 px-4 text-center text-gray-400 italic"
          >
            No bookings available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  );
};

export default OwnerAllBookings;
