import React, { FC, useEffect, useState } from "react"
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, ScrollView, Vibration } from "react-native"
import { COLORS, globalStyle, storageName, vibrationTime } from "../constants"
import { Header } from "../components/header"
import { StackNavigationHelpers } from "@react-navigation/stack/src/types"
import { Button, IconButton } from "../components/button"
import { AppStateModel } from "src/models"
import { Picker } from "@react-native-picker/picker"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-community/async-storage"

export interface ScreenModel {
  route: any
  navigation: StackNavigationHelpers
}

const storage = new Storage({
  size: 100,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});

export const HomeScreen: FC<ScreenModel> = ({route, navigation}) => {
  const oldState = route.params as AppStateModel;
  const [newState, setState] = useState(oldState);
  useEffect(() => {
    setState(oldState);
  }, [JSON.stringify(oldState)]);

  useEffect(() => {
    storage.save({
      key: storageName,
      data: {...newState}
    }).then((e) => {
    })
  }, [JSON.stringify(newState)]);

  const [modalVisible, setModalVisible] = useState(false);
  const navigateTO = (screenName: string) => {
    setModalVisible(false)
    Vibration.vibrate(vibrationTime.menu)
    navigation.navigate(screenName, {...newState})
  }
  const toggleMenu = () => {
    Vibration.vibrate(vibrationTime.menu)
    setModalVisible((ps) => !ps);
  }
  const clearStatuses: () => void = () => {
    Vibration.vibrate(vibrationTime.clearList);
    setState(oldState => {
      return {
        ...oldState,
        people: oldState.people.map(p => {
          return {...p, status: null};
        })
      }
    })
  }
  const changeStatus: (pId: number, sId: number) => void = (pId, sId) => {
    setState(oldState => {
      return {
        ...oldState,
        people: oldState.people.map(p => {
          return p.id === pId ? {...p, status: sId} : p;
        })
      }
    })
  }
  const resultText = `з/с: ${newState.people.length}${
    newState.statuses.filter(st => newState.people.filter(p => p.status === st.id).length > 0).map((st, i) => {
      const smallName = st.smallName;
      const lenght = newState.people.filter(p => p.status === st.id).length;
      const list = i < 1 ? " " : "("+(newState.people.filter(p => p.status === st.id).map(p => p.name.trim()).join(",") + ")")
      return `\n${smallName}: ${lenght}${list}`;
    }).join("")
  }`;
  return <View style={globalStyle.screen}>
    <Header navigation={navigation} title="Особовий склад" additionalChildren={[
      <IconButton onPress={clearStatuses} icon="remove-circle-outline" disabled={!newState.people.filter(p => p.status !== null).length}/>,
      <IconButton onPress={toggleMenu} icon="menu" />
    ]}></Header>
    <Modal visible={modalVisible} transparent={true} >
      <TouchableWithoutFeedback  onPress={() => {setModalVisible(false)}}>
        <View style={menuStyle.backdrop}>
        </View>
      </TouchableWithoutFeedback>
      <View style={menuStyle.wrapper}>
        <Button style={menuStyle.menuItem} onPress={() => navigateTO("People")} title="Люди"></Button>
        <Button style={menuStyle.menuItem} onPress={() => navigateTO("Statuses")} title="Статуси"></Button>
        <Button style={menuStyle.menuItem} onPress={() => navigateTO("About")} title="Про програму"></Button>
      </View>
    </Modal>
    <ScrollView style={viewStyle.peopleList}>
      <View style={viewStyle.resultView}>
        <Text
          style={viewStyle.resultLine}
          selectable
        >
          {resultText}
        </Text>
      </View>
      {!newState.people.length &&
        <Button style={{marginLeft: 20, marginTop: 5}} onPress={()=>{navigateTO("People")}} title="Додати людей" icon="add"/>}

      {newState.people.map((peop, i) => {
        return <View style={viewStyle.peopleItem} key={peop.id}>
          <Text style={viewStyle.pItemNumber}>{i + 1}</Text>
          <Text style={viewStyle.pItemName}>{peop.name}</Text>
          <View style={{
            ...viewStyle.pItemPickerWrapper,
            borderColor: newState.statuses.find(s => s.id === peop.status)?.color
            }}>
            <Text style={viewStyle.pItemLabel}>{newState.statuses.find(s => s.id === peop.status)?.name || ""}</Text>
            <Picker
              selectionColor={COLORS.main}
              selectedValue={peop.status || "null"}
              dropdownIconRippleColor={COLORS.main}
              
              style={{
                ...viewStyle.pItemPicker,
              }}
              dropdownIconColor={COLORS.text}
              onValueChange={(itemValue) => {
                changeStatus(peop.id, itemValue as number)
              }
            }>
              <Picker.Item label="-" value="null"/>
              {newState.statuses.map((s) => {
                return <Picker.Item key={s.id} label={s.name} value={s.id}/>
              })}
            </Picker>
          </View>
        </View>
      })}
    </ScrollView>
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
    shadowColor: COLORS.bg,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
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
  },
});
const viewStyle = StyleSheet.create({
  resultView:{
    backgroundColor: COLORS.bgLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5
  },
  resultLine: {
    fontFamily: "monospace",
    color: COLORS.text,
    fontSize: 15
  },
  peopleList: {
    width: "100%",
    height: "93%",
    overflow: "scroll",
    paddingVertical: 5
  },
  peopleItem: {
    backgroundColor: COLORS.bg,
    width: "100%",
    marginVertical: 3,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly" 
  },
  pItemNumber: {
    width: 30,
    textAlign: "center",
    color: COLORS.textSecond,
    fontSize: 18,
    fontWeight: "bold"
  },
  pItemName: {
    flex: 2,
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold"
  },
  pItemPickerWrapper: {
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 50,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 15
  },
  pItemLabel: {
    color: COLORS.text,
    height: "auto",
    fontSize: 18,
  },
  pItemPicker: {
    width: 40,
    borderWidth: 0,
    color: COLORS.text,
    filter: "inverted(1)"
  }
})