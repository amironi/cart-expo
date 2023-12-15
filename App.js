import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// import React from "react";
import { Provider } from "react-redux";
import store from "./reducers/store.ts";
import Products from "./components/Products.tsx";
// import "./index.css";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <Provider store={store}>
        <Products />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: "#0d1b2a",
    alignItems: "center",
    justifyContent: "center",
  },
});
