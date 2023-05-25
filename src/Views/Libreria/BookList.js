import React from "react";
import { FlatList, Text, View, StyleSheet, Alert } from 'react-native'
import { useMutation } from "react-query";
//Importación de componente BookListItem
import BookItems from "../../componentes/books/BookItems";

//Importamos el contexto
import useLibraryContext from "../../hooks/use.LibraryContext";

//Función para eliminar un libro
async function deleteBook(data){

    const res = await fetch(data.url+"api/libros/"+data._id, {
            method: 'DELETE',
    });
    const json = await res.json();
    return json;
}//Fin de deleteBook
    
export default function BookList({navigation}){

    //Consulta
    const {isSuccess, isLoading, data, error, url, invalidateBookListCache} = useLibraryContext();

   //estado de la petición para eliminar el libro
   const { mutate, errorDelete } = useMutation(deleteBook, {
        onSuccess: ()=>{
            invalidateBookListCache();    
        }  
    });//Fin de useMutation

    function handleOnPress(_id){ 
        navigation.navigate('BookDetail', {_id, url})
    }//Fin de handleOnPress

    function handleDelete(_id, titulo){
        //console.log(_id);
        Alert.alert(
            'Eliminar libro',
            '¿Realmente deseas eliminar el libro? ' + titulo,
            [
                {
                    text: 'Ok',
                    onPress: ()=> {
                        //console.log('Eliminar')
                        mutate({url, _id})
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'destructive'
                }
            ],
            { cancelable: false} //Esto solo funciona para android, para que no cierre
                                //La alerta si se presiona fuera de la alerta
        )
    } //Fin de handleDelete
    return (
        <View>
            <FlatList
                data={isSuccess ? data.libros : []}
                renderItem={
                    ({item}) => <BookItems book={item}  url={url}
                                   onPress={ ()=> handleOnPress(item._id)}
                                   onDelete={()=>handleDelete(item._id, item.titulo)}
                                />
                }
                keyExtractor={item => item._id}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.titulo}>
                            Listado de libros
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    <View>
                        { isLoading && <Text>Cargando libros...</Text> }
                        { error && <Text>Error: {error.message}</Text> }
                        { errorDelete && <Text>Error: {error.message}</Text> }
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize:20,
        margin: 3,
        padding: 3,
        color: '#000',
        textAlign: 'center'
    }
});