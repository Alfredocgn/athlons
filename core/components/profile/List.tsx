import React from "react";
import { View } from "react-native";
import ListItem, { ListItemProps } from "./ListItem";

interface ListProps {
  items: ListItemProps[];
}
const List = ({ items }: ListProps) => {
  return items.map((item, index) => (
    <View key={index}>
      <ListItem icon={item.icon} title={item.title} />
    </View>
  ));
};

export default List;
