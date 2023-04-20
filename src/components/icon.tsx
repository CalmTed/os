import React, { FC } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../constants";


export type IconName = "arrow-back" | "add" | "menu";

export const Icon:FC<{iconName: IconName}> = ({iconName}) => {
  return <Ionicons name={iconName} size={32} color={COLORS.text}/>
}