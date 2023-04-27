import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "./screens/homescreen";
import { AboutScreen } from "./screens/aboutscreen";
import { AppStateModel } from "./models";
import { PeopleScreen } from "./screens/peoplescreen";
import { StatusesScreen } from "./screens/statusesscreen";

const Stack =  createStackNavigator()

interface NavigatorModel {
  state: AppStateModel
}

export const Navigator: FC<NavigatorModel> = ({state}) => {
  return <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureEnabled: true,
        presentation: "modal"
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} initialParams={{...state}}/>
      <Stack.Screen name="People" component={PeopleScreen}/>
      <Stack.Screen name="Statuses" component={StatusesScreen}/>
      <Stack.Screen name="About" component={AboutScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
}