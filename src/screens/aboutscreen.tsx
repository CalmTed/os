
import { FC } from "react"
import { View, Text, Touchable, TouchableOpacity } from "react-native"
import { globalStyle } from "../constants"
import { Header } from "../components/header"

export const AboutScreen: FC<any> = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate("Home")
  }
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="About" showBackButton={true}></Header>
    <TouchableOpacity onPress={handlePress}>
      <Text style={globalStyle.text}>Go home</Text>
    </TouchableOpacity>
  </View>
}