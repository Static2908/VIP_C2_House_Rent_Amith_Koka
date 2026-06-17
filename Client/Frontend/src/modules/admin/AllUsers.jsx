import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../common/Toast";
import { useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true;

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/getallusers"
      );
      if (response.data.success) {
        setAllUser(response.data.data);
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
        message.error("Failed to fetch Users");
      }
    }
  };

  const handleStatus = async (userid, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/admin/handlestatus",
        { userid, status }
      );

      if (res.data.success) {
        showToast("success", "Status updated successfully");
        getAllUser();
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to update status");
    }
  };

  return (
  <div className="overflow-x-auto relative mt-6">
  {toast.show && (
    <Toast
      type={toast.type}
      message={toast.message}
      onClose={() => setToast({ ...toast, show: false })}
    />
  )}

  <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm backdrop-blur-md">
    <thead className="bg-slate-900 text-white">
      <tr>
        <th className="py-3 px-4 text-left">User ID</th>
        <th className="py-3 px-4 text-center">Name</th>
        <th className="py-3 px-4 text-center">Email</th>
        <th className="py-3 px-4 text-center">Type</th>
        <th className="py-3 px-4 text-center">Granted (Owners Only)</th>
        <th className="py-3 px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {allUser.length > 0 ? (
        allUser.map((user, index) => (
          <tr
            key={user._id}
            className={`transition duration-200 ${
              index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
            } hover:bg-blue-50`}
          >
            <td className="py-2 px-4 border-b border-slate-100 text-slate-500">
              {user._id}
            </td>
            <td className="py-2 px-4 border-b border-slate-100 text-center text-slate-700">
              {user.name}
            </td>
            <td className="py-2 px-4 border-b border-slate-100 text-center text-slate-700">
              {user.email}
            </td>
            <td className="py-2 px-4 border-b border-slate-100 text-center font-medium text-blue-700">
              {user.type}
            </td>
            <td
              className={`py-2 px-4 border-b border-gray-700 text-center font-medium ${
                user.granted === "granted" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {user.granted}
            </td>
            <td className="py-2 px-4 border-b border-gray-700 text-center">
              {user.type === "Owner" && user.granted === "ungranted" && (
                <button
                  onClick={() => handleStatus(user._id, "granted")}
                  className="rounded-full bg-emerald-600 px-3 py-1 text-white transition hover:bg-emerald-700"
                >
                  Grant
                </button>
              )}
              {user.type === "Owner" && user.granted === "granted" && (
                <button
                  onClick={() => handleStatus(user._id, "ungranted")}
                  className="rounded-full bg-rose-600 px-3 py-1 text-white transition hover:bg-rose-700"
                >
                  Ungrant
                </button>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="6"
            className="text-center py-6 text-gray-400 font-medium italic"
          >
            No users found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
};

export default AllUsers;
