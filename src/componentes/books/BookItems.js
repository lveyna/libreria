import React from "react";
import {Image, StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign';

export default function BookItems({book, url, onPress, onDelete}){
    return(
        <TouchableOpacity onPress={onPress} style = {styles.container}>   
            <Image source={{uri:url+book.portada}}
                        style={styles.image} 
                />
            <View style = {styles.text}>
                <Text>{book.titulo}</Text>
            </View>    
            <View style = {styles.text}>
                <Text>{book.autor}</Text>
            </View>    
            <TouchableOpacity onPress={onDelete}>
                <Icon name="delete" style={styles.icon} />
            </TouchableOpacity>
                <Icon name="caretright" style={styles.icon} />
        </TouchableOpacity>
    )
}//Fin de BookItems

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0E0',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        flexDirection: 'row',
        fontSize:20,
        margin: 3,
        padding: 3,
    },
    icon: {
        color: '#000',
        marginLeft: 'auto',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,

    },
    image: {
        width: 100,
        height: 100,
        alignItems: 'center',
        resizeMode: 'contain',
        margin: 3,
    },
})