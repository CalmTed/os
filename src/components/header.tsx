import { FC } from "react"
import { StyleSheet, View, Text } from "react-native"
import { COLORS, globalStyle } from "../constants"
import { Button, IconButton } from "./button"
import { StackNavigationHelpers } from "@react-navigation/stack/src/types"

interface HeaderModel{
  navigation: StackNavigationHelpers
  showBackButton?: boolean
  title?: string
  additionalChild?: React.ReactNode
}


export const Header: FC<HeaderModel> = ({navigation,title, showBackButton, additionalChild}) => {
  const handleBack = () => {
    navigation.goBack();
  }
  return (
  <View style={headerStyle.view}>
    {showBackButton && <IconButton onPress={handleBack} icon="arrow-back"></IconButton>}
    <View style={headerStyle.textView}>
      {title && <Text style={headerStyle.text}>{title}</Text>}
    </View>
    {additionalChild}
  </View>
)
}

const headerStyle = StyleSheet.create({
  view: {
    backgroundColor: COLORS.bgLight,
    height: 100,
    width: "100%",
    paddingTop: 30,
    flexDirection: "row"
  },
  textView: {
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 20,
    flex: 1
  },
  text: {
    color: globalStyle.text.color,
    fontSize: 18,
    fontWeight: "500",
    textTransform: "uppercase"
  }
})