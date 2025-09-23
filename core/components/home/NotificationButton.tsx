import {
  NotificationData,
  useNotifications,
} from "@/core/hooks/useNotifications";
import { useTheme } from "@/core/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NotificationButtonProps {
  size?: number;
}

const NotificationButton = ({ size = 24 }: NotificationButtonProps) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const { notifications, stats, markAsRead, markAllAsRead } =
    useNotifications();

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleNotificationPress = (notification: NotificationData) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setModalVisible(false);
  };

  const renderNotificationItem = ({ item }: { item: NotificationData }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.read
            ? theme.background
            : theme.primaryText + "10",
          borderLeftColor: item.read ? "transparent" : theme.primaryText,
        },
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, { color: theme.primaryText }]}>
          {item.title}
        </Text>
        <Text style={[styles.notificationBody, { color: theme.secondaryText }]}>
          {item.body}
        </Text>
        <Text style={[styles.notificationDate, { color: theme.secondaryText }]}>
          {formatNotificationDate(item.date)}
        </Text>
      </View>
      {!item.read && (
        <View
          style={[styles.unreadDot, { backgroundColor: theme.primaryText }]}
        />
      )}
    </TouchableOpacity>
  );

  const formatNotificationDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Ionicons
          name="notifications-outline"
          size={size}
          color={theme.primaryText}
        />
        {stats.unreadCount > 0 && (
          <View style={[styles.badge, { backgroundColor: theme.error }]}>
            <Text style={[styles.badgeText, { color: theme.background }]}>
              {stats.unreadCount > 9 ? "9+" : stats.unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[styles.modalContainer, { backgroundColor: theme.background }]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.primaryText }]}>
              Notifications
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={theme.primaryText} />
            </TouchableOpacity>
          </View>

          {stats.unreadCount > 0 && (
            <TouchableOpacity
              style={[
                styles.markAllButton,
                { backgroundColor: theme.primaryText },
              ]}
              onPress={markAllAsRead}
            >
              <Text style={[styles.markAllText, { color: theme.background }]}>
                Mark all as read
              </Text>
            </TouchableOpacity>
          )}

          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            style={styles.notificationsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="notifications-off"
                  size={48}
                  color={theme.secondaryText}
                />
                <Text
                  style={[styles.emptyText, { color: theme.secondaryText }]}
                >
                  No notifications yet
                </Text>
              </View>
            }
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  markAllButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  markAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    alignItems: "flex-start",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
});

export default NotificationButton;
