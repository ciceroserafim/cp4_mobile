// screens/SignIn.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Configure esses clientIds com os IDs do Google Cloud / Firebase
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "SEU_EXPO_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "SEU_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "SEU_WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential)
        .then(() => {
          // sucesso: onAuthStateChanged do AuthProvider cuidará da navegação
        })
        .catch((err) => Alert.alert("Erro Google SignIn", err.message));
    }
  }, [response]);

  const handleEmailSignUp = () => {
    if (!email || !password) return Alert.alert("Preencha e-mail e senha");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((err) => Alert.alert("Erro cadastro", err.message));
  };

  const handleEmailSignIn = () => {
    if (!email || !password) return Alert.alert("Preencha e-mail e senha");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((err) => Alert.alert("Erro login", err.message));
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Lista Tarefas Plus</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Entrar com E-mail" onPress={handleEmailSignIn} />
      <View style={{ height: 10 }} />
      <Button title="Criar conta (E-mail)" onPress={handleEmailSignUp} />

      <View style={{ height: 20 }} />

      <TouchableOpacity
        onPress={() => {
          promptAsync({ useProxy: true }); // useProxy true facilita desenvolvimento no Expo
        }}
        style={{ padding: 12, borderWidth: 1, alignItems: "center" }}
      >
        <Text>Entrar com Google</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 30 }}>
        <Text style={{ color: "gray" }}>
          Obs: para Google Sign-In, configure os client IDs e redirect URIs no Google Cloud Console e no Firebase.
        </Text>
      </View>
    </View>
  );
}
