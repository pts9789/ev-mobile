import { useEffect, useState } from "react";
import * as Location from 'expo-location';

// TODO: Type out location and errorMsg
export default () => {
    const [userLocation, setUserLocation] = useState<any>(null);
    const [userLocationErrorMsg, setUserLocationErrorMsg] = useState<any>(null);
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setUserLocationErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
        })();
      }, []);
    return [userLocation, userLocationErrorMsg]
}