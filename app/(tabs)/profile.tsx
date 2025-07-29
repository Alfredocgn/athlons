import List from "@/core/components/profile/List";
import UserData from "@/core/components/profile/UserData";
import { SettingsProfileItems } from "@/core/constants/SettingsProfileItems";
import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 20,
      }}
    >
      <UserData />
      <ScrollView>
        <List items={SettingsProfileItems} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
