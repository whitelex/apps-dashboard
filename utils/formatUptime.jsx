export function formatUptime(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diff = now - createdDate;
    const diffInMinutes = Math.floor(diff / 60000);
    const minutes = diffInMinutes % 60;
    const hours = Math.floor(diffInMinutes / 60) % 24;
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} days ${hours} hours ${minutes} minutes`;
  }