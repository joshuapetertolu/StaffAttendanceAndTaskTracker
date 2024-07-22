import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
});

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
};

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
});

export default styles;
