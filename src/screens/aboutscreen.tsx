
import { FC } from "react"
import { View, Text, Touchable, TouchableOpacity, Image, Vibration, ToastAndroid } from "react-native"
import { COLORS, createAppState, globalStyle, storageName } from "../constants"
import { Header } from "../components/header"
import { AppStateModel } from "../models"
import { Button } from "../components/button"
import { useAssets } from "expo-asset"

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
    <Header navigation={navigation} title="About" showBackButton={true}></Header>
    <View style={{height: "88%", alignItems: "center"}}>
      <Image style={{
        width: 150,
        height: 150,
        margin: 50
      }} source={require("../../assets/icon.png")}></Image>
      <Text style={{fontSize: 45, textTransform: "uppercase", fontWeight: "800", color: COLORS.text}}>Personnel</Text>
      <Text style={{...globalStyle.text, textAlign: "center"}}>Created by Ted Frost for Ukrainian Military Forces</Text>
      <Text style={globalStyle.text}>Verstion: {stateNow.version}</Text>
      <Text style={globalStyle.text}>Last update: {stateNow.lastChange}</Text>
      <Button style={{
        marginTop: 100
      }} onPress={() => {
        const newState = createAppState()
        Vibration.vibrate([0,100]);
        storage.save({
          key: storageName,
          data: {...newState}
        }).then(() => {
          Vibration.vibrate([100,600]);
          ToastAndroid.show("Data cleared", 20000)
          navigation.navigate("Home", {...newState})
        })
      }} title="Clear data" icon="trash"/>
    </View>
  </View>
}