// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Linking, Button, Picker, Alert } from 'react-native';

export default class Input extends Component {
  constructor() {
    super();
    this.state = { 
      scores: ''
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  goToLeaderboard = () => {
    this.props.navigation.navigate('Leaderboard', {user: route.params.user})
  
  } 
   
  updateScores = () => {
    if (this.state.scores == '') {
        Alert.alert('Please enter a score amount')
    } else {
      this.setState({
        isLoading: true,
      });
      fetch('https://birdies-for-books.herokuapp.com/users/update-user/' + encodeURIComponent(route.params.user.user_id), 
        {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
          },
          //route params here are coming undefined, same is holding true on every other page, for some reason they're not being fetched
          //i took this code from documentation so not sure what is wrong here
          body: {
            user_id: route.params.user.user_id,
            name: this.state.username,
            email: route.params.user.email,
            phone_number: route.params.user.phone_number,
            password: route.params.user.password,
            pledge_score: route.params.user.pledge_type,
            pledge_amount: route.params.user.pledge_amount,
            score_amount: this.state.scores,
            outstanding_balance: route.params.user.outstanding_balance,
            amount_paid_to_date: route.params.user.amount_paid_to_date
          }
        }
      ).then((response) => response.json()).then((json) => {
        console.log(json);
        this.setState({
          isLoading: false,
        });

        route.params.user.score_amount = route.params.user.score_amount + this.state.scores;
        route.params.user.outstanding_balance = route.params.user.outstanding_balance + (route.params.user.pledge_amount * this.state.scores);


        Alert.alert(
          "Successfully Submitted Scores",
          ("Your Outstanding Balance is $" + (route.params.user.outstanding_balance + (route.params.user.pledge_amount * this.state.scores)) + '. Please click OK to visit the donation page.'),
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => Linking.openURL('https://reachoutandreadco.org/birdies-for-books/') }
          ]
        );
      }).catch((error) => {
        Alert.alert(error.Message);
        this.setState({
          isLoading: false,
        });
      });
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {route.params.user.name}
        </Text>
        <Text style = {styles.textStyle}>
          How many {route.params.user.pledge_score} did you score today?
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Amount"
          value={this.state.scores}
          onChangeText={(val) => this.updateInputVal(val, 'scores')}
        />
        <Button
          color="white"
          title="Submit Scores"
          onPress={() => this.updateScores()}
        />
        <Button
          color="white"
          title="View Leaderboard"
          onPress={() => this.goToLeaderboard()}
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