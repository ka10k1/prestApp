import React, { Component } from 'react';
import {
     Text,
     View,
     Modal,
     Button,
     FlatList,
     ActivityIndicator,
     TextInput,
     Alert,
     StatusBar,
     Platform,
     StyleSheet,
     KeyboardAvoidingView,
} from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation';
import { CalendarList } from 'react-native-calendars';
import axios from 'axios';
import MyTodoApp from '../todoApp/todoApp';
import MyTodoAppRNE from '../todoAppRNE/todoAppRNE';
import myprestLogin from '../myprestLogin/myprestLogin';
import { Provider } from 'react-redux'
//import store, {persistor} from './redux/store'
//import { PersistGate } from 'redux-persist/integration/react'

import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './LoginForm';

class Login extends Component {
 componentWillMount() {
    firebase.initializeApp({
         apiKey: "AIzaSyBEI1TrejvmMMguN0SLhhXyLtSx1sCna-o",
         authDomain: "myprestapp.firebaseapp.com",
         databaseURL: "https://myprestapp.firebaseio.com",
         projectId: "myprestapp",
         storageBucket: "myprestapp.appspot.com",
         messagingSenderId: "1067348111112"
    });
 }
 render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={{flex: 1}}>
          <View style={styles.header}><Text style={styles.headerText}>ログインフォーム</Text></View>
          <LoginForm />
        </View>
      </Provider>
    );
 }

}

const styles = {
 header: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 2,
    position: 'relative'
 },
 headerText: {
    fontSize: 20,
    fontWeight: '600'
 }
};

export default Login;
