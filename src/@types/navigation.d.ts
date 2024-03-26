import POIDetailsProps from '../screens/POIDetail'
type GlobalNavigatorStackParamList = {
    POIDetail: POIDetailsProps
    POIListView: any
}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends GlobalNavigatorStackParamList {}
    }
  }