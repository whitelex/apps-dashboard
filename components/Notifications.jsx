import React from 'react';

function Notifications({ apps, removeNotification }) {
  return (
    <div className="notifications-section">
      {apps.map((app, index) => (
        app.notifications.length > 0 && (
          <div key={index} className="notifications-group">
            <div className="notifications-group-title">
              {app.icon} {app.name}
            </div>
            {app.notifications.map((notification, idx) => (
              <div key={notification._id} className="notification">
                <div className="notification-time">
                  <div className="notification-content">
                  {new Date(notification.time).toLocaleString()} 
                    
                  </div>
                  <span className="notification-header">
                  {notification.notification}<button className="close-button" onClick={() => removeNotification(app.name, notification._id)}>❌</button>
                  </span>
                </div>
                <div className="notification-text">
                  {notification.text}
                </div>
              </div>
            ))}
          </div>
        )
      ))}
    </div>
  );
}

export default Notifications;