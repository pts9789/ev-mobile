import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import POIListView from "./src/screens/POIListView";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false
    }}
    >
      <Stack.Screen
        name="POIListView"
        component={POIListView}
        options={{ title: 'Charging Points Near You' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
