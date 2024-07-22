import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { OnboardingData } from "@/data/onBoardingData";
const { width, height } = Dimensions.get("window");
import colors from "@/constants/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ImageBackground } from "expo-image";
import GeneralButton from "@/components/common/generalButton";

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  img: any;
}

const Onboarding = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;


  const fade = useRef(new Animated.Value(0)).current;

  const animation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation();
  }, []);

  const updateCurrentSlide = (e: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    if (currentIndex !== screenIndex) {
      setScreenIndex(currentIndex);
    }
  };

  const goToNextSlide = () => {
    if (screenIndex < OnboardingData.length - 1) {
      setScreenIndex(screenIndex + 1);
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: screenIndex + 1,
      });
    }
  };

  const indicatorColor = (index: number) => {
    if (index <= screenIndex) {
      return colors.secondaryColor;
    } else {
      return colors.bgColor;
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "onboarding",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <StatusBar style="dark" />
      <FlatList
        onMomentumScrollEnd={updateCurrentSlide}
        ref={flatListRef}
        data={OnboardingData}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View>
            <ImageBackground
              source={item.img}
              contentFit="cover"
              style={styles.image}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 37,
                    lineHeight: 50.32,
                    textAlign: "center",
                    fontFamily: "outfit-bold",
                    color: colors.bgColor,
                    marginBottom: verticalScale(12),
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: scale(15),
                    lineHeight: 24,
                    textAlign: "center",
                    fontFamily: "urbanist-regular",
                    color: colors.bgColor,
                  }}
                >
                  {item.description}
                </Text>
                <View style={styles.indicatorContainer}>
                  {OnboardingData.map((item, index) => (
                    <View
                      key={item.id}
                      style={[
                        styles.indicator,
                        {
                          backgroundColor: indicatorColor(index),
                        },
                      ]}
                    />
                  ))}
                </View>
                {screenIndex == OnboardingData.length - 1 ? (
                  <GeneralButton
                    buttonText="Get Started"
                    buttonColor={colors.primaryColor}
                    buttonTextColor={colors.bgColor}
                    onPress={() => {
                      router.push("/home/");
                    }}
                    borderWidth={undefined}
                    borderColor={undefined}
                  />
                ) : (
                  <GeneralButton
                    buttonText="Get Started"
                    buttonColor={colors.primaryColor}
                    buttonTextColor={colors.bgColor}
                    onPress={goToNextSlide}
                    borderWidth={undefined}
                    borderColor={undefined}
                  />
                )}
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  indicator: {
    height: 2.5,
    width: 20,
    backgroundColor: colors.primaryColor,
    marginTop: Platform.OS === "ios" ? 16 : 25,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: moderateScale(45),
    marginTop: moderateScale(8),
  },
  pageContainer: {
    flex: 1,
    width: width,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    height: height,
    width: width,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
  },
  title: {
    fontSize: 32,
    fontFamily: "outfit-medium",
    marginBottom: verticalScale(5),
    color: colors.black,
    lineHeight: 35,
  },
  description: {
    fontSize: 15,
    fontFamily: "urbanist-medium",
    color: colors.textColor,
  },
  startBtn: {
    backgroundColor: colors.primaryColor,
    padding: Platform.OS === "ios" ? 17 : 14,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  startText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "outfit-medium",
    textAlign: "center",
  },
  lendBtn: {
    backgroundColor: colors.bgColor,
    padding: Platform.OS === "ios" ? 17 : 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryColor,
  },
  lendText: {
    fontSize: 17,
    color: colors.primaryColor,
    fontFamily: "outfit-medium",
    textAlign: "center",
  },
});
