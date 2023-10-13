import React from 'react';
import { View, Text, StatusBar ,LogBox} from 'react-native';
import MainRouteConfig from './src/MainRouteConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './src/common/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import Loader from './src/common/Loader';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./src/store/MainReducer";
import ReduxThunk from "redux-thunk";


export const store = createStore(
  mainReducer,
  applyMiddleware(ReduxThunk)
);
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export default App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
        <StatusBar backgroundColor={Colors.statusbar} />
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Loader />
          <MainRouteConfig />
        </GestureHandlerRootView>

      </SafeAreaView>
    </Provider>
  )
}