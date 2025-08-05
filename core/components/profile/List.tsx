import React from "react";
import { StyleSheet, View } from "react-native";
import ListItem, { ListItemProps } from "./ListItem";

interface ListProps {
  items: ListItemProps[];
}
const List = ({ items }: ListProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          onPress={item.onPress}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default List;
