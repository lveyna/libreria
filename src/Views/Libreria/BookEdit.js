import React, {useState} from "react";
import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, Image } from 'react-native'
import { useMutation } from "react-query";
import useLibraryContext from "../../hooks/use.LibraryContext";
import getBook, {useInvalidateBook} from "../../hooks/getBook";

async function putBook(data){
  
    const res = await fetch(data.url+"api/libros/"+data._id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: data.titulo,
          autor: data.autor,
          portada: data.portada
        })
    })
    const json = await res.json();
    return json;
}//Fin de putBook

export default function BookEdit({navigation,route}){    
    const {_id, url } = route.params

    //Context
    const { invalidateBookListCache}= useLibraryContext();
    
    //Cache para invalidar los datos de libro de memoria y recargarlos de la API
    const invalidateBook = useInvalidateBook({_id, url})

    //Cargamos el libro de la base de datos
    const {data, isLoading} = getBook({_id, url});

    const [titulo, setTitulo] = useState(data?.libro.titulo);
    const [autor, setAutor] = useState(data?.libro.autor);
    const [portada, setPortada]= useState(data?.libro.portada);

    //estado de la petición para guardar los cambios
    const { mutate, isPosting, error } = useMutation(putBook, {
        onSuccess: ()=>{
            invalidateBookListCache();
            invalidateBook(_id, url);
            navigation.navigate('BookDetail',{_id, url})
        }  
    });

    function submit(){
        mutate({titulo, autor, portada, url, _id})
    } //Fin de submit
    

    if (isLoading){
        return (
            <View>
                <ActivityIndicator />
                <Text>Cargando libro...</Text>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <View style={styles.formRowOne}>
                <Image source={{uri:url+data.libro.portada}}
                        style={styles.image} 
                />
                <Button onPress={submit} title="Editar Libro" />
            </View>

        <Text style={styles.textTitle}>Titulo</Text>
        <TextInput onChangeText={text=> setTitulo(text)}
                   style={styles.textInput}
                   value={titulo}
        />
        <Text style={styles.textTitle}>Autor</Text>
        <TextInput onChangeText={text=> setAutor(text)}
                   style={styles.textInput}
                   value={autor}
        /> 
        <Text style={styles.textTitle}>Portada</Text>
        <TextInput onChangeText={text=> setPortada(text)}
                   style={styles.textInput}
                   value={portada}
        /> 
        { isPosting && <Text>Actualizando el libro en la biblioteca</Text> }
        { error && <Text>Error al actualizar el libro en la biblioteca</Text> }
    </View>

    )//Return
}//BookEdit

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    formRowOne: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    form: {
        paddingHorizontal: 16,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin:5,
        minWidth: 150
    },
    textTitle:{
        textDecorationColor: 'blue',
        fontSize: 20,
        color: 'blue'
    },
    imageContainer: {
      marginVertical: 24,
      alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        alignItems: 'center',
        resizeMode: 'contain',
        marginRight: 10,
        marginBottom: 10
      },
})