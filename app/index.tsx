import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Onboarding from "./onboarding";
import colors from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

SplashScreen.preventAutoHideAsync();

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

export default function Root() {
  (Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
  (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
    false;

  (TextInput as unknown as TextWithDefaultProps).defaultProps =
    (TextInput as unknown as TextWithDefaultProps).defaultProps || {};
  (
    TextInput as unknown as TextWithDefaultProps
  ).defaultProps!.allowFontScaling = false;

  const [loaded, error] = useFonts({
    "outfit-black": require("../assets/fonts/Outfit-Black.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-extrabold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
    "outfit-extralight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-semibold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-thin": require("../assets/fonts/Outfit-Thin.ttf"),
    "urbanist-regular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "urbanist-black": require("../assets/fonts/Urbanist-Black.ttf"),
    "urbanist-bold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "urbanist-extrabold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    "urbanist-extralight": require("../assets/fonts/Urbanist-ExtraLight.ttf"),
    "urbanist-light": require("../assets/fonts/Urbanist-Light.ttf"),
    "urbanist-medium": require("../assets/fonts/Urbanist-Medium.ttf"),
    "urbanist-semibold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
    "urbanist-thin": require("../assets/fonts/Urbanist-Thin.ttf"),
    ...FontAwesome.font,
  });



  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <SafeAreaView
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <Onboarding />
        </SafeAreaView>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
