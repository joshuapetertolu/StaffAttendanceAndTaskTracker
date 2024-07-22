import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "@/store/taskSlice";
import { Task } from "@/types";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { RootState } from "@/store";
import colors from "@/constants/Colors";

const AddEditTaskScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { taskId }: any = params;

  const taskToEdit = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === Number(taskId))
  );

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (taskToEdit) {
      dispatch(editTask({ ...taskToEdit, title, description, dueDate }));
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        status: "pending",
      };
      dispatch(addTask(newTask));
    }
    router.back();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(moment(selectedDate).format("YYYY-MM-DD"));
    }
  };

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
        Title
      </Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.inputbox}
      />
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: Platform.OS === "ios" ? 17 : 16,
          marginTop: 15,
          color: colors.black,
        }}
      >
        Description
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.inputbox}
      />
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: Platform.OS === "ios" ? 17 : 16,
          marginTop: 15,
          color: colors.black,
        }}
      >
        Due Date
      </Text>
      <TextInput
        value={dueDate}
        onFocus={() => setShowDatePicker(true)}
        style={styles.inputbox}
        placeholder="YYYY-MM-DD"
      />
      {showDatePicker && (
        <DateTimePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  inputbox: {
    backgroundColor: "transparent",
    fontFamily: "outfit-medium",
    fontSize: Platform.OS === "ios" ? 16 : 15,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    width: "100%",
    marginBottom:20
  },
});

export default AddEditTaskScreen;
