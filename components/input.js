// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Linking, Button, Picker, Alert } from 'react-native';

export default class Input extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      scores: ''
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  goToLeaderboard = () => {
    this.props.navigation.navigate('Leaderboard')
    
    // , {
    //   user_id: route.params.user_id,
    //   name: route.params.username,
    //   email: route.params.email,
    //   password: route.params.password,
    //   phone_number: route.params.phoneNumber,
    //   pledge_score: route.params.pledgeType,
    //   pledge_amount: route.params.pledgeAmount,
    //   score_amount: !!this.state.scores ? this.state.scores : route.params.score_amount,
    //   outstanding_balance: route.params.outstanding_balance,
    //   amount_paid_to_date: route.params.amount_paid_to_date
    // });
  } 
   
  updateScores = () => {
    if (this.state.scores == '') {
        Alert.alert('Please enter a score amount')
    } else {
      // this.setState({
      //   isLoading: true,
      // });
      // fetch('https://birdies-for-books.herokuapp.com/users' + encodeURIComponent(route.params.user_id), 
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json, text/plain, */*',
      //       'Content-Type': 'application/json'
      //     },
      //     body: {
      //       user_id: route.params.user_id,
      //       name: this.state.username,
      //       email: route.params.email,
      //       phone_number: route.params.phoneNumber,
      //       password: route.params.password,
      //       pledge_score: route.params.pledgeType,
      //       pledge_amount: route.params.pledgeAmount,
      //       score_amount: route.params.score_amount,
      //       outstanding_balance: route.params.outstanding_balance,
      //       amount_paid_to_date: route.params.amount_paid_to_date
      //     }
      //   }
      // ).then((response) => response.json()).then((json) => {
      //   console.log(json);
      //   this.setState({
      //     isLoading: false,
      //   });
        //we need to use route params to fetch the outstanding balance and replace this.state.scores
        Alert.alert(
          "Successfully Submitted Scores",
          ("Your Outstanding Balance is $" + this.state.scores + '. Please click OK to visit the donation page.'),
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => Linking.openURL('https://reachoutandreadco.org/birdies-for-books/') }
          ]
        );
      // }).catch((error) => {
      //   Alert.alert(error.Message);
      //   this.setState({
      //     isLoading: false,
      //   });
      // });
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.uid}
        </Text>
        <Text style = {styles.textStyle}>
          How many scores did you have today?
          {/* How many {route.params.pledge_score} did you score? */}
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