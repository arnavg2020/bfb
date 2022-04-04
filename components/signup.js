// components/signup.js
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { User } from './login';

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
      fetch(`https://birdies-for-books.herokuapp.com/add-users/${encodeURIComponent(this.state.displayName)}/${encodeURIComponent(this.state.email.toLowerCase())}/${encodeURIComponent(this.state.password)}/${encodeURIComponent(this.state.phoneNumber)}/birdie/0/0/0/0`, 
        {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
          }
        }
      ).then((response) => response.json()).then((responseData) => {
        if (!!responseData) {
          console.log(responseData);
          const user = new User(
            responseData.user_id, 
            responseData.name, 
            responseData.email, 
            responseData.phone_number, 
            responseData.password, 
            responseData.pledge_score, 
            responseData.pledge_amount, 
            responseData.score_amount, 
            responseData.outstanding_balance, 
            responseData.amount_paid_to_date
          );
          this.props.navigation.navigate('Pledge', {user: user});
          this.setState({
            isLoading: false,
          });
        } else {
          console.log('hit');
          Alert.alert('Unable to Sign Up, Please Try Again');
          this.setState({
            isLoading: false,
          });
        }
      }).catch((error) => {
        console.log(error);
        Alert.alert('Unable to Sign Up, Please Try Again');
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
            secureTextEntry={true}
          />   
          <TextInput
            style={styles.inputStyle}
            placeholder="Phone Number"
            value={this.state.phoneNumber}
            onChangeText={(val) => this.updateInputVal(val, 'phoneNumber')}
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