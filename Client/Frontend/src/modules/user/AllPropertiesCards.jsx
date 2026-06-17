import axios from "axios";
import React, { useState, useEffect } from "react";
import Toast from "../common/Toast";


const AllPropertiesCards = ({ loggedIn }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState("");
  const [filterPropertyAdType, setPropertyAdType] = useState("");
  const [filterPropertyAddress, setPropertyAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userDetails, setUserDetails] = useState({ fullName: "", phone: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const getAllProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/user/getAllProperties",
        { withCredentials: true }
      );
      setAllProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      const res = await axios.post(
        `http://localhost:8001/api/user/bookinghandle/${propertyId}`,
        { userDetails, status, ownerId },
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);
        setShowModal(false);
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Booking failed");
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const filteredProperties = allProperties
    .filter(
      (property) =>
        filterPropertyAddress === "" ||
        property.propertyAddress
          .toLowerCase()
          .includes(filterPropertyAddress.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyAdType === "" ||
        property.propertyAdType
          .toLowerCase()
          .includes(filterPropertyAdType.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyType === "" ||
        property.propertyType
          .toLowerCase()
          .includes(filterPropertyType.toLowerCase())
    );

  const openModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="px-4 py-6 text-slate-700 sm:px-6 lg:px-0">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <input
          type="text"
          placeholder="Search by Address"
          value={filterPropertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          className="househunt-input w-full rounded-2xl px-4 py-3 placeholder-slate-400 lg:w-1/3"
        />
        <select
          value={filterPropertyAdType}
          onChange={(e) => setPropertyAdType(e.target.value)}
          className="househunt-select rounded-2xl px-4 py-3 text-slate-700"
        >
          <option value="">All Ad Types</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select
          value={filterPropertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="househunt-select rounded-2xl px-4 py-3 text-slate-700"
        >
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
          <option value="residential">Residential</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.16)]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={`http://localhost:8001${property.propertyImage[0]?.path}`}
                  alt="Property"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent"></div>
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="househunt-badge bg-white/95 text-slate-700 shadow-sm">
                    {property.propertyAdType}
                  </span>
                  <span className="househunt-badge bg-emerald-500 text-white shadow-sm">
                    {property.isAvailable}
                  </span>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">{property.propertyAddress}</h3>
                <p className="text-sm text-slate-500">
                  {property.propertyType} - {property.propertyAdType}
                </p>
                {loggedIn && (
                  <>
                    <p className="mt-2 text-sm text-slate-600">
                      <b>Owner:</b> {property.ownerContact}
                    </p>
                    <p className="text-sm text-slate-600">
                      <b>Availability:</b> {property.isAvailable}
                    </p>
                    <p className="text-sm text-slate-600">
                      <b>Price:</b> ₹{property.propertyAmt}
                    </p>
                  </>
                )}
                {property.isAvailable === "Available" ? (
                  loggedIn ? (
                    <button
                      onClick={() => openModal(property)}
                      className="househunt-primary-btn mt-2 w-full rounded-2xl py-3 font-semibold transition"
                    >
                      Get Info / Book
                    </button>
                  ) : (
                    <p className="mt-2 text-xs font-medium text-amber-600">
                      Login to see details
                    </p>
                  )
                ) : (
                  <p className="mt-2 text-xs font-medium text-rose-600">Not Available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No properties available at the moment.</p>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="househunt-card relative w-full max-w-2xl rounded-[1.75rem] p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-3 top-3 text-slate-400 transition hover:text-slate-800"
            >
              ✖
            </button>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Property Info</h3>
            <img
              src={`http://localhost:8001${selectedProperty.propertyImage[0]?.path}`}
              alt="Property"
              className="mb-4 h-52 w-full rounded-3xl object-cover"
            />
            <div className="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-2">
              <div>
                <p>
                  <b>Owner Contact:</b> {selectedProperty.ownerContact}
                </p>
                <p>
                  <b>Availability:</b> {selectedProperty.isAvailable}
                </p>
                <p>
                  <b>Price:</b> ₹{selectedProperty.propertyAmt}
                </p>
              </div>
              <div>
                <p>
                  <b>Location:</b> {selectedProperty.propertyAddress}
                </p>
                <p>
                  <b>Type:</b> {selectedProperty.propertyType}
                </p>
                <p>
                  <b>Ad Type:</b> {selectedProperty.propertyAdType}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              <b>Additional Info:</b> {selectedProperty.additionalInfo}
            </p>

            {/* Booking Form */}
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleBooking("pending", selectedProperty._id, selectedProperty.ownerId);
              }}
            >
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                required
                className="househunt-input w-full rounded-2xl p-3 placeholder-slate-400"
                value={userDetails.fullName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, fullName: e.target.value })
                }
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                required
                className="househunt-input w-full rounded-2xl p-3 placeholder-slate-400"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
              />
              <button
                type="submit"
                className="househunt-primary-btn w-full rounded-2xl py-3 font-semibold transition"
              >
                Book Property
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesCards;
