import React from 'react';
import {
     StyleSheet,
     Text,
     View,
     StatusBar,
     Platform,
      Alert,
     //TextInput,
     //Button,
     ScrollView,
     FlatList,
     KeyboardAvoidingView,
     AsyncStorage,
     TouchableOpacity,
} from 'react-native';

import {
     SearchBar,
     Input,
     Button,
     ListItem,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather';

import Icon2 from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux'
import {addTodo, toggleTodo} from '../redux/todoReducer/actionCreators'

const TODO = "@todoapp.todo"

const TodoItem = (props) => {
     let icon = null
     if (props.done === true) {
          icon = <Icon2 name = "done" />
     } else {
          icon = null
     }
     return (
          <TouchableOpacity >
               <ListItem
                    onPress={props.onTapTodoItem}
                    title={props.title}
                    leftIcon={icon}
                    bottomDivider
               />
               <ListItem
                    onPress={()=>Alert.alert('Hello!','This is a message.')}
                    fontSize = '50'
                    rightIcon={
                         <Icon2
                              name = "clear"
                         />}
                    bottomDivide
               />
          </TouchableOpacity>
     )

}

class myprestLogin extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               inputText: "",
               filterText: "",
          }
     }


     onAddItem = () => {
          const title = this.state.inputText
          if (title == "") {
               return
          }
          this.props.addTodo(title)
          this.setState({
               inputText: ""
          })
     }

     onTapTodoItem = (todoItem) => {
          this.props.toggleTodo(todoItem)
     }

     render() {
          const filterText = this.state.filterText
          let todo = this.props.todos
          if (filterText !== "") {
               todo = todo.filter(t => t.title.includes(filterText))
          }
          const platform = Platform.OS

          return (
               <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    keyboardVerticalOffset={
                         Platform.select({
                              ios: () => 50,
                              android: () => 30
                         })()
                    }
               >

           <SearchBar
                    platform = {platform}
                    cancelBottonTitle = "やめた！"
                    onChangeText={(text) => this.setState({filterText: text})}
                    onClear={()=>this.setState({filterText: ""})}
                    value={this.state.filterText}
                    placeholder="なにを検索したいん？"
               />
                    <ScrollView style={styles.todollist}>
                         <FlatList data={todo}
                              extraData={this.state}
                              renderItem={({item}) =>
                                   <TodoItem
                                        title={item.title}
                                        done={item.done}
                                        onTapTodoItem={()=>this.onTapTodoItem(item)}
                                   />
                              }
                              keyExtractor={(item, index) => "todo_"+item.index}
                         />
                    </ScrollView>

                    <View style={styles.input}>
                         <Input
                              onChangeText={(text) => this.setState({inputText: text})}
                              value={this.state.inputText}
                              containerStyle={styles.inputText}
                         />
                         <Button
                              icon={
                                   <Icon
                                        name='plus'
                                        size={30}
                                        color='white'
                                   />
                              }
                              onPress={this.onAddItem}
                              title=""
                              buttonstyle={styles.inputButton}
                         />
                    </View>
               </KeyboardAvoidingView>
          );
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,

     },
     filter: {
          height: 30,
     },
     todolist: {
          flex: 1,
     },
     input: {
          height: 50,
          flexDirection: 'row',
          paddingRight: 10,
     },
     inputText: {
          flex: 1,
          paddingRight: 10,
          paddingLeft: 10,
     },
     inputButton: {
          width: 48,
          height: 48,
          borderWidth: 0,
          borderColor: 'transparent',
          borderRadius: 48,
          backgroundColor: '#ff6347',
     },
     todoItem: {
          fontSize: 20,
          backgroundColor: "white",
     },
     todoItemDone: {
          fontSize: 20,
          backgroundColor: "red",
     },
     list1: {
          fontSize: 20,
          backgroundColor: "red",
     },
});

const mapStateToProps = state => {
     return {
          todos: state.todos.todos,
     }
}

const mapDispatchToProps = dispatch => {
     return {
          addTodo(text) {
               dispatch(addTodo(text))
          },
          toggleTodo(todo) {
               dispatch(toggleTodo(todo))
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(myprestLogin)
