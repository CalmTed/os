import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen } from "./screens/homescreen";
import { AboutScreen } from "./screens/aboutscreen";
import { AppStateModel } from "./models";
import { PeopleScreen } from "./screens/peoplescreen";
import { StatusesScreen } from "./screens/statusesscreen";

const Stack =  createStackNavigator()

interface NavigatorModel {
  state: AppStateModel
  setState: (prevState: AppStateModel) => void
}

export const Navigator: FC<NavigatorModel> = ({state, setState}) => {
  return <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureEnabled: true,
        presentation: "modal"
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="People" component={PeopleScreen}/>
      <Stack.Screen name="Statuses" component={StatusesScreen}/>
      <Stack.Screen name="About" component={AboutScreen}/>
    </Stack.Navigator>
  </NavigationContainer>;
}