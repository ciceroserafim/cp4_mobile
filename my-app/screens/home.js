// screens/Home.js
import React from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Importe o hook de navegação
import { useMotivationalQuote } from "../services/hooks/useMotivationalQuote";

export default function Home() {
  const { user, logout } = useAuth();
  const navigation = useNavigation(); // Use o hook para obter o objeto de navegação
  const { data, isLoading, isError, refetch } = useMotivationalQuote();

  const renderQuote = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (isError) {
      return <Text style={styles.quoteText}>Não foi possível carregar a frase motivacional.</Text>;
    }
    if (data) {
      return (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>"{data.q}"</Text>
          <Text style={styles.quoteAuthor}>- {data.a}</Text>
          <Button title="Próxima Frase" onPress={() => refetch()} />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem vindo{user?.displayName ? `, ${user.displayName}` : ""}!</Text>
      <Text style={styles.emailText}>E-mail: {user?.email}</Text>

      <View style={{ height: 20 }} />

      {renderQuote()}

      <View style={{ height: 20 }} />
      <Button title="Sair" onPress={() => logout()} />

      {/* Botão para ir para a tela de Login */}
      <View style={{ height: 10 }} />
      <Button
        title="Fazer Login"
        onPress={() => navigation.navigate("SignIn")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emailText: {
    marginTop: 10,
    textAlign: 'center',
  },
  quoteContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
  },
  quoteAuthor: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});