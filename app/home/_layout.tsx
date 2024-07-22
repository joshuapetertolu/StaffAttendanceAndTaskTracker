import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Image, View, Text, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import colors from "../../constants/Colors";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      safeAreaInsets={{ bottom: Platform.OS === "ios" ? 35 : 10 }}
      screenOptions={{
        headerShown: false,
        headerStyle: false,
        headerTintColor: "#fff",
        headerTitleStyle: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderWidth: 1,
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: "rgba(71, 84, 103, 0.20))",
          paddingTop: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  width: responsiveScreenWidth(25),
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: RFValue(10),
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: RFValue(22),
                    height: RFValue(22),
                  }}
                  source={
                    focused
                      ? require("../../assets/images/navicons/home-dark.png")
                      : require("../../assets/images/navicons/home-white.png")
                  }
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? colors.primaryColor : colors.bottomTab,
                    fontSize: RFValue(10),
                    fontFamily: "outfit-medium",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="task-details"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  width: responsiveScreenWidth(25),
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: RFValue(10),
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: RFValue(22),
                    height: RFValue(22),
                  }}
                  source={
                    focused
                      ? require("../../assets/images/navicons/explore-dark.png")
                      : require("../../assets/images/navicons/explore-white.png")
                  }
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? colors.primaryColor : "#BABABA",
                    fontSize: RFValue(10),
                    fontFamily: "outfit-medium",
                  }}
                >
                  Task Details
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="add-edit-task"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  backgroundColor: "transparent",
                  width: responsiveScreenWidth(25),
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: RFValue(10),
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: RFValue(22),
                    height: RFValue(22),
                  }}
                  source={
                    focused
                      ? require("../../assets/images/navicons/appointment-dark.png")
                      : require("../../assets/images/navicons/appointment-white.png")
                  }
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? colors.primaryColor : "#BABABA",
                    fontSize: RFValue(10),
                    fontFamily: "outfit-medium",
                  }}
                >
                  Add Edit Task
                </Text>
              </View>
            );
          },
        }}
      />
     
    </Tabs>
  );
}
