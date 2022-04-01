// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker, Alert } from 'react-native';
export default class Pledge extends Component {

  constructor() {
    super();
    this.state = { 
      pledgeAmount: 0,
      pledgeType: '0'
    }
  }


  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  goToProfile = () => {
    this.setState({
        isLoading: false,
    })
    if (this.state.pledgeAmount == 0) {
      Alert.alert('Please enter a pledge amount!')
    } else {
      this.setState({
        isLoading: true,
      });
      fetch('https://birdies-for-books.herokuapp.com/updateUser', 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: {
            user_id: route.params.user_id,
            name: route.params.displayName,
            email: route.params.email,
            phone_number: route.params.phoneNumber,
            password: route.params.password,
            pledge_score: this.state.pledgeType,
            pledge_amount: this.state.pledgeAmount,
            score_amount: route.params.score_amount,
            outstanding_balance: route.params.outstanding_balance,
            amount_paid_to_date: route.params.amount_paid_to_date
          }
        }
      ).then((response) => response.json()).then((json) => {
        console.log(json);
        this.props.navigation.navigate('Profile', {
          name: route.params.displayName,
          email: route.params.email,
          phone_number: route.params.phoneNumber,
          pledge_score: this.state.pledgeType,
          pledge_amount: this.state.pledgeAmount,
          score_amount: response.score_amount
        });
        this.setState({
          isLoading: false,
        });
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
          Hello, {this.state.uid}
        </Text>
        <Text style = {styles.textStyle}>
          What would you like to pledge for?
        </Text>
        <Picker
          style={styles.pickerStyle}
          onValueChange={(val) => this.updateInputVal(val, 'pledgeType')}
          value={this.state.pledgeType}
        >
          <Picker.Item label="Birdies" value="0" />
          <Picker.Item label="Pars" value="1" />
          <Picker.Item label="Bogies" value="2" />
        </Picker>
        <Text style = {styles.textStyle}>
          How much would you like to pledge for each?
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Amount"
          value={this.state.pledgeAmount}
          onChangeText={(val) => this.updateInputVal(val, 'pledgeAmount')}
        />
        <Button
          color="white"
          title="Update and Go To Profile"
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