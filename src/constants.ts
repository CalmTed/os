import { StyleSheet } from "react-native";

export const VERSION = "1.2"

export const COLORS = {
  main: "#DE8601",
  bg: "#151009",
  bgLight: "#2C211C",
  text: "#D9D9D9",
  textSecond: "#767676"
}

export const globalStyle = StyleSheet.create({
  screen: {
   backgroundColor: COLORS.bg,
   height: "100%",
   alignItems: "center",
   justifyContent: "flex-start"
  },
  view: {

  },
  text: {
    color: COLORS.text,
    fontSize: 100
  }
});