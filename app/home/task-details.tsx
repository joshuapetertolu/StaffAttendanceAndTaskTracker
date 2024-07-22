import React from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { router, useLocalSearchParams } from "expo-router";
import colors from "@/constants/Colors";

const TaskDetailsScreen = () => {
  const params = useLocalSearchParams();
  const { taskId }: any = params;

  console.log("Task ID:", taskId);

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === Number(taskId))
  );

  if (!task) {
    return <Text>Task not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: Platform.OS === "ios" ? 17 : 16,
          marginTop: 15,
          color: colors.black,
        }}
      >
        {task.title}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: Platform.OS === "ios" ? 17 : 16,
      
          color: colors.black,
        }}
      >
        {task.description}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: Platform.OS === "ios" ? 17 : 16,
  
          color: colors.black,
        }}
      >
        {task.dueDate}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: Platform.OS === "ios" ? 17 : 16,
    marginBottom:20,
          color: colors.black,
        }}
      >
        {" "}
        {task.status}
      </Text>
      <Button
        title="Edit Task"
        onPress={() =>
          router.push({
            pathname: "/home/add-edit-task",
            params: { taskId: task.id.toString() },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TaskDetailsScreen;
