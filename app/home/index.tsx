import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { Task } from "@/types";
import { setFilter } from "@/store/taskSlice";
import { router } from "expo-router";
import colors from "@/constants/Colors";

export default function HomeScreen() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const dispatch = useDispatch<AppDispatch>();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed"
      ? task.status === "completed"
      : task.status === "pending";
  });

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/home/task-details",
          params: { taskId: item.id.toString() },
        })
      }
    >
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 30,

            color: colors.black,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,

            color: colors.black,
          }}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => dispatch(setFilter("all"))} />
        <Button
          title="Completed"
          onPress={() => dispatch(setFilter("completed"))}
        />
        <Button
          title="Pending"
          onPress={() => dispatch(setFilter("pending"))}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Add Task"
        onPress={() => router.push("/home/add-edit-task")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});
