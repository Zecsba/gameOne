import { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { colors } from './constants/colors';
import Header from './components/header';
import StartGameScreen from './screens/start_game';
import GameScreen from './screens/game';
import GameOverScreen from './screens/game-over';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default function App() {

  const [userNumber, setUserNumber] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [loaded] = useFonts({
    'Lato-Regular': require('./assets/font/Lato-Regular.ttf'),
    'Lato-Light': require('./assets/font/Lato-Light.ttf'),
    'Lato-Italic': require('./assets/font/Lato-Italic.ttf'),
    'Lato-Bold': require('./assets/font/Lato-Bold.ttf'),
    'Lato-Black': require('./assets/font/Lato-Black.ttf')
  })
  const title = !userNumber ? 'Adivina un numero' : 'Comienza el juego'

  const onStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  const onGameOver = (roundsNumber) => {
    setRounds(roundsNumber)
  }

  const onRestartGame = () =>{
    setUserNumber(0)
    setRounds(0)
  }

  if(!loaded){
    return (
      <View style={styles.containerLoader}>
        <ActivityIndicator size="large" color={colors.primary}/>
      </View>
    )
  }

  let content = <StartGameScreen onStartGame={onStartGame}/>

  if(userNumber && rounds <= 0){
      content = <GameScreen selectedNumber={userNumber} onGameOver={onGameOver} />
  }else if(rounds > 0){
      content = <GameOverScreen roundsNumber={rounds} userNumber={userNumber} onRestart={onRestartGame}/>  
  }

  return (
    <View style={styles.container}>
      <Header title={title} />
      {content}
    </View>
  );
}

