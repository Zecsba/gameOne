import React from "react"
import {View, Text, StyleSheet} from "react-native"
import { colors } from "../constants/colors"


const style = StyleSheet.create({
    header: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        padding: 10,
    },
    title: {
        fontSize: 20,
        color: colors.white,
        fontFamily: 'Lato-Regular',

    }
})

const Header = ({title}) =>{
    return(
        <View style={style.header}>
            <Text style={style.title}>{title}</Text>
        </View>
    )
}

export default Header