// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, Linking, ImageBackground, ActivityIndicator } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import('@react-navigation/native').Route;


export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isLoading: false
    }
  }

  render() {

    const goToInputPage = () => {
      this.props.navigation.navigate('Input', {
        user: this.props.route.params.user
      });
    }
    const goToPledgePage = () => {
      this.props.navigation.navigate('Pledge', {
        user: this.props.route.params.user
      });
    }

    const goToEditProfile = () => {
      this.props.navigation.navigate('Edit', {
        user: this.props.route.params.user
      });
    }

    const goToInfoPage = () => {
      Linking.openURL('http://reachoutandreadco.org/birdies-for-books');
    }

    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground source={require('bfb/assets/Golf-green-bkgd-01.png')} resizeMode="cover" style={styles.image}>
            <View style={styles.shadow}>
              <Text style={styles.headerText}>
                Thanks for playing, {this.props.route.params.user.name}!
              </Text>
              <Button
                color="black"
                title="LEARN ABOUT YOUR PLEDGE'S IMPACT >"
                onPress={() => goToInfoPage()}
              />
              <Text style={styles.buttonStyleTwo}></Text>
              <Text style={styles.textStyle}>
                <Text style={styles.textStyleTwo}>Email | </Text>{this.props.route.params.user.email}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={styles.textStyleTwo}>Pledge Type | </Text>{this.props.route.params.user.pledge_score}s
              </Text>
              <Text style={styles.textStyle}>
                <Text style={styles.textStyleTwo}>Pledge Amount | </Text>${this.props.route.params.user.pledge_amount}.00
              </Text>
              <Text style={[styles.textStyle, styles.bottomText]}>
                <Text style={styles.textStyleTwo}>Total {this.props.route.params.user.pledge_score}s This Season | </Text>{this.props.route.params.user.score_amount}
              </Text>
              <Button
                color="black"
                title="Record My Activity"
                onPress={() => goToInputPage()}
              />

              <Text style={styles.buttonStyle}>
              </Text>
              <Button
                color="white"
                title="Edit My Profile"
                onPress={() => goToEditProfile()}
              />
              <Button
                color="white"
                title="Edit My Pledge Information"
                onPress={() => goToPledgePage()}
              />
            </View>
            <Image
              style={styles.capTechBanner}
              source={require('bfb/assets/bottomlogobg.png')}
            />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonStyle: {
    marginTop: '6%'
  },
  buttonStyleTwo: {
    marginBottom: '3%'
  },
  bottomText: {
    marginBottom: '8%'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10%',
    width: '90%',
    marginLeft: '5%',
    marginTop: '50%'
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
  textStyle: {
    fontSize: 18,
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    width: '90%',
    marginLeft: '5%'
  },
  textStyleTwo: {
    fontSize: 18,
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    width: '90%',
    marginLeft: '5%',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  inputStyle: {
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: 15,
    paddingBottom: 15,
    paddingTop: 15,
    alignSelf: "center",
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center'
  },
  pickerStyle: {
    height: 30,
    width: 150,
    marginBottom: 200,
    color: 'white'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  shadow: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%'
  },
  capTechBanner: {
    height: 150,
    resizeMode: 'contain',
    width: '100%',
    marginTop: '0%',
    marginBottom: '24%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
});