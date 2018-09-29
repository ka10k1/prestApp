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
import MyTodoApp from './todoApp/todoApp';
import MyTodoAppRNE from './todoAppRNE/todoAppRNE';
import myprestLogin from './myprestLogin/myprestLogin';
import Login from './login/login';
import { Provider } from 'react-redux'
import store, {persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
//import firebase from 'firebase';
//import ReduxThunk from 'redux-thunk';
//import reducers from './login/reducers';
//import LoginForm from './login/LoginForm';

const login='';
const StatusBarHeight = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
//const StatusBarHeight = 200;
{/*
     class App extends Component {
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

     export default App;

*/}




class Schedule extends React.Component {
     constructor(props){
         super(props); //必ず呼ぶ
     }

     state = {
       modalVisible: false,
     };

     openModal() {
       this.setState({modalVisible:true});
     }

     closeModal() {
       this.setState({modalVisible:false});
     }
     render() {
      
          return (
               <View style={styles.container}>
                    <Text>Lessons</Text>
                    <CalendarList
                    onDayPress={(day) => this.openModal()}
                    />
                    <Modal
                         visible={this.state.modalVisible}
                         animationType={'slide'}
                         onRequestClose={() => this.closeModal()}
                    >
                         <Button

                           onPress={() => this.closeModal()}
                           title="Close modal"
                         >
                         </Button>
                    </Modal>
               </View>
          );
     }
}

class Lessons extends React.Component {
     constructor(props){
       super(props);
       this.state ={ isLoading: true}
     }

     componentDidMount(){
       return fetch('https://prest-square.jp/myprest/myapp')
         .then((response) => response.json())
         .then((responseJson) => {

           this.setState({
             isLoading: false,
             dataSource: responseJson,
           }, function(){

           });

         })
         .catch((error) =>{
           console.error(error);
         });
     }
     state = {
        inputValue: "You can change me!"
        };

        _handleTextChange = inputValue => {
             this.setState({ inputValue });
        };

        _handleButtonPress = () => {
             Alert.alert(
                  'Button pressed!',
                  'You did it!',
             );
        };

     render(){

       if(this.state.isLoading){
         return(
           <View style={styles.container}>
             <ActivityIndicator/>
           </View>
         )
       }

       return(
         <View>
          <FlatList
             data={this.state.dataSource}
             renderItem={({item}) => <Text>{item.word_1}, {item.word_2}, {item.word_3}</Text>}
             keyExtractor={(item, index) => index}
             style={{ height: 100, padding: 8 }}
           />

           <Text>
           {this.state.inputValue}
           </Text>
           <Button
           title="Press me"
           onPress={this._handleButtonPress}
           />
           <TextInput
           value={this.state.inputValue}
           onChangeText={this._handleTextChange}
           style={{ width: 50, height: 440, padding: 8 }}
           />
         </View>
       );
     }
}

class Tables extends React.Component {
     render() {
          return (
               <View style={styles.container}>
                    <Text>Tables</Text>
                    <MyTodoApp />
                    
               </View>
          );
     }
}

class Create extends React.Component {
     render() {
          return (
               <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                         <View style={styles.container}>
                              <MyTodoAppRNE />
                         </View>
                    </PersistGate>
               </Provider>
          );
     }
}

class Library extends React.Component {
     render() {
          return (
               <View style={styles.container}>
                    <Text>Library</Text>
               </View>
          );
     }
}

class Account extends React.Component {
     render() {
          return (
               <View style={styles.container}>
                    <Text>Account</Text>
               </View>
          );
     }
}

class LogOut extends React.Component {
     render() {
          return (
               <View style={styles.container}>
                    <Text>LogOut</Text>
               </View>
          );
     }
}

class Teacher extends React.Component {
     render() {
          return (
               <View style={styles.container}>
                    <Text>Teacher</Text>
               </View>
          );
     }
}

const RootStack = createMaterialTopTabNavigator(
     {
          Schedule: {
               screen: Schedule,
          },
          Lessons: {
               screen: Lessons,
          },
          Tables: {
               screen: Tables,
          },
          Create: {
               screen: Create,
          },
          Library: {
               screen: Library,
          },
          Account: {
               screen: Account,
          },
          LogOut: {
               screen: LogOut,
          },
          Teacher: {
               screen: Teacher,
          },

     },
     {
          initialRouteName: 'Schedule',
     }
);

export default class App extends React.Component {
     render() {
          if (login =="hoge") {
            console.log(login);
               return <RootStack />;
          }　else {
            console.log('logout');
               return <RootStack />;

          }
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          //paddingTop: 'StatusBarHeight'+'%',
     }

//console.log(hoge);
});






{/* 元あった記述
import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TextInput, Button, Alert } from 'react-native';
import { Constants } from 'expo';
export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://prest-square.jp/myprest/myapp')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  state = {
     inputValue: "You can change me!"
     };

     _handleTextChange = inputValue => {
          this.setState({ inputValue });
     };

     _handleButtonPress = () => {
     Alert.alert(
     'Button pressed!',
     'You did it!',
     );
     };

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
       {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.word_1}, {item.word_2}, {item.word_3}</Text>}
          keyExtractor={(item, index) => index}
        />
        // <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        // <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        // <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        <Text>
        {this.state.inputValue}
        </Text>
        <Button
        title="Press me"

        onPress={this._handleButtonPress}
        />
        <TextInput
        value={this.state.inputValue}
        onChangeText={this._handleTextChange}
        style={{ width: 50, height: 440, padding: 8 }}
        />
      </View>
    );
  }
}
*/}
