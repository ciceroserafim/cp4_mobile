// src/hooks/useTasks.js
import { useEffect, useState, useCallback } from "react";
import { subscribeToTasks, createTask, updateTask, deleteTask, toggleComplete } from "../services/tasksService";

export default function useTasks(uid) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeToTasks(uid, (data) => {
      setTasks(data);
      setLoading(false);
    }, (err) => {
      console.error("subscribeToTasks error:", err);
      setError(err);
      setLoading(false);
    });

    return () => unsub();
  }, [uid]);

  const add = useCallback(async (taskData) => {
    try {
      return await createTask(uid, taskData);
    } catch (err) {
      console.error("createTask err:", err);
      throw err;
    }
  }, [uid]);

  const edit = useCallback(async (taskId, updates) => {
    try {
      await updateTask(uid, taskId, updates);
    } catch (err) {
      console.error("updateTask err:", err);
      throw err;
    }
  }, [uid]);

  const remove = useCallback(async (taskId) => {
    try {
      await deleteTask(uid, taskId);
    } catch (err) {
      console.error("deleteTask err:", err);
      throw err;
    }
  }, [uid]);

  const toggle = useCallback(async (taskId, currentValue) => {
    try {
      await toggleComplete(uid, taskId, currentValue);
    } catch (err) {
      console.error("toggleComplete err:", err);
      throw err;
    }
  }, [uid]);

  return { tasks, loading, error, add, edit, remove, toggle };
}
