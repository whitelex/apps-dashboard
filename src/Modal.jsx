import React, { useState } from 'react';
import axios from 'axios';

function Modal({ onClose, onAddApp }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [uptime, setUptime] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApp = {
      name: name,
      description: description,
      url: url,
      status: "stopped",
      notifications: [],
      method: method,
      uptime: uptime
    };

    try {
      const response = await axios.post('http://localhost:5000/api/apps', newApp);
      onAddApp(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding app:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New App</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            URL:
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
          </label>
          <label>
            Method:
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </label>
          <label className="checkbox-label">
            Has UpTime information:
            <input type="checkbox" checked={uptime} onChange={(e) => setUptime(e.target.checked)} />
          </label>
          <button type="submit">Add App</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;