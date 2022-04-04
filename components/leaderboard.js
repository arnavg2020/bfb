// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { Rows } from 'react-native-table-component';
import { Row } from 'react-native-table-component';
import { Table } from 'react-native-table-component';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export default class Leaderboard extends Component {


  constructor() {
    super();
    this.state = { 
      isLoading: false,
      tableHeaders: ['Name', 'Pledge Type', 'Score'],
      scores: [],
      hasRendered: false
    }
    fetch('https://birdies-for-books.herokuapp.com/users', 
    {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Connection': 'keep-alive',
      }
    }
  ).then((response) => response.json()).then((responseData) => {
    responseData.forEach(user => {
      const currentScore = []
      currentScore.push(user.name);
      currentScore.push(user.pledge_score);
      currentScore.push(!!user.score ? user.score : 0);
      this.state.scores.push(currentScore);
    });
    this.state.scores.sort((a, b) => b[1] - a[1]);
    this.hasRendered = true;
    console.log(this.state.scores);
  }).catch((error) => {
    console.log(error);
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
    // The problem here is that it's trying to render before this.state.scores is fully loaded/the api call returns
    // It's showing an empty table, the console logging statements show that it is indeed accurately being populated once call finishes
    // tried putting an if this.state.scores.length == 0, return the loading icon in the above if(this.state.isLoading) but 
    // it's never switching over to the correct view even when the length is > 0?
    return (
      <View style={styles.container}>  
        <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
          <Row data={this.state.tableHeaders} style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows data={this.state.scores} textStyle={styles.TableText}/>
        </Table>
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
  HeadStyle: { 
    height: 50,
    width: '100%',
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: { 
    width: '100%',
    margin: 10
  }
});