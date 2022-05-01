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
  total_pledged = 0;

  constructor(user_id, name, email, phone_number, password, pledge_score, pledge_amount, score_amount, outstanding_balance, amount_paid_to_date, total_pledged) {
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
    this.total_pledged = total_pledged;
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

  render() {

    const updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    const userLogin = () => {
      if (this.state.email === '' && this.state.password === '') {
        Alert.alert('Enter details to login!')
      } else {
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
            if (responseData.pledge_amount == 0) {
              this.props.navigation.navigate('Pledge', { user: user });
            } else {
              this.props.navigation.navigate('Leaderboard', { user: user });
            }
          } else {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Invalid Email Address or Password');
          }
        }).catch((error) => {
          Alert.alert('Invalid Email Address or Password');
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
            {/* <View style={styles.contentContainer}> */}
            <Image
              style={styles.banner}
              source={{ uri: 'https://reachoutandreadco.org/wp-content/uploads/2021/04/birdies-for-books-reach-out-and-read-colorado-01-2048x525.png' }}
            />
            <Text style={styles.topText}>Support early literacy every time you golf. It’s that easy.</Text>
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
              maxLength={15}
              secureTextEntry={true}
            />
            <Button
              color="white"
              title="Login"
              onPress={() => userLogin()}
            />
            <Text
              style={styles.loginTextButton}
              onPress={() => this.props.navigation.navigate('Signup')}>
              Don't have an account? Click here to sign up.
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
  contentContainer: {
    height: '90%',
    marginTop: '10%'
  },
  mb2: {
    marginTop: 0,
    marginBottom: 24
  },
  topText: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    width: '70%',
    marginLeft: '15%',
    textAlign: 'center',
    marginBottom: '10%',
    marginTop: '10%'
  },
  bottomShadow: {
    backgroundColor: 'rgb(5,71,88)',
    height: 220
  },
  bottomText: {
    color: '#9cbe52',
    fontWeight: 'bold',
    width: '70%',
    marginLeft: '15%',
    marginTop: '5%',
    textAlign: 'center'
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
  loginText: {
    color: 'white',
    marginTop: 25,
    textAlign: 'center'
  },
  loginTextButton: {
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
    marginTop: '6%',
    marginBottom: '7%'
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
});