import List from "@/core/components/profile/List";
import UserData from "@/core/components/profile/UserData";
import { SettingsProfileItems } from "@/core/constants/SettingsProfileItems";
import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <UserData />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Profile Settings
          </Text>
          <List items={SettingsProfileItems} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "Roman",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    marginLeft: 5,
  },
});
export default ProfileScreen;
