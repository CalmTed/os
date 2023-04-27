
import { FC } from "react"
import { View, Text, Image, Vibration, ToastAndroid } from "react-native"
import { COLORS, createAppState, globalStyle, storageName, vibrationTime } from "../constants"
import { Header } from "../components/header"
import { AppStateModel } from "../models"
import { Button } from "../components/button"

import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";

const storage = new Storage({
  size: 100,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});


export const AboutScreen: FC<any> = ({navigation, route}) => {
  // console.log(JSON.stringify(route));
  const stateNow = route.params as AppStateModel
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="Про додаток" showBackButton={true}></Header>
    <View style={{height: "88%", alignItems: "center", marginHorizontal: 30}}>
      <Image style={{
        width: 150,
        height: 150,
        margin: 50
      }} source={require("../../assets/icon.png")}></Image>
      <Text style={{fontSize: 35, textTransform: "uppercase", fontWeight: "800", color: COLORS.text}}>Особовий склад</Text>
      <Text style={{...globalStyle.text, textAlign: "center", color: COLORS.textSecond}}>Створено Морозом Федором для ЗСУ у квітні 2023 по ідеї майора Т.</Text>
      <Text style={globalStyle.text}>Версія: {stateNow.version}</Text>
      <Text style={globalStyle.text}>Останнє оновлення: {stateNow.lastChange}</Text>
      <Button style={{
        marginTop: 100
      }} onPress={() => {
        const newState = createAppState()
        storage.save({
          key: storageName,
          data: {...newState}
        }).then(() => {
          Vibration.vibrate(vibrationTime.clearData);
          ToastAndroid.show("Данні стерті", 20000)
          navigation.navigate("Home", {...newState})
        })
      }} title="Стерти данні" icon="trash"/>
    </View>
  </View>
}