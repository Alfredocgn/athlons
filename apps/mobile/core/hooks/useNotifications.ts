import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
  date: Date;
  read: boolean;
}

export interface NotificationStats {
  unreadCount: number;
  totalCount: number;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [stats, setStats] = useState<NotificationStats>({
    unreadCount: 0,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const mockNotifications: NotificationData[] = [
    {
      id: "1",
      title: "Training Reminder",
      body: "Time for your evening run!",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
    },
    {
      id: "2",
      title: "Goal Achievement",
      body: "Congratulations! You completed this week's goal.",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
    },
    {
      id: "3",
      title: "Weather Update",
      body: "Perfect weather for running today!",
      date: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      read: false,
    },
  ];

  const loadNotifications = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setNotifications(mockNotifications);
      const unreadCount = mockNotifications.filter((n) => !n.read).length;
      setStats({
        unreadCount,
        totalCount: mockNotifications.length,
      });
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  };
  const markAsRead = async (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );

    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );

    const unreadCount = updatedNotifications.filter((n) => !n.read).length;
    setStats({
      unreadCount,
      totalCount: updatedNotifications.length,
    });
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setStats((prev) => ({ ...prev, unreadCount: 0 }));
  };

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  };

  useEffect(() => {
    loadNotifications();
    requestPermissions();
  }, []);

  return {
    notifications,
    stats,
    loading,
    markAsRead,
    markAllAsRead,
    requestPermissions,
    refreshNotifications: loadNotifications,
  };
};
