import React, { useLayoutEffect} from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image, Button } from 'react-native'
import getBook from "../../hooks/getBook";

export default function BookDetail({navigation, route}){    
    const {_id, url} = route.params
    
    const {data, isLoading, isSuccess} = getBook({_id, url});

    useLayoutEffect(function (){
        if (isSuccess){ //Si hemos recuperado el libro satisfactoriamente
            navigation.setOptions({
                headerRight: ()=>(
                    <Button 
                        onPress={ ()=> 
                            navigation.navigate('BookEdit', {_id, url}) 
                        }
                        title = 'Editar' //Título del botón
                    />    
                ), //headerRight
                title: data.libro.titulo, //titulo de la pestaña
            }) //setOptions
        } //isSucess
    }) //useLayoutEffect

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
            <View style={styles.row}>
                <Image source={{uri:url+data.libro.portada}}
                        style={styles.image} 
                />
            </View>
            <Text style={styles.textTitle}>Titulo</Text>
            <Text style={styles.text}>{data.libro.titulo}</Text>
            <Text style={styles.textTitle}>Portada</Text>
            <Text style={styles.text}>{data.libro.autor}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0E0'
    },
    row: {
        marginBottom: 10,
    },
    textTitle:{
        textDecorationColor: 'blue',
        fontSize: 20,
        color: 'blue',
        marginTop: 10
    },
    text:{
        fontSize: 18,
        textAlign: 'center'
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