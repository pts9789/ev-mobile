import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Platform, Linking, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { GlobalNavigatorStackParamList } from '../@types/navigation'

export type POIDetailsProps = {
    address: string      // details.AddressInfo.AddressLine1
    accessNotes: string  // details.AddressInfo.AccessComments
    contactInfo: string  // details.AddressInfo.ContactTelephone1
    distance: number     // details.AddressInfo.Distance
    id: string           // details.ID
    lattitude: number    // details.AddressInfo.Latitude
    longitude: number    // details.AddressInfo.Longitude
    title: string        // details.AddressInfo.Title
}
// TODO: Build out response failure functionality and error handling
const POIDetail = () => { 
    const {details} = useRoute<RouteProp<GlobalNavigatorStackParamList, 'POIDetail'>>().params
    const [charging, setCharging] = useState<boolean>(false)
    const contactInfo = details.contactInfo || 'None Provided'
    const hours = details.accessNotes || 'None Provided'
    const url = Platform.OS === 'ios' ? `maps:0,0?q=${details.lattitude},${details.longitude}` : `geo:0,0?q=${details.lattitude},${details.longitude}`

    const startCharging = async () => {
        const options = {
            method: 'POST',
            url: 'https://example.ev.energy/chargingsession',
            params: {user: '1', car_id: '1', charger_id: details.id},
            headers: {
              Accept: 'application/json',
            }
          }
        try {
            const { data } = await axios.request(options);
            return data
        } catch (error) {
            return error
        }
    }
    const onStartCharging = async () => {
        const data = await startCharging()
        console.log('RESPONSE DATA >>>>', data)
        // NOTE: If this were a real end point we would want to use the response data to show either success or error messaging
        //       Skipping error handling for this prototype.
        setCharging(true)
    }
    const chargeStarted = () => {
        if (charging) {
            return (
                <View style={styles.body}>
                    <TouchableOpacity style={styles.close} onPress={() => setCharging(false) }>
                        <AntDesign name="closecircleo" size={24} style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.modal}>
                        <Text style={styles.title}>Charging!</Text>
                        <AntDesign name="checkcircle" color='#50fb60' size={100} />
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.body}>
                <Text style={styles.text}>○ Charge Point Name: {details.title}</Text>
                <Text style={styles.text}>○ Charge Point Address: {details.address}</Text>
                <Text style={styles.text}>○ Distance: {details.distance.toFixed(2)} miles</Text>
                <Text style={styles.text}>○ Hours: {hours}</Text>
                <Text style={styles.text}>○ Contact Info: {contactInfo}</Text>
            
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.directions}
                        onPress={() => Linking.openURL(url)}>
                        <Text>Get Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.charge}
                        onPress={onStartCharging}
                        >
                        <Text>Start Charging</Text>
                        <AntDesign name="poweroff" size={20} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    // TODO: Add MapView to show location of charge point in app 
    // TODO: Use modal for cleaner "charge started" section
    return (
        <View style={styles.wrapper}>
            <View>
                <Text style={styles.title}>{details.title}</Text>
                <View style={styles.divider}/>
            </View>
            {chargeStarted()}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
    },
    title: {
      alignSelf: 'center',
      fontSize: 26,
      marginVertical: 10,
    },
    divider: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        width: '100%'
    },
    close: {
        alignSelf: 'flex-end'
    },
    body: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    buttons:{
        alignSelf: 'center',
        marginTop: 20,
    },
    directions: {
        width: 250,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    charge: {
        width: 250,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#50fb60',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        paddingTop: 10
    },
    text: {
        paddingVertical: 5
    },
    modal: {
        alignItems: 'center',
        paddingTop: 40
    }
  });

export default POIDetail