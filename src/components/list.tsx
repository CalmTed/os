import React, { FC, ReactNode } from "react";
import { View, Text, TextInput, Pressable, Vibration, StyleSheet } from "react-native";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";
import { COLORS, globalStyle, statusColorList } from "../constants";
import { PeopleModel, StatusModel } from "../models";
import { IconButton } from "./button";
import { ColorPicker } from "react-native-color-picker";
import { Picker } from "@react-native-picker/picker";

interface PeopleListModel{
  data: PeopleModel[]
  setData: (peoples: PeopleModel[]) => void
}
interface StatusListModel{
  data: StatusModel[]
  setData: (statuses: StatusModel[]) => void
}

export const PeopleList: FC<PeopleListModel> = ({data, setData}) => {
  const handleItemEdit: (arg: {id: number, newVal: string}) => void = ({id, newVal}) => {
    setData([
          ...data.map(peop => {
            return peop.id === id ? {...peop, name: newVal} : {...peop}
          })
        ])
  }
  const removeItem: (id: number) => void = (id) => {
    setData([
      ...data.filter(peop => {
        return peop.id !== id
      })
    ])
  }
  const renderItem: RenderItem<PeopleModel> = ({item, drag, isActive}) => { 
    return (
      <View
        key={item.id}
        style={listStyle.listItem}
        >
        <Pressable
        style={{
          ...listStyle.handle,
          borderColor: !isActive ? COLORS.bg : COLORS.main,
        }}
          onPressIn={
            () => {
              Vibration.vibrate(10)
              drag()
            }
          }
        >
        </Pressable>
        <TextInput
          style={listStyle.input}
          value={item.name}
          placeholder="Enter name..."
          placeholderTextColor={COLORS.textSecond}
          onChangeText={(newVal) => handleItemEdit({id: item.id, newVal: newVal})}
          editable={!isActive}
        ></TextInput>
        <IconButton 
          icon="close"  
          onPress={() => {
            Vibration.vibrate(10)
            removeItem(item.id)
        }}></IconButton>
      </View>
    )
  }
  return <DraggableFlatList
  style={listStyle.list}
  data={data}
  onDragEnd={({ data }) => {
      Vibration.vibrate([0,30,100,30])
      setData(data)
    }
  }
  keyExtractor={(item: PeopleModel) => item.id.toString()}
  renderItem={renderItem}
/>
}

export const StatusesList: FC<StatusListModel> = ({data, setData}) => {
  const handleItemEdit: (arg: {id: number, param: keyof StatusModel, newVal: string}) => void = ({id, param, newVal}) => {
    setData([
          ...data.map(status => {
            return status.id === id ? {...status, [param]: newVal} : {...status}
          })
        ])
  }
  const removeItem: (id: number) => void = (id) => {
    setData([
      ...data.filter(status => {
        return status.id !== id
      })
    ])
  }
  const renderItem: RenderItem<StatusModel> = ({item, drag, isActive}) => { 
    return (
      <View
        key={item.id}
        style={listStyle.listItem}
        >
        <Pressable
        style={{
          ...listStyle.handle,
          borderColor: !isActive ? COLORS.bg : COLORS.main,
        }}
          onPressIn={
            () => {
              Vibration.vibrate(10)
              drag()
            }
          }
        >
        </Pressable>
        <TextInput
          style={listStyle.middleInput}
          value={item.name}
          placeholder="Enter name..."
          placeholderTextColor={COLORS.textSecond}
          onChangeText={(newVal) => handleItemEdit({id: item.id, param:"name", newVal: newVal})}
          editable={!isActive}
        ></TextInput>
        <TextInput
          style={listStyle.smallInput}
          value={item.smallName}
          placeholder="ABC..."
          placeholderTextColor={COLORS.textSecond}
          onChangeText={(newVal) => handleItemEdit({id: item.id, param:"smallName", newVal: newVal})}
          editable={!isActive}
        ></TextInput>
        {/* <ColorPicker
          onColorSelected={(newVal) => handleItemEdit({id: item.id, param:"color", newVal: newVal})}

        /> */}
        <View style={{height: "80%", aspectRatio: 1, borderRadius: 400, overflow: "hidden", alignItems: "center", justifyContent: "center"}}>
          <Picker

            dropdownIconColor={COLORS.bgLight}
            prompt="Select status color"
            selectedValue={statusColorList.indexOf(statusColorList.find(c => c.value === item.color) || statusColorList[0])}
            style={{backgroundColor: item.color, color: "red", width: "120%", height: "100%"}}
            onValueChange={(itemValue) =>
              handleItemEdit({id: item.id, param:"color", newVal: itemValue.toString()})
            }>
              <Picker.Item label="none" value="gray"/>
              {statusColorList.map((c) => {
                return <Picker.Item key={c.label} label={c.label} value={c.value}/>
              })}
          </Picker>

        </View>
        <IconButton 
          icon="close"  
          onPress={() => {
            Vibration.vibrate(10)
            removeItem(item.id)
        }}></IconButton>
      </View>
    )
  }
  return <DraggableFlatList
  style={listStyle.list}
  data={data}
  onDragEnd={({ data }) => {
      Vibration.vibrate([0,30,100,30])
      setData(data)
    }
  }
  keyExtractor={(item: StatusModel) => item.id.toString()}
  renderItem={renderItem}
/>
}


const listStyle = StyleSheet.create({
  list: {
    width: "100%",
    maxWidth: "100%",
    height: "94%",
    maxHeight: "94%",
    padding: 5
  },
  listItem: {
    width: "100%",
    height: 60,
    gap: 10,
    flexDirection: "row",
    backgroundColor: COLORS.bgLight,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 15,
    marginVertical: 5
  },
  handle: {
    width: 35,
    height: 15,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    marginRight: 10
  },
  input: {
    ...globalStyle.text,
    flex: 1
  },
  middleInput: {
    ...globalStyle.text,
    flex: 0.7
  },
  smallInput: {
    ...globalStyle.text,
    flex: 0.3,
    // height: "100%",
    borderLeftWidth: 2,
    borderLeftColor: COLORS.bgLight
  }
});