// screens/Home.js
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Bem vindo{user?.displayName ? `, ${user.displayName}` : ""}!</Text>
      <Text style={{ marginTop: 10 }}>E-mail: {user?.email}</Text>

      <View style={{ height: 20 }} />
      <Button title="Sair" onPress={() => logout()} />
    </View>
  );
}


