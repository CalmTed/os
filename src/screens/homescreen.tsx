import { FC, useState } from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { COLORS, globalStyle } from "../constants"
import { Header } from "../components/header"
import { StackNavigationHelpers } from "@react-navigation/stack/src/types"
import { Button, IconButton } from "../components/button"

export interface ScreenModel {
  navigation: StackNavigationHelpers
}

export const HomeScreen: FC<ScreenModel> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigateTO = (screenName: string) => {
    setModalVisible(false)
    navigation.navigate(screenName)
  }
  const toggleMenu = () => {
    setModalVisible((ps) => !ps);
  }
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="Home" additionalChild={<IconButton onPress={toggleMenu} icon="menu" />}></Header>
    <Modal visible={modalVisible} transparent={true} >
      <TouchableWithoutFeedback style={menuStyle.backdrop} onPress={() => {setModalVisible(false)}}>
        <View ></View>
      </TouchableWithoutFeedback>
      <View style={menuStyle.wrapper}>
        <Button style={menuStyle.menuItem} onPress={() => navigateTO("People")} title="People"></Button>
        <Button style={menuStyle.menuItem} onPress={() => navigateTO("Statuses")} title="Statuses"></Button>
        <Button style={menuStyle.menuItem} onPress={() => navigateTO("About")} title="About"></Button>
      </View>
    </Modal>
    {/* <TouchableOpacity onPress={handlePress}>
      <Text style={globalStyle.text}>go to About screen</Text>
    </TouchableOpacity> */}
  </View>
}

const menuStyle = StyleSheet.create({
  wrapper: {
    position: "absolute",
    height:"auto",
    marginTop:0,
    width:"auto",
    alignSelf:"flex-end",
    top: 5,
    right: 5,
    backgroundColor: COLORS.bgLight,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: COLORS.text,
    fontSize: 22
  },
  backdrop: {
    opacity:0.5,
    width:"100%",
    position: "absolute",
    height: "100%",
    backgroundColor: COLORS.bg
  }
})