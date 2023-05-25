import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {QueryClient, QueryClientProvider} from 'react-query';

//Contexto
import { LibraryContextProvider } from './src/context/LibraryContext';

//Vistas personalizadas
import BookList from './src/Views/Libreria/BookList';
import BookDetail from './src/Views/Libreria/BookDetail';
import AddBook from './src/Views/AddBook/AddBook';
import BookEdit from './src/Views/Libreria/BookEdit';

const LibraryStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

function LibraryStackScreen(){
  return (
    <LibraryStack.Navigator>
        <LibraryStack.Screen 
             name = "BookList" 
             component={BookList}
             options={{title: 'Inicio'}} /> 
        <LibraryStack.Screen
             name = "BookDetail"
             component={BookDetail} 
             options={{title: 'Detalle del libro'}} />
        <LibraryStack.Screen
             name = "BookEdit"
             component={BookEdit} 
             options={{title: 'Edición del libro'}} />
    </LibraryStack.Navigator>
  )
}//Fin de LibraryStackScreen

class App extends Component{

  render (): React.ReactNode{
    return (
    <QueryClientProvider client={queryClient}>
      <LibraryContextProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Libreria" component={LibraryStackScreen} />
                    <Tab.Screen name="Agregar Libro" component={AddBook} />
                </Tab.Navigator>
            </NavigationContainer>
      </LibraryContextProvider>
    </QueryClientProvider>
    ) //Return   
  } //Render
} //Class App

const styles = StyleSheet.create({
  container: { 
    flex:1,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center'
  },
});
export default App;