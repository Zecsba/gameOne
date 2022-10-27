import React from 'react'
import { View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native'
import Card from '../components/card'
import NumberContainer from '../components/numberContainer'
import { useState, useRef, useEffect } from 'react'
import { colors } from '../constants/colors'

const {height, width} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    card: {
        marginTop: 20,
         marginHorizontal: 20,
         width: width/1.7,
         height: 200,
         alignItems: 'center',
         justifyContent: 'center'
    },
    buttonContainer: {
        width: '70%',
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }
})

const generateRandomNumberBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    if (randomNumber === exclude) {
        return generateRandomNumberBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
}

const GameScreen = ({selectedNumber, onGameOver}) => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomNumberBetween(1, 100, selectedNumber))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const onHandleNextGuess = (direction) => {
        if(
            (direction === 'lower' && currentGuess < selectedNumber) ||
            (direction === 'greater' && currentGuess > selectedNumber)
         ) {
                Alert.alert('No mientas', 'tu sabes que esta mal...', [{text: 'Sorry!', style: 'cancel'}]);
                return
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomNumberBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds + 1);
    }; 

    useEffect(() => {
        if(currentGuess === selectedNumber) {
            onGameOver(rounds);
        }
    }, [currentGuess, selectedNumber, onGameOver]);

    return(
        <View style={styles.container}>
           <Card style={styles.card}>
                <Text style={styles.title}>La suposicion del oponente</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <Button 
                        title='Menor'
                        onPress={() => onHandleNextGuess('lower')}
                        color={colors.primary}
                    />
                    <Button 
                        title='Mayor'
                        onPress={() => onHandleNextGuess('greater')}
                        color={colors.secondary}
                    />
                </View>
           </Card>
        </View>
    )
}

export default GameScreen