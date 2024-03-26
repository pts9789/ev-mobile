import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, ActivityIndicator, View, ScrollView, Platform, Linking, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
// TODO: Type out POI Payload
// The entire POI Payload provides details that we may want to use down the line

const POIListView = () => {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let userLocation = await Location.getCurrentPositionAsync({});
        const options = {
            method: 'GET',
            url: 'https://api.openchargemap.io/v3/poi',
            params: {maxresults: '20', latitude: `${userLocation.coords.latitude}`, longitude: `${userLocation.coords.longitude}`},
            headers: {
              Accept: 'application/json',
              'X-API-Key': '435d095b-d5bf-42ef-84cc-f98fc597b7e0'
            }
          }
          const { data } = await axios.request(options);
          console.log('data >>>>', data)
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  

  return (
    <View>
        <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default POIListView;
