import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import POIListView from "./src/screens/POIListView";
import POIDetail from "./src/screens/POIDetail";

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
        <Stack.Screen
        name="POIDetail"
        component={POIDetail}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
