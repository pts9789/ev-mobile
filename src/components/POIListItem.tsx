import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 

interface POIListItemProps {
    title: string
    distance: number
}
const POIListItem = ({title, distance}: POIListItemProps ) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.row}>
                <Text>{distance.toFixed(2)} miles</Text>
                <Feather name="arrow-right-circle" size={24} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       borderWidth: 1,
       borderColor: '#ccc',
       borderRadius: 5,
       margin: 10,
       backgroundColor: "#fff",
    },
    title: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    row: {
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
       width: '100%',
       padding: 5
    },
   })

export default POIListItem