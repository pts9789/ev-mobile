import React from 'react'
import { View, Text, } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
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

const POIDetail = () => { 
    const {details} = useRoute<RouteProp<GlobalNavigatorStackParamList, 'POIDetail'>>().params
    console.log('DETAILS >>>>', details)
    return (
        <View>
            <Text>{details.title}</Text>
        </View>
    )
}

export default POIDetail