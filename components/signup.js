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

  render() {

    const updateInputVal = (val, prop) => {
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
        fetch(`https://birdies-for-books.herokuapp.com/users`,
          {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json; charset=utf-8',
              'Connection': 'keep-alive',
            },
            body: JSON.stringify({
              amount_paid_to_date: 0,
              email: this.state.email.toLowerCase(),
              name: this.state.displayName.toString(),
              outstanding_balance: 0,
              password: this.state.password,
              phone_number: this.state.phoneNumber.toString(),
              pledge_amount: 0,
              pledge_score: "",
              score_amount: 0,
              total_pledged: 0
            })
          }
        ).then((response) => response.json()).then((responseData) => {
          if (!!responseData) {
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
                  responseData.email.toLowerCase(),
                  responseData.phone_number,
                  responseData.password,
                  responseData.pledge_score,
                  responseData.pledge_amount,
                  responseData.score_amount,
                  responseData.outstanding_balance,
                  responseData.amount_paid_to_date,
                  responseData.total_pledged
                );
                this.props.navigation.navigate('Pledge', { user: user });
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
          } else {
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


    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://cdn.wallpapersafari.com/83/29/i30AGk.jpg' }} resizeMode="cover" style={styles.image}>
          <View style={styles.shadow}>
            <Image
              style={styles.banner}
              source={{ uri: 'https://reachoutandreadco.org/wp-content/uploads/2021/04/birdies-for-books-reach-out-and-read-colorado-01-2048x525.png' }}
            />
            <TextInput

              style={styles.inputStyleFirst}
              placeholder="Name"
              value={this.state.displayName}
              onChangeText={(val) => updateInputVal(val, 'displayName')}
            />
            <TextInput

              style={styles.inputStyle}
              placeholder="Email"
              value={this.state.email}
              onChangeText={(val) => updateInputVal(val, 'email')}
            />
            <TextInput

              style={styles.inputStyle}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => updateInputVal(val, 'password')}
              secureTextEntry={true}
            />
            <TextInput

              style={styles.inputStyle}
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChangeText={(val) => updateInputVal(val.replace(/\D/g, ''), 'phoneNumber')}
            />
            <Button
              color="white"
              title="Sign Up"
              onPress={() => registerUser()}
            />
            <Text
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Login')}>
              Already Registered? Click here to login
            </Text>
          </View>
          <Image
            style={styles.capTechBanner}
            source={require('bfb/assets/loginbg.png')}
          />
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
    borderRadius: 10,
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: 15,
    paddingBottom: 15,
    paddingTop: 15,
    alignSelf: "center",
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center'
  },
  inputStyleFirst: {
    borderRadius: 10,
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: 15,
    paddingBottom: 15,
    paddingTop: 15,
    alignSelf: "center",
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center'
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
  shadow: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%'
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    marginLeft: '10%',
    marginTop: '60%',
    marginBottom: '4%'
  },
  capTechBanner: {
    height: 200,
    resizeMode: 'contain',
    width: '100%',
    marginTop: '0%',
    marginBottom: '35%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
});