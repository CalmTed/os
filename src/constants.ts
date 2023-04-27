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

export const vibrationTime = {
  menu: [0,10],
  clearList: [0,100,200,20,100,20],
  clearData: [0,40,100,400],
  dragStart: [0,20],
  dragEnd: [0,20,100,20],
  addRemove: [0,10]
}

export const statusColorList = [
  {
    label: "Червоний",
    value: "#CE2424"
  },
  {
    label: "Помаранчевий",
    value: "#DE8601"
  },
  {
    label: "Жовтий",
    value: "#CBCE24"
  },
  {
    label: "Салатовий",
    value: "#30CE24"
  },
  {
    label: "Зелений",
    value: "#096507"
  },
  {
    label: "Ментоловий",
    value: "#24CEB2"
  },
  {
    label: "Блакитний",
    value: "#247CCE"
  },
  {
    label: "Синій",
    value: "#2427CE"
  },
  {
    label: "Фіолетовий",
    value: "#8224CE"
  },
  {
    label: "Рожевий",
    value: "#CE2485"
  },
  {
    label: "Білий",
    value: "#eee"
  },
  {
    label: "Коричневий",
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
    fontSize: 18,
    marginVertical: 10
  }
})

export const createAppState: () => AppStateModel = () => {
  return {
    version: VERSION,
    lastChange: "2023-04-22",
    people: [],
    statuses: []
  }
}