import React from 'react';

function Notifications({ apps, removeNotification }) {
  return (
    <div className="notifications-section">
      {apps.map((app, index) => (
        <div key={index} className="notifications-group">
          <div className="notifications-group-title">
            {app.icon} {app.name}
            <span className="notification-time">{new Date(app.createdAt).toLocaleString()}</span>
          </div>
          {app.notifications.map((notification, idx) => (
            <div key={notification._id} className="notification">
              <div className="notification-content">{notification.notification}</div>
              <div className="notification-text">{notification.text}</div>
              <button className="close-button" onClick={() => removeNotification(app.name, notification._id)}>❌</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Notifications;