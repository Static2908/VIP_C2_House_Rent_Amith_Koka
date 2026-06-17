import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const AdminAllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();

  const getAllBooking = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/getallbookings",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message || "Unauthorized access");
        navigate("/login"); 
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch bookings");
      }
    }
  };


  useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm backdrop-blur-md">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Booking ID</th>
            <th className="py-3 px-4 text-center">Owner ID</th>
            <th className="py-3 px-4 text-center">Property ID</th>
            <th className="py-3 px-4 text-center">Tenant ID</th>
            <th className="py-3 px-4 text-center">Tenant Name</th>
            <th className="py-3 px-4 text-center">Tenant Contact</th>
            <th className="py-3 px-4 text-center">Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {allBookings.length > 0 ? (
            allBookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`transition duration-200 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  } hover:bg-blue-50`}
              >
                <td className="py-2 px-4 border-b border-slate-100 text-slate-500">
                  {booking._id}
                </td>
                <td className="py-2 px-4 border-b border-slate-100 text-center text-slate-700">
                  {booking.ownerID}
                </td>
                <td className="py-2 px-4 border-b border-slate-100 text-center font-medium text-blue-700">
                  {booking.propertyId}
                </td>
                <td className="py-2 px-4 border-b border-slate-100 text-center text-slate-700">
                  {booking.userID}
                </td>
                <td className="py-2 px-4 border-b border-slate-100 text-center text-slate-700">
                  {booking.userName}
                </td>
                <td className="py-2 px-4 border-b border-slate-100 text-center text-slate-700">
                  {booking.phone}
                </td>
                <td
                  className={`py-2 px-4 border-b border-slate-100 text-center font-semibold ${booking.bookingStatus === "Confirmed"
                      ? "text-emerald-600"
                      : booking.bookingStatus === "Pending"
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                >
                  {booking.bookingStatus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-400 font-medium italic"
              >
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllBookings;
