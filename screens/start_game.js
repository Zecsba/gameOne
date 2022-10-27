import React, {useState} from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../constants/colors";
import Card from "../components/card";
import Input from "../components/input";
import NumberContainer from "../components/numberContainer";


const {height, width} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginVertical: 10,
    },
    scroll: {
        container: 1
    },
    title: {
        fontSize: 20,
        color: colors.text,
        textAlign: 'center',
        paddingVertical: 20,
        fontFamily: 'Lato-Regular',
    },
    label: {
        fontSize: 14,
        color: colors.text,
        textAlign: 'center',
        paddingVertical: 5,
    },
    inputContainer: {
        width: 320,
        maxWidth: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    input: {
        width: '100%',
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        maxWidth: 70,
        fontSize: 25,
        paddingVertical: 10,
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
    },
    buttonContainer: {
        width: width / 2.4 ,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    summaryContainer:{
        width: '80%',
        height: 180,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 10,
    },
    summaryText: {
        fontSize: 18,
        fontFamily: 'Lato-Regular',
    },
    
})

const StartGameScreen = ({onStartGame}) =>{

    const [number, setNumber] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(0)

    const onHandleChange = (text) => {
        setNumber(text.replace(/[^0-9]/g, ''))
    }

    const onReset = () => {
        setNumber('')
        setSelectedNumber(0)
        setConfirmed(false)
        Keyboard.dismiss()
    }

    const onConfirm = () =>{
        const chosenNumber = parseInt(number, 10)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) return;
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setNumber('')
    }

    const onHandleStarGame = () => {
        onStartGame(selectedNumber)
    }

    const confirmedOut = () => confirmed && (
        <Card style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Tu seleccion</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button
                title="Start game"
                onPress={onHandleStarGame}
                color={colors.primary}
            />
        </Card>
    )

    return(
        <KeyboardAvoidingView contentContainerStyle={styles.scroll} style={styles.scroll} behavior={Platform.OS === 'android' ? 'padding' : 'position'} keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}> 
                        <Text style={styles.title}>Inicio de juego</Text>
                            <Card style={styles.inputContainer}>
                                <Text style={styles.label}>Chose a number </Text>
                                <Input 
                                    style={styles.input} 
                                    keyboardType='numeric' 
                                    maxLength={2}
                                    blurOnSubmit
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={number}
                                    onChangeText={(text) => onHandleChange(text)}
                                />
                            
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Clear"
                                        onPress={onReset}
                                        color={colors.primary}
                                    />
                                    <Button
                                        title="Confirm"
                                        onPress={onConfirm}
                                        color={colors.secondary}
                                    />
                                </View>    
                            </Card>

                            {confirmedOut()}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default StartGameScreen