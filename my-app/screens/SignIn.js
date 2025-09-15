// screens/SignIn.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useTheme } from "../services/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native"; 

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation(); 

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "SEU_EXPO_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "SEU_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "SEU_WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((err) =>
        Alert.alert("Erro Google SignIn", err.message)
      );
    }
  }, [response]);

  const handleEmailSignUp = () => {
    if (!email || !password) return Alert.alert("Preencha e-mail e senha");
    createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      Alert.alert("Erro cadastro", err.message)
    );
  };

  const handleEmailSignIn = () => {
    if (!email || !password) return Alert.alert("Preencha e-mail e senha");
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      Alert.alert("Erro login", err.message)
    );
  };

  const isDark = theme === "dark";
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      {/* Botão para voltar para a Home */}
      <View style={styles.backButtonContainer}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
      
      <Text style={styles.title}>{t("appTitle")}</Text>

      <TextInput
        placeholder={t("emailPlaceholder")}
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder={t("passwordPlaceholder")}
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title={t("signInEmail")} onPress={handleEmailSignIn} />
      <View style={{ height: 10 }} />
      <Button title={t("signUpEmail")} onPress={handleEmailSignUp} />

      <View style={{ height: 20 }} />

      <TouchableOpacity
        onPress={() => promptAsync({ useProxy: true })}
        style={styles.googleBtn}
      >
        <Text style={styles.googleBtnText}>{t("googleSignIn")}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.obsText}>{t("googleObs")}</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title={t("toggleTheme", { mode: isDark ? "claro" : "escuro" })} onPress={toggleTheme} />
        <View style={{ height: 10 }} />
        <Button
          title={`Mudar para ${i18n.language === "pt" ? "English" : "Português"}`}
          onPress={() => i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt")}
        />
      </View>
    </View>
  );
}

function getStyles(isDark) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: isDark ? "#121212" : "#FFFFFF",
    },
    //  botão de voltar
    backButtonContainer: {
      position: 'absolute',
      top: 50,
      left: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: isDark ? "#FFFFFF" : "#000000",
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? "#555" : "#ccc",
      backgroundColor: isDark ? "#1E1E1E" : "#F9F9F9",
      color: isDark ? "#fff" : "#000",
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    googleBtn: {
      padding: 12,
      borderWidth: 1,
      borderColor: isDark ? "#fff" : "#000",
      alignItems: "center",
      borderRadius: 5,
    },
    googleBtnText: {
      color: isDark ? "#fff" : "#000",
    },
    obsText: {
      color: isDark ? "#aaa" : "gray",
      fontSize: 12,
    },
  });
}