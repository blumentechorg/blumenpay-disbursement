// import React, { useState } from "react";
// import axiosInstance from "@/lib/axiosInstance";

// const EditModal = ({ modalContent, onClose, onSuccess }) => {
//   // Pre-fill state with existing row data, falling back to defaults if necessary
//   const [formData, setFormData] = useState({
//     id: modalContent.id || modalContent.appId || "",
//     description: modalContent.description || "",
//     logo: modalContent.logo || "",
//     appUrl: modalContent.appUrl || "",
//     appEmail: modalContent.appEmail || "",
//     defaultProvider: modalContent.defaultProvider || "",
//     defaultVasProvider: modalContent.defaultVasProvider || "",
//     allowCrossPayment:
//       typeof modalContent.allowCrossPayment === "boolean"
//         ? modalContent.allowCrossPayment
//         : false,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // Update form data on input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");

//     try {
//       // Send a PATCH request to /Apps with formData
//       await axiosInstance.patch("/Apps", formData);
//       onSuccess();
//     } catch (err) {
//       setError("Error updating app. Please try again.");
//       console.error("Patch error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         <h2 className="text-xl font-bold mb-4">Edit App (ID: {formData.id})</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Logo URL</label>
//             <input
//               type="text"
//               name="logo"
//               value={formData.logo}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">App URL</label>
//             <input
//               type="text"
//               name="appUrl"
//               value={formData.appUrl}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">App Email</label>
//             <input
//               type="email"
//               name="appEmail"
//               value={formData.appEmail}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default Provider
//             </label>
//             <input
//               type="text"
//               name="defaultProvider"
//               value={formData.defaultProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default VAS Provider
//             </label>
//             <input
//               type="text"
//               name="defaultVasProvider"
//               value={formData.defaultVasProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="allowCrossPayment"
//               checked={formData.allowCrossPayment}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-sm">Allow Cross Payment</label>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "@/lib/axiosInstance";

// const EditModal = ({ modalContent, onClose, onSuccess }) => {
//   // Pre-fill state with existing row data
//   const [formData, setFormData] = useState({
//     id: modalContent.id || modalContent.appId || "",
//     description: modalContent.description || "",
//     logo: modalContent.logo || "",
//     appUrl: modalContent.appUrl || "",
//     appEmail: modalContent.appEmail || "",
//     defaultProvider: modalContent.defaultProvider || "",
//     defaultVasProvider: modalContent.defaultVasProvider || "",
//     allowCrossPayment:
//       typeof modalContent.allowCrossPayment === "boolean"
//         ? modalContent.allowCrossPayment
//         : false,
//   });

//   const [providers, setProviders] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // For logo file upload
//   const [logoPreview, setLogoPreview] = useState(formData.logo);
//   const logoInputRef = useRef(null);

//   // Fetch providers for dropdowns (both default and VAS)
//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         const response = await axiosInstance.get("/Apps/Providers");
//         if (response.data.isSuccess) {
//           setProviders(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching providers:", error);
//       }
//     };
//     fetchProviders();
//   }, []);

//   // Update form data on change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Logo file upload handlers (similar to new business form)
//   const handleLogoClick = () => {
//     if (logoInputRef.current) {
//       logoInputRef.current.click();
//     }
//   };

//   const handleLogoChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setLogoPreview(previewURL);

//       // Prepare file upload
//       const uploadData = new FormData();
//       uploadData.append("file", file);

//       try {
//         const response = await fetch("/api/upload-logo", {
//           method: "POST",
//           body: uploadData,
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setFormData((prev) => ({ ...prev, logo: data.url }));
//         } else {
//           console.error("Error uploading logo:", data.error);
//         }
//       } catch (error) {
//         console.error("Upload error:", error);
//       }
//     }
//   };

//   const handleRemoveLogo = () => {
//     setLogoPreview("");
//     setFormData((prev) => ({ ...prev, logo: "" }));
//     if (logoInputRef.current) {
//       logoInputRef.current.value = null;
//     }
//   };

//   // Handle form submission with PATCH
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     try {
//       await axiosInstance.patch("/Apps", formData);
//       onSuccess();
//     } catch (err) {
//       setError("Error updating app. Please try again.");
//       console.error("Patch error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         {/* Display the ID as read-only info */}
//         <div className="mb-4">
//           <span className="text-sm font-medium">ID:</span>{" "}
//           <span className="text-sm">{formData.id}</span>
//         </div>
//         <h2 className="text-xl font-bold mb-4">Edit App</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Logo</label>
//             <div className="flex items-center space-x-2">
//               {logoPreview ? (
//                 <img
//                   src={logoPreview}
//                   alt="Logo Preview"
//                   className="w-16 h-16 object-contain border rounded"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-sm">No logo uploaded</span>
//               )}
//               <div>
//                 <button
//                   type="button"
//                   onClick={handleLogoClick}
//                   className="text-blue-600 text-sm underline"
//                 >
//                   Upload Logo
//                 </button>
//                 {logoPreview && (
//                   <button
//                     type="button"
//                     onClick={handleRemoveLogo}
//                     className="text-red-600 text-sm underline ml-2"
//                   >
//                     Remove
//                   </button>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={logoInputRef}
//                   className="hidden"
//                   onChange={handleLogoChange}
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">App URL</label>
//             <input
//               type="text"
//               name="appUrl"
//               value={formData.appUrl}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">App Email</label>
//             <input
//               type="email"
//               name="appEmail"
//               value={formData.appEmail}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default Provider
//             </label>
//             <select
//               name="defaultProvider"
//               value={formData.defaultProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             >
//               <option value="">Select Provider</option>
//               {providers.map((provider, index) => (
//                 <option key={index} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default VAS Provider
//             </label>
//             <select
//               name="defaultVasProvider"
//               value={formData.defaultVasProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             >
//               <option value="">Select Provider</option>
//               {providers.map((provider, index) => (
//                 <option key={index} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="allowCrossPayment"
//               checked={formData.allowCrossPayment}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Allow Cross Payment</label>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-sm"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "@/lib/axiosInstance";

// const EditModal = ({ modalContent, onClose, onSuccess }) => {
//   // Pre-fill state with existing row data
//   const [formData, setFormData] = useState({
//     id: modalContent.id || modalContent.appId || "",
//     description: modalContent.description || "",
//     logo: modalContent.logo || "",
//     appUrl: modalContent.appUrl || "",
//     appEmail: modalContent.appEmail || "",
//     defaultProvider: modalContent.defaultProvider || "",
//     defaultVasProvider: modalContent.defaultVasProvider || "",
//     allowCrossPayment:
//       typeof modalContent.allowCrossPayment === "boolean"
//         ? modalContent.allowCrossPayment
//         : false,
//   });

//   const [providers, setProviders] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // For logo file upload
//   const [logoPreview, setLogoPreview] = useState(formData.logo);
//   const logoInputRef = useRef(null);

//   // Fetch providers for dropdowns (both default and VAS)
//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         const response = await axiosInstance.get("/Apps/Providers");
//         if (response.data.isSuccess) {
//           setProviders(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching providers:", error);
//       }
//     };
//     fetchProviders();
//   }, []);

//   // Update form data on change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Logo file upload handlers (similar to new business form)
//   const handleLogoClick = () => {
//     if (logoInputRef.current) {
//       logoInputRef.current.click();
//     }
//   };

//   const handleLogoChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setLogoPreview(previewURL);

//       // Prepare file upload
//       const uploadData = new FormData();
//       uploadData.append("file", file);

//       try {
//         const response = await fetch("/api/upload-logo", {
//           method: "POST",
//           body: uploadData,
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setFormData((prev) => ({ ...prev, logo: data.url }));
//         } else {
//           console.error("Error uploading logo:", data.error);
//         }
//       } catch (error) {
//         console.error("Upload error:", error);
//       }
//     }
//   };

//   const handleRemoveLogo = () => {
//     setLogoPreview("");
//     setFormData((prev) => ({ ...prev, logo: "" }));
//     if (logoInputRef.current) {
//       logoInputRef.current.value = null;
//     }
//   };

//   // Handle form submission with PATCH
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     try {
//       await axiosInstance.patch("/Apps", formData);
//       onSuccess();
//     } catch (err) {
//       setError("Error updating app. Please try again.");
//       console.error("Patch error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//         {/* Display the ID as read-only info */}
//         <div className="mb-4">
//           <span className="text-sm font-medium">ID:</span>{" "}
//           <span className="text-sm">{formData.id}</span>
//         </div>
//         <h2 className="text-xl font-bold mb-4">Edit App</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Logo</label>
//             <div className="flex items-center space-x-2">
//               {logoPreview ? (
//                 <img
//                   src={logoPreview}
//                   alt="Logo Preview"
//                   className="w-16 h-16 object-contain border rounded"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-sm">No logo uploaded</span>
//               )}
//               <div>
//                 <button
//                   type="button"
//                   onClick={handleLogoClick}
//                   className="text-blue-600 text-sm underline"
//                 >
//                   Upload Logo
//                 </button>
//                 {logoPreview && (
//                   <button
//                     type="button"
//                     onClick={handleRemoveLogo}
//                     className="text-red-600 text-sm underline ml-2"
//                   >
//                     Remove
//                   </button>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={logoInputRef}
//                   className="hidden"
//                   onChange={handleLogoChange}
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">App URL</label>
//             <input
//               type="text"
//               name="appUrl"
//               value={formData.appUrl}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">App Email</label>
//             <input
//               type="email"
//               name="appEmail"
//               value={formData.appEmail}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default Provider
//             </label>
//             <select
//               name="defaultProvider"
//               value={formData.defaultProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             >
//               <option value="">Select Provider</option>
//               {providers.map((provider, index) => (
//                 <option key={index} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default VAS Provider
//             </label>
//             <select
//               name="defaultVasProvider"
//               value={formData.defaultVasProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             >
//               <option value="">Select Provider</option>
//               {providers.map((provider, index) => (
//                 <option key={index} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="allowCrossPayment"
//               checked={formData.allowCrossPayment}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Allow Cross Payment</label>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-sm"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "@/lib/axiosInstance";
// import Image from "next/image";

// const EditModal = ({ modalContent, onClose, onSuccess }) => {
//   // Only include the fields from the response body for editing.
//   const [formData, setFormData] = useState({
//     id: modalContent.id || modalContent.appId || "",
//     description: modalContent.description || "",
//     logo: modalContent.logo || "",
//     appUrl: modalContent.appUrl || "",
//     appEmail: modalContent.appEmail || "",
//     defaultProvider: modalContent.defaultProvider || "",
//     defaultVasProvider: modalContent.defaultVasProvider || "",
//     allowCrossPayment:
//       typeof modalContent.allowCrossPayment === "boolean"
//         ? modalContent.allowCrossPayment
//         : false,
//   });

//   const [providers, setProviders] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // For logo file upload
//   const [logoPreview, setLogoPreview] = useState(formData.logo);
//   const logoInputRef = useRef(null);

//   // Fetch providers to populate the dropdowns for defaultProvider and defaultVasProvider.
//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         const response = await axiosInstance.get("/Apps/Providers");
//         if (response.data.isSuccess) {
//           setProviders(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching providers:", error);
//       }
//     };
//     fetchProviders();
//   }, []);

//   // Update form data on input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Logo file upload handlers
//   const handleLogoClick = () => {
//     if (logoInputRef.current) {
//       logoInputRef.current.click();
//     }
//   };

//   const handleLogoChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setLogoPreview(previewURL);

//       const uploadData = new FormData();
//       uploadData.append("file", file);

//       try {
//         const response = await fetch("/api/upload-logo", {
//           method: "POST",
//           body: uploadData,
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setFormData((prev) => ({ ...prev, logo: data.url }));
//         } else {
//           console.error("Error uploading logo:", data.error);
//         }
//       } catch (error) {
//         console.error("Upload error:", error);
//       }
//     }
//   };

//   const handleRemoveLogo = () => {
//     setLogoPreview("");
//     setFormData((prev) => ({ ...prev, logo: "" }));
//     if (logoInputRef.current) {
//       logoInputRef.current.value = null;
//     }
//   };

//   // Handle form submission with PATCH method
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     try {
//       await axiosInstance.patch("/Apps", formData);
//       onSuccess();
//     } catch (err) {
//       setError("Error updating app. Please try again.");
//       console.error("Patch error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 ">
//         <h2 className="text-xl font-bold mb-4">Edit App</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4 ">
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               value={formData.id}
//               readOnly
//               className="w-full border rounded px-2 py-1 text-sm bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Logo</label>
//             <div className="flex items-center space-x-2">
//               {logoPreview ? (
//                 <Image
//                   src={logoPreview}
//                   alt="Logo Preview"
//                   layout="responsive"
//                   width={100}
//                   height={100}
//                   className="object-contain border rounded-md"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-sm">No logo uploaded</span>
//               )}
//               <div>
//                 <button
//                   type="button"
//                   onClick={handleLogoClick}
//                   className="text-blue-600 text-sm underline"
//                 >
//                   Upload Logo
//                 </button>
//                 {logoPreview && (
//                   <button
//                     type="button"
//                     onClick={handleRemoveLogo}
//                     className="text-red-600 text-sm underline ml-2"
//                   >
//                     Remove
//                   </button>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={logoInputRef}
//                   className="hidden"
//                   onChange={handleLogoChange}
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Website</label>
//             <input
//               type="text"
//               name="appUrl"
//               value={formData.appUrl}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="appEmail"
//               value={formData.appEmail}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default Provider
//             </label>
//             <select
//               name="defaultProvider"
//               value={formData.defaultProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             >
//               <option value="">Select Provider</option>
//               {providers.map((provider, index) => (
//                 <option key={index} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Default VAS Provider
//             </label>
//             <select
//               name="defaultVasProvider"
//               value={formData.defaultVasProvider}
//               onChange={handleChange}
//               className="w-full border rounded px-2 py-1 text-sm"
//               required
//             >
//               <option value="">Select Provider</option>
//               {providers.map((provider, index) => (
//                 <option key={index} value={provider}>
//                   {provider}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="allowCrossPayment"
//               checked={formData.allowCrossPayment}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Allow Cross Payment</label>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-sm"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

"use client";

import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

const EditModal = ({ modalContent, onClose, onSuccess }) => {
  // Only include the fields from the response body for editing.
  const [formData, setFormData] = useState({
    id: modalContent.id || modalContent.appId || "",
    description: modalContent.description || "",
    logo: modalContent.logo || "",
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

  // For logo file upload
  const [logoPreview, setLogoPreview] = useState(formData.logo);
  const logoInputRef = useRef(null);

  // Fetch providers to populate the dropdowns for defaultProvider and defaultVasProvider.
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axiosInstance.get("/Apps/Providers");
        if (response.data.isSuccess) {
          setProviders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Logo file upload handlers
  const handleLogoClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);

      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const response = await fetch("/api/upload-logo", {
          method: "POST",
          body: uploadData,
        });
        const data = await response.json();
        if (response.ok) {
          setFormData((prev) => ({ ...prev, logo: data.url }));
        } else {
          console.error("Error uploading logo:", data.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview("");
    setFormData((prev) => ({ ...prev, logo: "" }));
    if (logoInputRef.current) {
      logoInputRef.current.value = null;
    }
  };

  // Handle form submission with PATCH method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await axiosInstance.patch("/Apps", formData);
      onSuccess();
    } catch (err) {
      setError("Error updating app. Please try again.");
      console.error("Patch error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {/* Updated container with moderate dimensions */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between sticky">
          <h2 className="text-xl font-bold mb-4 justify-between">Edit App</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name as non-editable field */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={modalContent.name || ""}
              readOnly
              className="w-full border rounded px-2 py-1 text-sm bg-gray-100"
            />
          </div>
          {/* Read-only ID field */}
          <div className="mb-4">
            <label className="block text-sm font-medium">ID</label>
            <input
              type="text"
              value={formData.id}
              readOnly
              className="w-full border rounded px-2 py-1 text-sm bg-gray-100"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium">Logo</label>
            <div className="flex items-center space-x-2">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-contain border rounded-md"
                />
              ) : (
                <span className="text-gray-500 text-sm">No logo uploaded</span>
              )}
              <div>
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="text-blue-600 text-sm underline"
                >
                  Upload Logo
                </button>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-red-600 text-sm underline ml-2"
                  >
                    Remove
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </div>
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
              {providers.map((provider, index) => (
                <option key={index} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
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
              {providers.map((provider, index) => (
                <option key={index} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
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
