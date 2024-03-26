import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, ActivityIndicator, View, ScrollView, Platform, Linking, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import useGetUserLocation from '../hooks/useGetUserLocation';
import { useNavigation } from '@react-navigation/native';
import POIListItem from '../components/POIListItem';

// TODO: Type out POI Payload
// The entire POI Payload provides details that we may want to use down the line

const POIListView = () => {
    const navigation = useNavigation();
    const [userLocation, userLocationErrorMsg] = useGetUserLocation()
    const [chargePoints, setChargePoints] = useState<any>(null)
  
    // GET POI Sites from Open Charge
    useEffect(() => {
      if (userLocation) {
        (async () => {
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
          setChargePoints(data)
        })()
      }
    }, [userLocation])

    if (!chargePoints) {
        return (
          <View style={styles.body}>
            <Text style={{marginBottom: 20}}>Searching for Charging Points Near You</Text>
            <ActivityIndicator />
          </View>
        )
      }
      if (userLocationErrorMsg) {
        return (
          <View style={styles.body}>
            <Text>We're having trouble verifying your location...</Text>
          </View>
        )
      }
  
      return (
        <FlatList
        showsHorizontalScrollIndicator={false}
        data={chargePoints}
        keyExtractor={(item) => item.ID}
        renderItem={({item}) => {
            return(
                <TouchableOpacity
                    onPress={() => navigation.navigate('POIDetail', {details: item,})}
                    >
                    <POIListItem title={item.AddressInfo.Title} distance={item.AddressInfo.Distance} />
                </TouchableOpacity>
            )
        }}
      />
    )
  }

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
});

export default POIListView;
