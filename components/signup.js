// components/signup.js
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      phoneNumber: '',
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to Sign Up!')
    } else {
      this.setState({
        isLoading: true,
      });
      fetch('https://birdies-for-books.herokuapp.com/users', 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: {
            name: this.state.displayName,
            email: this.state.email,
            password: this.state.password,
            phone_number: this.state.phoneNumber,
            pledge_score: 0,
            pledge_amount: 0,
            score_amount: 0,
            outstanding_balance: 0,
            amount_paid_to_date: 0
          }
        }
      ).then((response) => response.text()).then((responseData) => {
        console.log(responseData);
        this.props.navigation.navigate('Pledge', {
          user_id: response.user_id,
          name: response.displayName,
          email: response.email,
          phone_number: response.phoneNumber,
          password: response.password,
          pledge_score: response.pledgeType,
          pledge_amount: response.pledgeAmount,
          score_amount: response.score_amount,
          outstanding_balance: response.outstanding_balance,
          amount_paid_to_date: response.amount_paid_to_date
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
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
       <ImageBackground source={{uri: 'https://cdn.wallpapersafari.com/83/29/i30AGk.jpg'}} resizeMode="cover" style={styles.image}>
          <Image
            style={styles.banner}
            source={{uri: 'https://reachoutandreadco.org/wp-content/uploads/2021/04/birdies-for-books-reach-out-and-read-colorado-01-2048x525.png'}}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={this.state.displayName}
            onChangeText={(val) => this.updateInputVal(val, 'displayName')}
          />      
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
          />   
          <TextInput
            style={styles.inputStyle}
            placeholder="Phone Number"
            value={this.state.phoneNumber}
            onChangeText={(val) => this.updateInputVal(val, 'phoneNumber')}
            maxLength={15}
          />   
          <Button
            color="white"
            title="Sign Up"
            onPress={() => this.registerUser()}
          />
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Already Registered? Click here to login
          </Text>     
        </ImageBackground>                     
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "white",
    borderBottomWidth: 1,
    color: 'white'
  },
  loginText: {
    color: 'white',
    marginTop: 25,
    textAlign: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    marginLeft: '10%'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});