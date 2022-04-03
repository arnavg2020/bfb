// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export class UserScore {
  name = '';
  score = 0;
  pledgeType='Birdie'

  constructor(name, score, pledgeType) {
    this.name = name;
    this.pledgeType = pledgeType;
    this.score = score;
  }
}

export default class Leaderboard extends Component {

  scores = [];

  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
    fetch('https://birdies-for-books.herokuapp.com/users/', 
    {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Connection': 'keep-alive',
      }
    }
  ).then((response) => response.json()).then((json) => {
    console.log(json);
    response.users.subscribe(data => {
      data.forEach(user => {
        const score = new UserScore(user.name, user.score);
        this.scores.push(score);
      });
    });
    this.scores.sort((a, b) => b.score - a.score);
  }).catch((error) => {
    Alert.alert(error.Message);
    this.setState({
      isLoading: false,
    });
  });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  goToProfile = () => {
    this.props.navigation.navigate('Profile', {user: route.params.user})
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
        <Text style={styles.loginText}>Leaderboard will go here</Text>  
        {/* Will need to load each value of this.scores into the table */}
        <Button
          color="white"
          title="Return to Profile"
          onPress={() => this.goToProfile()}
        />             
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#c2282d'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 15,
    color: 'white'
  },
  inputStyle: {
    fontSize: 20,
    marginBottom: 50,
    height: 50,
    width: 150,
    textAlign: 'center',
    color: 'white'
  },
  pickerStyle: {
    height: 30,
    width: 150,
    marginBottom: 200,
    color: 'white'
  }
});