import React, { useState } from "react";
import axios from "axios"; // Axios is great for handling API requests.
import { baseURL } from "../../Configs/axios";
import { API_URLS } from "../../Configs/urls";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    link: "",
    recipient: "",
    isGlobal: "true",
    recipientType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const apiUrl = `${baseURL}${API_URLS.Notifiaction}`;

    try {
      const response = await axios.post(apiUrl, formData);
      alert("Notification sent successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white border-4 black rounded-3xl p-10 text-sm text-gray-600 space-y-2"
        onSubmit={handleSubmit}
      >
        <div>
          <span>Notification Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-lg w-full py-1 border-gray-400"
          />
        </div>
        <div>
          <span>Message</span>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border rounded-lg w-full py-1 border-gray-400"
          />
        </div>
        <div>
          <span>Link</span>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="border rounded-lg w-full py-1 border-gray-400"
          />
        </div>
        <div>
          <span>Recipient</span>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            className="border rounded-lg w-full py-1 border-gray-400"
          />
        </div>
        <div>
          <span>isGlobal</span>
          <select
            name="isGlobal"
            value={formData.isGlobal}
            onChange={handleChange}
            className="border rounded-lg w-full py-1 border-gray-400"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div>
          <span>Recipient Type</span>
          <input
            type="text"
            name="recipientType"
            value={formData.recipientType}
            onChange={handleChange}
            className="border rounded-lg w-full py-1 border-gray-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white mt-4 rounded-xl px-6 py-2"
          >
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
