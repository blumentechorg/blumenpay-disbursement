"use client";

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditModal = ({ modalContent, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: modalContent.id || modalContent.appId || "",
    description: modalContent.description || "",
    logo: modalContent.logo || "",
    public_id: modalContent.public_id || "",
    appUrl: modalContent.appUrl || "",
    appEmail: modalContent.appEmail || "",
    defaultProvider: modalContent.defaultProvider || "",
    defaultVasProvider: modalContent.defaultVasProvider || "",
    allowCrossPayment:
      typeof modalContent.allowCrossPayment === "boolean"
        ? modalContent.allowCrossPayment
        : false,
  });

  const [providers, setProviders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState(formData.logo);
  const logoInputRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get("/Apps/Providers")
      .then((res) => {
        if (res.data.isSuccess) setProviders(res.data.data);
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // show a local preview
    setLogoPreview(URL.createObjectURL(file));

    // upload to Cloudinary via our API route
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev) => ({
        ...prev,
        logo: data.url,
        public_id: data.public_id,
      }));
      toast.success("Logo uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload logo.");
    }
  };

  const handleRemoveLogo = async () => {
    if (formData.public_id) {
      try {
        await fetch("/api/delete-logo", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: formData.public_id }),
        });
      } catch (err) {
        console.warn("Could not delete on Cloudinary:", err);
      }
    }
    setLogoPreview("");
    setFormData((prev) => ({ ...prev, logo: "", public_id: "" }));
    if (logoInputRef.current) logoInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await axiosInstance.patch("/Apps", formData);
      toast.success("App updated successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Error updating app. Please try again.");
      toast.error("Error updating app. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-3 md:px-0">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-lg w-[800px] max-w-full p-10 space-y-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Edit App</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={modalContent.name || ""}
              readOnly
              className="w-full border rounded px-2 py-1 text-sm bg-gray-100"
            />
          </div>

          {/* ID (read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium">ID</label>
            <input
              type="text"
              value={formData.id}
              readOnly
              className="w-full border rounded px-2 py-1 text-sm bg-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium">Logo</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
              onClick={handleLogoClick}
            >
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  width={100}
                  height={100}
                  className="mx-auto object-contain border rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2 text-gray-500">
                  <FiUpload size={24} />
                  <span className="text-sm">
                    Choose a file or drag & drop it here
                  </span>
                  <span className="text-xs text-gray-400">
                    JPEG, PNG, up to 50MB
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={logoInputRef}
              className="hidden"
              onChange={handleLogoChange}
            />
            {logoPreview && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="text-red-600 text-sm underline mt-2"
              >
                Remove Logo
              </button>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              type="text"
              name="appUrl"
              value={formData.appUrl}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="appEmail"
              value={formData.appEmail}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Default Provider */}
          <div>
            <label className="block text-sm font-medium">
              Default Provider
            </label>
            <select
              name="defaultProvider"
              value={formData.defaultProvider}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            >
              <option value="">Select Provider</option>
              {providers.map((provider, idx) => (
                <option key={idx} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          {/* Default VAS Provider */}
          <div>
            <label className="block text-sm font-medium">
              Default VAS Provider
            </label>
            <select
              name="defaultVasProvider"
              value={formData.defaultVasProvider}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            >
              <option value="">Select Provider</option>
              {providers.map((provider, idx) => (
                <option key={idx} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          {/* Allow Cross Payment */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="allowCrossPayment"
              checked={formData.allowCrossPayment}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium">Allow Cross Payment</label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-sm"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
