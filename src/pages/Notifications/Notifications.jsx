// ===== Notifications Page =====
// Displays all notifications: new messages, product sold, new favorites, report updates.
// Uses dummy data from data/notifications.js.
// Unread notifications are highlighted. User can mark all as read.

import { useState } from "react";
import {
  FaComment, FaHeart, FaCheck, FaFlag, FaInfoCircle,
  FaCheckDouble, FaBell,
} from "react-icons/fa";
import { notifications as dummyNotifications } from "../../data/notifications";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./Notifications.css";

function Notifications() {
  // State: notifications list (start with dummy data)
  const [notifications, setNotifications] = useState(dummyNotifications);

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Map notification type to icon
  const getIcon = (type) => {
    switch (type) {
      case "message": return <FaComment />;
      case "favorite": return <FaHeart />;
      case "sold": return <FaCheck />;
      case "report": return <FaFlag />;
      default: return <FaInfoCircle />;
    }
  };

  // Format time to a readable string
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return "Just now";
  };

  // Count unread
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-page page-fade">
      <div className="notifications-container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Notifications" },
          ]}
        />

        {/* Header */}
        <div className="notifications-header">
          <div>
            <h1 className="notifications-title">
              <FaBell /> Notifications
            </h1>
            <p className="notifications-subtitle">
              {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button className="notifications-mark-all" onClick={markAllAsRead}>
              <FaCheckDouble /> Mark All as Read
            </button>
          )}
        </div>

        {/* Notifications list */}
        <div className="notifications-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${!notif.read ? "unread" : ""}`}
              onClick={() => !notif.read && markAsRead(notif.id)}
            >
              {/* Icon */}
              <div className={`notification-icon notification-icon-${notif.type}`}>
                {getIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="notification-content">
                <div className="notification-title-row">
                  <h3 className="notification-title">{notif.title}</h3>
                  {!notif.read && <span className="notification-unread-dot"></span>}
                </div>
                <p className="notification-text">{notif.text}</p>
                <span className="notification-time">{formatTime(notif.time)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;