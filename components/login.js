// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';


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
      this.setState({
        isLoading: true,
      });
      fetch(`https://birdies-for-books.herokuapp.com/users/login?email=${encodeURIComponent(this.state.email)}&password=${encodeURIComponent(this.state.password)}`, 
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          //this will nees a body vs doing all the user login via the url parameters. I can change the login endpoint to look at the url params instread but I have it set up as having a body 
          // something like this
          body: {
          email:this.state.email,
          password: this.state.password
        }
      ).then((response) => response.text()).then((responseData) => {
        if (!!responseData) {
          console.log(responseData);
          this.setState({
            isLoading: false,
          });
          // this.props.navigation.navigate('Profile');
          // need to include the response body in route params in this navigation link
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
