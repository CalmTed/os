
import { FC, useState } from "react"
import { View, Text, Vibration } from "react-native"
import { COLORS, globalStyle, vibrationTime } from "../constants"
import { Header } from "../components/header"
import { StackNavigationHelpers } from "@react-navigation/stack/src/types"
import { IconButton } from "../components/button"
import { AppStateModel, StatusModel } from "../models"
import { StatusesList } from "../components/list"

export const createStatusItem: () => StatusModel = () => {
  return {
    id: Math.round(Math.random() * 100000),
    name: "",
    smallName: "",
    color: "#aaa"
  }
}

export const StatusesScreen: FC<{navigation: StackNavigationHelpers, route: any}> = ({navigation, route}) => {
  const stateNow = route.params as AppStateModel
  const [newState, setNewState] = useState(stateNow)
  const saveChanges = () => {
    Vibration.vibrate(vibrationTime.menu);
    navigation.navigate("Home", newState)
  }
  const addItem = () => {
    Vibration.vibrate(vibrationTime.addRemove)
    setNewState(oldState => {
      return {
        ...oldState,
        statuses: [
          ...oldState.statuses,
          createStatusItem()
        ]
      }
    })
  }
  const setStatus: (arg: StatusModel[]) => void = (newStatuses) => {
    setNewState(oldState => {
      const updatedState = {
        ...oldState,
        statuses: newStatuses
      };
      return updatedState
    })
  }
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="Статуси" showBackButton={true} additionalChildren={[
      <IconButton onPress={addItem} icon="add" />,
      <IconButton onPress={saveChanges} icon="checkmark" />
    ]}></Header>
      {newState.statuses.length > 0 && 
        <StatusesList data={newState.statuses} setData={setStatus}></StatusesList>
      }
      {newState.statuses.length === 0 && 
        <Text style={globalStyle.text}>Натисність "+" щоб додати елемент</Text>
      }
  </View>
}
