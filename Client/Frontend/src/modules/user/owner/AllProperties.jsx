import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const OwnerAllProperties = () => {
  const [image, setImage] = useState(null);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editingPropertyData, setEditingPropertyData] = useState({
    propertyType: "",
    propertyAdType: "",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = (property) => {
    setEditingPropertyId(property._id);
    setEditingPropertyData(property);
    setShow(true);
  };

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/owner/getallproperties",
        { withCredentials: true }
      );
      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error("Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch properties");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async (propertyId, status) => {
  try {
    const formData = new FormData();

    formData.append("propertyType", editingPropertyData.propertyType || "");
    formData.append("propertyAdType", editingPropertyData.propertyAdType || "");
    formData.append("propertyAddress", editingPropertyData.propertyAddress || "");
    formData.append("ownerContact", editingPropertyData.ownerContact || "");
    formData.append("propertyAmt", editingPropertyData.propertyAmt || 0);
    formData.append("additionalInfo", editingPropertyData.additionalInfo || "");
    formData.append("isAvailable", status);

    if (image) {
      formData.append("propertyImage", image);
    }
    const user = JSON.parse(localStorage.getItem("user"));

if (!user?._id) {
  message.error("Please login again");
  navigate("/login");
  return;
}

formData.append("userId", user._id);

    const res = await axios.patch(
      `http://localhost:8001/api/owner/updateproperty/${propertyId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      message.success(res.data.message);
      handleClose();
      getAllProperty();
    } else {
      message.error(res.data.message || "Failed to update property");
    }
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    console.log("SERVER RESPONSE:", error.response?.data);

    if (error.response?.status === 401) {
      message.error("Session expired, please login again");
      navigate("/login");
    } else {
      message.error(
        error.response?.data?.message || "Failed to save changes"
      );
    }
  }
};

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8001/api/owner/deleteproperty/${propertyId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          message.success(response.data.message);
          getAllProperty();
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
          message.error("Failed to delete property");
        }
      }
    }
  };


  return (
   <div className="p-4 sm:p-6">
  <div className="overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white shadow-sm backdrop-blur-md">
    <table className="w-full text-left text-sm text-slate-600">
      <thead className="bg-slate-900 text-white">
        <tr>
          <th className="px-4 py-3">Property ID</th>
          <th className="px-4 py-3 text-center">Property Type</th>
          <th className="px-4 py-3 text-center">Ad Type</th>
          <th className="px-4 py-3 text-center">Address</th>
          <th className="px-4 py-3 text-center">Owner Contact</th>
          <th className="px-4 py-3 text-center">Amount</th>
          <th className="px-4 py-3 text-center">Availability</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {allProperties.map((property) => (
          <tr
            key={property._id}
            className="border-b border-slate-100 transition duration-200 hover:bg-slate-50"
          >
            <td className="px-4 py-3 text-slate-500">{property._id}</td>
            <td className="px-4 py-3 text-center text-slate-700">{property.propertyType}</td>
            <td className="px-4 py-3 text-center text-slate-700">{property.propertyAdType}</td>
            <td className="px-4 py-3 text-center text-slate-700">{property.propertyAddress}</td>
            <td className="px-4 py-3 text-center text-slate-700">{property.ownerContact}</td>
            <td className="px-4 py-3 text-center font-semibold text-emerald-600">₹{property.propertyAmt}</td>
            <td
              className={`px-4 py-3 text-center font-semibold ${
                property.isAvailable === "Available"
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {property.isAvailable}
            </td>
            <td className="px-4 py-3 flex gap-2 justify-center">
              <button
                onClick={() => handleShow(property)}
                className="rounded-full border border-blue-200 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="rounded-full border border-rose-200 px-3 py-1 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Edit Modal */}
  {show && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="househunt-card w-full max-w-xl rounded-[1.75rem] p-6 text-slate-700">
        <h3 className="mb-6 text-2xl font-bold text-slate-900">Edit Property</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveChanges(editingPropertyId, editingPropertyData.isAvailable);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="propertyType"
            value={editingPropertyData.propertyType}
            onChange={handleChange}
            placeholder="Property Type"
            className="househunt-input w-full rounded-xl px-3 py-3 placeholder-slate-400"
          />
          <input
            type="text"
            name="propertyAdType"
            value={editingPropertyData.propertyAdType}
            onChange={handleChange}
            placeholder="Ad Type"
            className="househunt-input w-full rounded-xl px-3 py-3 placeholder-slate-400"
          />
          <input
            type="text"
            name="propertyAddress"
            value={editingPropertyData.propertyAddress}
            onChange={handleChange}
            placeholder="Property Address"
            className="househunt-input w-full rounded-xl px-3 py-3 placeholder-slate-400"
          />
          <input
            type="text"
            name="ownerContact"
            value={editingPropertyData.ownerContact}
            onChange={handleChange}
            placeholder="Owner Contact"
            className="househunt-input w-full rounded-xl px-3 py-3 placeholder-slate-400"
          />
          <input
            type="number"
            name="propertyAmt"
            value={editingPropertyData.propertyAmt}
            onChange={handleChange}
            placeholder="Property Amount"
            className="househunt-input w-full rounded-xl px-3 py-3 placeholder-slate-400"
          />
          <textarea
            name="additionalInfo"
            value={editingPropertyData.additionalInfo}
            onChange={handleChange}
            placeholder="Additional Info"
            className="border border-gray-700 bg-gray-800/70 text-white px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="househunt-input w-full cursor-pointer rounded-xl px-3 py-3 text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-white hover:file:bg-blue-700"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="househunt-primary-btn rounded-full px-4 py-2 font-semibold transition shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

export default OwnerAllProperties;

