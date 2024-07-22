import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import colors from "@/constants/Colors";

interface Props {
  buttonText: string;
  buttonColor: any;
  buttonTextColor: any;
  onPress: any;
  isSubmitting?: boolean;
  disabled?: boolean;
  marginTop?: any;
  borderWidth?: any;
  borderColor?: any;
}

const GeneralButton = ({
  onPress,
  buttonText,
  buttonColor,
  buttonTextColor,
  disabled,
  marginTop,
  borderWidth,
  borderColor,
  isSubmitting,
}: Props) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <View
      style={{
        height: verticalScale(100),
      }}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          borderRadius: 10,
          borderBottomRightRadius: 0,
          backgroundColor: colors.bgColor,
          padding: Platform.OS === "ios" ? 15 : 14,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          marginTop: marginTop,
          borderWidth: borderWidth,
          borderColor: borderColor,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "outfit-medium",
            textAlign: "center",
            color: colors.black ,
          }}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GeneralButton;
