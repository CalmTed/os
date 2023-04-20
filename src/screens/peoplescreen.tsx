
import { FC } from "react"
import { View, Text } from "react-native"
import { globalStyle } from "../constants"
import { Header } from "../components/header"
import { StackNavigationHelpers } from "@react-navigation/stack/src/types"

export const PeopleScreen: FC<{navigation: StackNavigationHelpers}> = ({navigation}) => {
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="People" showBackButton={true}></Header>
      <Text style={globalStyle.text}>People</Text>
  </View>
}