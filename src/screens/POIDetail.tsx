import React from 'react'
import { View, Text, } from 'react-native'
import { useRoute } from '@react-navigation/native'

const POIDetail = () => { 
    const {details} = useRoute().params
    console.log('DETAILS >>>>', details)
    return (
        <View>
            <Text>{details.AddressInfo.Title}</Text>
        </View>
    )
}

export default POIDetail