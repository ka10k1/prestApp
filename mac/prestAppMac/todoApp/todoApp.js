import React from 'react';
import {
     StyleSheet,
     Text,
     View,
     StatusBar,
     Platform,
     TextInput,
     Button,
     ScrollView,
     FlatList,
     KeyboardAvoidingView,
     AsyncStorage,
     TouchableOpacity,
} from 'react-native';

const TODO = "@todoapp.todo"

const TodoItem = (props) => {
     let textStyle = styles.todoItem
     if (props.done === true) {
          textStyle = styles.todoItemDone
     } else {
          textStyle = styles.todoItem
     }
     return (
          <TouchableOpacity onPress={props.onTapTodoItem}>
               <Text style={textStyle}>
                    {props.title}
               </Text>
          </TouchableOpacity>
     )

}

class MyTodoApp extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               todo: [],
               currentIndex:0,
               inputText: "",
               filterText: "",
          }
     }

     componentDidMount() {
          this.loadTodo()
     }

     loadTodo = async() => {
          try {
               const todoString = await AsyncStorage.getItem(TODO)
               if (todoString) {
                    const todo = JSON.parse(todoString)
                    const currentIndex = todo.length
                    this.setState({todo: todo, currentIndex: currentIndex})
               }
          } catch (e) {
               console.log(e)
          }
     }

     saveTodo = async (todo) => {
          try {
               const todoString = JSON.stringify(todo)
               await AsyncStorage.setItem(TODO, todoString)
          } catch(e) {
               console.log(e)
          }
     }

     onAddItem = () => {
          const title = this.state.inputText
          if (title == "") {
               return
          }
          const index = this.state.currentIndex + 1
          const newTodo = {index: index, title: title, done: false}
          const todo = [...this.state.todo, newTodo]
          this.setState({
               todo: todo,
               currentIndex: index,
               inputText: ""
          })
          this.saveTodo(todo)
     }

     onTapTodoItem = (todoItem) => {
          const todo = this.state.todo
          const index = todo.indexOf(todoItem)
          if(todoItem.done === false) {
               todoItem.done = true
          } else if(todoItem.done === true) {
               todoItem.done = false
          }
          //todoItem.done = !todoItem.todoItemDone
          todo[index] = todoItem
          this.setState({todo: todo})
          this.saveTodo(todo)
     }

     render() {
          const filterText = this.state.filterText
          let todo = this.state.todo
          if (filterText !== "") {
               todo = todo.filter(t => t.title.includes(filterText))
          }
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
                    <View style={styles.filter}>
                         <TextInput
                              onChangeText={(text) => this.setState({filterText: text})}
                              value={this.state.filterText}
                              style={styles.inputText}
                              placeholder="ここに検索したいのいれる！"
                         />
                    </View>

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
                         <TextInput
                              onChangeText={(text) => this.setState({inputText: text})}
                              value={this.state.inputText}
                              style={styles.inputText}
                         />
                         <Button
                              onPress={this.onAddItem}
                              title="Add"
                              color="#841584"
                              style={styles.inputButton}
                         />
                    </View>
               </KeyboardAvoidingView>
          );
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
     },
     filter: {
          height: 30,
     },
     todolist: {
          flex: 1,
     },
     input: {
          height: 30,
          flexDirection: 'row',
     },
     inputText: {
          flex: 1,
          backgroundColor: '#841584',
          width: 100,
     },
     inputButton: {
          width: 100,
     },
     todoItem: {
          fontSize: 20,
          backgroundColor: "white",
     },
     todoItemDone: {
          fontSize: 20,
          backgroundColor: "red",
     },
});

export default MyTodoApp;
