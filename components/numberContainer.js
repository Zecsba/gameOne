import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors } from '../constants/colors'


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 25,
        fontFamily: 'Lato-Regular',

    }
})

const NumberContainer = ({children}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{children}</Text>
        </View>
    )
}

export default NumberContainer