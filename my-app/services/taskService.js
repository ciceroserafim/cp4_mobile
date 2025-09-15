// src/screens/TaskService.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import useTasks from "../hooks/useTasks";
import { useTheme } from "./hooks/useTheme";

export default function TaskService({ user }) {
  const uid = user?.uid;
  const { tasks, loading, error, add, edit, remove, toggle } = useTasks(uid);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const styles = createStyles(isDark);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await add({ title: newTaskTitle, completed: false });
      setNewTaskTitle("");
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  const handleEditTask = async (taskId) => {
    if (!editingTaskTitle.trim()) return;
    try {
      await edit(taskId, { title: editingTaskTitle });
      setEditingTaskId(null);
      setEditingTaskTitle("");
    } catch (err) {
      console.error("Erro ao editar tarefa:", err);
    }
  };

  const renderTask = ({ item }) => {
    const isEditing = editingTaskId === item.id;

    return (
      <View style={styles.taskContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={editingTaskTitle}
              onChangeText={setEditingTaskTitle}
            />
            <TouchableOpacity onPress={() => handleEditTask(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingTaskId(null)} style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text
              style={[
                styles.taskText,
                { textDecorationLine: item.completed ? "line-through" : "none" },
              ]}
            >
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => toggle(item.id, item.completed)} style={styles.button}>
              <Text style={styles.buttonText}>{item.completed ? "✔️" : "⬜"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditingTaskId(item.id);
                setEditingTaskTitle(item.title);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => remove(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>🗑</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Text style={styles.themeButtonText}>Tema: {isDark ? "Escuro" : "Claro"}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nova tarefa"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.taskText}>Carregando tarefas...</Text>}
      {error && <Text style={[styles.taskText, { color: "red" }]}>{error.message}</Text>}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const createStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? "#121212" : "#fff",
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? "#555" : "#ccc",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      color: isDark ? "#fff" : "#000",
    },
    addButton: {
      backgroundColor: "#007bff",
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
      alignItems: "center",
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    taskContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    taskText: {
      flex: 1,
      color: isDark ? "#fff" : "#000",
      fontSize: 16,
    },
    button: {
      marginLeft: 5,
      padding: 5,
    },
    buttonText: {
      color: isDark ? "#fff" : "#000",
      fontSize: 16,
    },
    themeButton: {
      marginBottom: 15,
      alignSelf: "flex-end",
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDark ? "#333" : "#eee",
    },
    themeButtonText: {
      color: isDark ? "#fff" : "#000",
      fontWeight: "bold",
    },
  });
