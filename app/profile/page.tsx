"use client";

import React, { useState } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-20">
      <div className="text-sm text-gray-400 mb-2">Home / My Account</div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-6 text-sm font-medium text-gray-600">
          <div>
            <div className="text-black mb-1 font-semibold">Manage My Account</div>
            <ul className="space-y-2">
              <li className="text-red-500 cursor-pointer">My Profile</li>
              <li className="hover:text-red-400 cursor-pointer">Address Book</li>
              <li className="hover:text-red-400 cursor-pointer">My Payment Options</li>
            </ul>
          </div>

          <div>
            <div className="text-black mb-1 font-semibold">My Orders</div>
            <ul className="space-y-2">
              <li className="hover:text-red-400 cursor-pointer">My Returns</li>
              <li className="hover:text-red-400 cursor-pointer">My Cancellations</li>
            </ul>
          </div>

          <div>
            <div className="text-black mb-1 font-semibold">My Wishlist</div>
          </div>
        </div>

        {/* Main Form */}
        <div className="flex-1 border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-red-500 mb-6">Edit Your Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">Password Changes</h3>

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mt-6 flex justify-end items-center gap-3">
            <button className="text-sm text-gray-500 hover:underline">Cancel</button>
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
