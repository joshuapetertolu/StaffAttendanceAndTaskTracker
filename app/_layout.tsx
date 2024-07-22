import { View, StyleSheet, Platform } from "react-native";
import { Slot } from "expo-router";
import React from "react";
import FlashMessage from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            scheme === "dark" ? colors.black : colors.bgColor,
          paddingTop: Platform.OS === "ios" ? insets.top : insets.top,
        },
      ]}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Slot />
          <FlashMessage position={Platform.OS === "ios" ? "top" : "bottom"} />
          <StatusBar style={scheme === "dark" ? "light" : "dark"} />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

