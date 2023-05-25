import React, {useState} from "react";
import { SafeAreaView, TextInput, Button, Text, View, StyleSheet, Image, Alert } from 'react-native'
import * as ImagePicker from 'react-native-image-crop-picker';

//Importamos useMutation que nos permite recargar la librería.
import {useMutation} from "react-query";

//Importamos el contexto de la App
import useLibraryContext from "../../hooks/use.LibraryContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const options = {
    title: 'Selecciona la portada del libro',
    type: 'library',
    ptions: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true
    }
}//Fin de options de libro

async function postBook(data){
  
    const res = await fetch(data.url+'api/libros/', {
        method: 'POST',
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
    //console.log(res);
    const json = await res.json();
    return json;
}//Fin de postBook

export default function AddBook({navigation}){

    //Context
    const { invalidateBookListCache, url }= useLibraryContext();

    //estado de la petición para guardar
    const {mutate, isLoading, error } = useMutation(postBook, {
        onSuccess: ()=>{
             invalidateBookListCache();
             navigation.navigate('BookList')
        }  
    });
       
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [imagen, setImagen] = useState(null);
    const [portada, setPortada]= useState('');


    function submit(){
        mutate({titulo, autor, portada, url})
    } //Fin de submit

    //Función para elegir foto de la galería
    const onButtonPress = React.useCallback((options) => {
        ImagePicker2.launchImageLibrary(options, response=>{
            if (response.didCancel)
                console.log("Cancelado por el usuario");
            else if (response.error)
                console.log('Error al cargar la imagen')
            else {
                console.log(response.assets);
                const dataimagen = response.assets[0].uri;
                setImagen(dataimagen);
            }
        });
    });

    const onSelectImage = async()=>{
        Alert.alert(
            'Portada del libro',
            'Elige una opción',
            [
                { text: 'Camara', onPress: onCamera },
                { text: 'Galería',onPress: onGallery},
                { text: 'Cancelar', style: 'destructive', onPress: ()=>{} }
            ],
            { cancelable: false} //Esto solo funciona para android, para que no cierre
                                //La alerta si se presiona fuera de la alerta
        )

    }

    const onCamera= ()=>{
        ImagePicker2.openPicker({
            width:300,
            height: 400,
            cropping: true
        }).then( image =>{
            console.log("camera Image", image)
            imageUpload(image.path)
        });
    }

    const onGallery= ()=>{
        ImagePicker.openPicker({
            width:300,
            height: 400,
            cropping: true
        }).then( image =>{
            console.log('Galeria' + image);
            imageUpload(image.path);
        });
    }

    const imageUpload = (imagePath) => {
        const imageData = new FormData()
        imageData.append("file", {
          uri: imagePath,
          name: 'image.png',
          fileName: 'image',
          type: 'image/png'
        })
        console.log("form data", imageData)
      }


    return (
        <SafeAreaView>
            <View style={styles.form}>
                <Text>Titulo</Text>
                <TextInput onChangeText={text=> setTitulo(text)}
                           style={styles.textInput}
                           value={titulo}
                />
                <Text>Autor</Text>
                <TextInput onChangeText={text=> setAutor(text)}
                           style={styles.textInput}
                           value={autor}
                /> 
                <Text>Portada</Text>
                <TextInput onChangeText={text=> setPortada(text)}
                           style={styles.textInput}
                           value={portada}
                /> 
                {imagen && <Image source={{uri: imagen}} style={styles.image}/> }
                <Button
                    title="Seleccionar foto"
                    onPress={() => onButtonPress(options)}>
                </Button>
                <TouchableOpacity
                    style = {styles.btnStyle}
                    activeOpacity = {0.8}
                    onPress={onSelectImage}
                >
                    <Text style={styles.textStyle}>Elegir Imagen</Text>
                </TouchableOpacity>
                <Button onPress={submit} title="Añadir Libro" />
                { isLoading && <Text>Agregando libro a la biblioteca</Text> }
                { error && <Text>Error al agregar libro a la biblioteca</Text> }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 16,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin:5,
    },
    imageContainer: {
      marginVertical: 24,
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      alignItems: 'center',
    },
    btnStyle: {
        backgroundColor: 'blue',
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 16
      }
})