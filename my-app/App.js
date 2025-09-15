// App.js
import "../my-app/i18";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./services/hooks/useTheme";
import { ActivityIndicator, View } from "react-native";
import SignIn from "./screens/SignIn";
import Home from "./screens/home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function RootNavigator() {
  const { initializing } = useAuth(); // O 'user' não é mais necessário aqui

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}