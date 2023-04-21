
import { FC, useState } from "react"
import { View, Text, TextInput, Vibration } from "react-native"
import { COLORS, globalStyle } from "../constants"
import { Header } from "../components/header"
import { StackNavigationHelpers } from "@react-navigation/stack/src/types"
import { IconButton } from "../components/button"
import { AppStateModel, PeopleModel } from "../models"
import { PeopleList } from "../components/list"
import { Input } from "react-native-design-system"

export const createPeopleItem: () => PeopleModel = () => {
  return {
    id: Math.round(Math.random() * 100000),
    name: "",
    status: null
  }
}

export const PeopleScreen: FC<{navigation: StackNavigationHelpers, route: any}> = ({navigation, route}) => {
  const stateNow = route.params as AppStateModel
  const [newState, setNewState] = useState(stateNow)
  const saveChanges = () => {
    Vibration.vibrate(20);
    navigation.navigate("Home", newState)
  }
  const addItem = () => {
    Vibration.vibrate(10)
    setNewState(oldState => {
      return {
        ...oldState,
        people: [
          ...oldState.people,
          createPeopleItem()
        ]
      }
    })
  }
  const setPeople: (arg: PeopleModel[]) => void = (newPeople) => {
    setNewState(oldState => {
      const updatedState = {
        ...oldState,
        people: newPeople
      };
      return updatedState
    })
  }
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="People" showBackButton={true} additionalChildren={[
      <IconButton onPress={addItem} icon="add" />,
      <IconButton onPress={saveChanges} icon="checkmark" />
    ]}></Header>
      {newState.people.length > 0 && 
        <PeopleList data={newState.people} setData={setPeople}></PeopleList>
      }
      {newState.people.length === 0 && 
        <Text style={globalStyle.text}>Press "+" to add item</Text>
      }
  </View>
}
