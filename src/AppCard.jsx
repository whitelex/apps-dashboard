import React, { useEffect, useState } from 'react';
import { formatUptime } from '../utils/formatUptime';

function AppCard({ app, onClick }) {
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const response = await fetch(app.url);
        if (!response.ok) {
          setHealthStatus({ up_time: 'down' });
          return;
        }
        const data = await response.json();
        setHealthStatus(data);
      } catch (error) {
        setHealthStatus({ up_time: 'down' });
      }
    };

    fetchHealthStatus();
    const intervalId = setInterval(fetchHealthStatus, 60000); // 60000 ms = 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [app.url]);

  const status = healthStatus && healthStatus.up_time === 'down' ? 'down' : 'running';
  const uptimeText = !app.uptime ? formatUptime(app.createdAt) : '';

  return (
    <div className="app-card" onClick={onClick}>
      <div className="app-name">
        {app.name}
        {app.notifications && app.notifications.length > 0 && (
          <span className="notification-badge">{app.notifications.length}</span>
        )}
      </div>
      <div className="app-description">{app.description}</div>
      <div className="status">
        <div className={`status-dot status-${status}`}></div>
        <span className="status-text">
          {healthStatus && healthStatus.up_time === 'down'
            ? 'Service stopped'
            : `Service up`}
        </span>
      </div>
      {app.uptime && healthStatus && healthStatus.up_time !== 'down' && (
        <div className="status-uptime">
          <span>{healthStatus.up_time}</span>
        </div>
      )}
      {!app.uptime && (
        <div className="status-uptime">
          <span>{uptimeText}</span>
        </div>
      )}
    </div>
  );
}

export default AppCard;