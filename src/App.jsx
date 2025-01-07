import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppCard from './AppCard';
import Modal from './Modal';
import Notifications from '../components/Notifications';

function App() {
  const [apps, setApps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/apps`);
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      }
    };

    fetchApps();
  }, []);

  const handleAddAppClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddApp = (newApp) => {
    setApps([...apps, newApp]);
    setIsModalOpen(false);
  };

  const handleCardClick = (appName) => {
    console.log('Card clicked:', appName);
  };

  const removeNotification = async (appName, notificationId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/apps/${appName}/notifications/${notificationId}`);
      const updatedApps = apps.map(app => {
        if (app.name === appName) {
          return {
            ...app,
            notifications: app.notifications.filter(n => n._id !== notificationId)
          };
        }
        return app;
      });
      setApps(updatedApps);
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Home Services Dashboard</h1>
      </div>
      <div className="apps-grid">
        {apps.map((app, index) => (
          <AppCard key={index} app={app} onClick={() => handleCardClick(app.name)} />
        ))}
        <div className="add-app-card" onClick={handleAddAppClick}>
          <div className="add-app-icon">+</div>
        </div>
      </div>
      <Notifications apps={apps} removeNotification={removeNotification} />
      {isModalOpen && <Modal onClose={handleCloseModal} onAddApp={handleAddApp} />}
    </div>
  );
}

export default App;