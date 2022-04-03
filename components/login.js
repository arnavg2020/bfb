// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';


export class User {
  user_id = '';
  name = '';
  email = '';
  phone_number = '';
  password = '';
  pledge_score = '';
  pledge_amount = 0;
  score_amount = 0;
  outstanding_balance = 0;
  amount_paid_to_date = 0;

  constructor(user_id, name, email, phone_number, password, pledge_score, pledge_amount, score_amount, outstanding_balance, amount_paid_to_date) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.phone_number = phone_number;
    this.password = password;
    this.pledge_score = pledge_score;
    this.pledge_amount = pledge_amount;
    this.score_amount = score_amount;
    this.outstanding_balance = outstanding_balance;
    this.amount_paid_to_date = amount_paid_to_date;
  }
}

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to login!')
    } else {
      console.log(this.state.email.toLowerCase() + ' ' + this.state.password);
      this.setState({
        isLoading: true,
      });
      fetch(`https://birdies-for-books.herokuapp.com/users/login/${encodeURIComponent(this.state.email.toLowerCase())}/${encodeURIComponent(this.state.password)}`, 
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
          }
        }
      ).then((response) => response.json()).then((responseData) => {
        if (!!responseData) {
          this.setState({
            isLoading: false,
          });
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
          if (responseData.pledge_amount == 0) {
            this.props.navigation.navigate('Pledge', {user: user});
          } else {
            this.props.navigation.navigate('Profile', {user: user});
          }
        } else {
          this.setState({
            isLoading: false,
          });
          Alert.alert('Invalid Email Address or Password');
        }
      }).catch((error) => {
        console.log(error);
        Alert.alert('Invalid Email Address or Password');
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
          <Button
            color="white"
            title="Login"
            onPress={() => this.userLogin()}
          />   
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Don't have an account? Click here to sign up
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
    justifyContent: "center"
    // backgroundColor: '#B1D363'
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
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});