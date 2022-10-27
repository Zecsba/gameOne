import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { colors } from '../constants/colors'

const styles = StyleSheet.create({
    input: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        marginVertical: 20,
        fontFamily: 'Lato-Regular',

    }
})


const Input = ({style, ...props}) =>{
    return(
        <TextInput {...props} style={{...style.input, ...style}}/>
    )
}


export default Input