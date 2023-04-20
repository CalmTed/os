import { FC, ReactElement } from "react"
import { TouchableOpacity, StyleSheet, Text, View } from "react-native"
import { Icon, IconName } from "./icon"
import { COLORS } from "../constants"

interface ButtonModel {
  onPress: () => void
  style?: StyleSheet.NamedStyles<{}>
  title?: string
  icon?: IconName
}

export const Button: FC<ButtonModel> = ({title, style, onPress, icon}) => {
  return <TouchableOpacity style={{...style, flexDirection: "row"}} onPress={onPress} >
    {
      icon && <View>
        <Icon iconName={icon}></Icon>
      </View>
      }
      {
        title &&  <View style={buttonStyles.buttonStyle}>
          <Text style={buttonStyles.buttonText}>{title}</Text>
        </View>
      }
  </TouchableOpacity>
}

interface IconButtonModel {
  onPress: () => void
  icon: IconName
}

export const IconButton: FC<IconButtonModel> = ({onPress, icon}) => {
  return <Button style={buttonStyles.iconStyle} onPress={onPress} icon={icon} title=""></Button>
}

const buttonStyles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5
  },
  buttonText: {
    color: COLORS.text,
    textTransform: "uppercase",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  iconStyle: {
    height: "100%",
    aspectRatio: 1,
    alignItems:"center",
    justifyContent: "center"
  }
});