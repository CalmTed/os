import { StyleSheet } from "react-native";
import { AppStateModel } from "./models";

export const VERSION = "1.2"

export const storageName = "data"

export const COLORS = {
  main: "#DE8601",
  bg: "#151009",
  bgLight: "#2C211C",
  text: "#D9D9D9",
  textSecond: "#767676"
}

export const statusColorList = [
  {
    label: "red",
    value: "#CE2424"
  },
  {
    label: "orange",
    value: "#DE8601"
  },
  {
    label: "yellow",
    value: "#CBCE24"
  },
  {
    label: "green",
    value: "#30CE24"
  },
  {
    label: "dark green",
    value: "#096507"
  },
  {
    label: "mint",
    value: "#24CEB2"
  },
  {
    label: "light blue",
    value: "#247CCE"
  },
  {
    label: "blue",
    value: "#2427CE"
  },
  {
    label: "purple",
    value: "#8224CE"
  },
  {
    label: "pink",
    value: "#CE2485"
  },
  {
    label: "white",
    value: "#eee"
  },
  {
    label: "brown",
    value: "#6F5F48"
  }
]

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
    fontSize: 20,
    marginVertical: 10
  }
});

export const createAppState: () => AppStateModel = () => {
  return {
    version: VERSION,
    lastChange: "2023-04-21",
    theme: "dark",
    number: 0,  
    people: [],
    statuses: []
  }
}