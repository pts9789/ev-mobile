# EV Mobile Test App

### Using `expo-location`, we grab the users current `longitude` and `latitude` to request the 20 closest charging points.
- Starting with the `POIListView Screen` we leverage a `FlatList` to display those 20 sites as `POIListItems` with the Charging Site Name, and distance away.
- `onPress` of the `POIListItems` we'll leverage `react-navigation` to pass a details object consisting of `address: string`, `accessNotes: string`, `contactInfo: string`, `distance: number`, `id: string`, `lattitude: number`, `longitude: number`, and `title: string` as a `details` param to the `POIDetail Screen`
- From the `POIDetail Screen` a user can either navigate to the charging site using their native maps app (based on their `OS` and the Charge Sites `latitude` and `longitude`) or the can select `Start Charging` to notify the ev-energy backend that they'll be charging their car at this location.

Built using TypeScript and Expo, we're ready to deploy to both iOS and Android
- Android
  
![android_charge](https://github.com/pts9789/ev-mobile/assets/18422733/da2b9696-4500-4e9f-984a-cbbc729cb650)

- iOS

![ios_charge](https://github.com/pts9789/ev-mobile/assets/18422733/499fa870-f5dd-4de0-a106-6494c81ac49f)

