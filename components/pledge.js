// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker, Alert, ImageBackground, ActivityIndicator, Image } from 'react-native';
export default class Pledge extends Component {

  constructor() {
    super();
    this.state = {
      pledgeAmount: 0,
      pledgeType: 'Birdie'
    }
  }

  render() {



    const updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    const returnToProfile = () => {
      this.props.navigation.navigate('Profile', { user: this.props.route.params.user })
    }
    const goToProfile = () => {
      this.setState({
        isLoading: false,
      })
      if (this.state.pledgeAmount == 0) {
        Alert.alert('Please enter a pledge amount!')
      } else {
        this.setState({
          isLoading: true,
        });
        fetch(`https://birdies-for-books.herokuapp.com/users/update-user/${encodeURIComponent(this.props.route.params.user.user_id)}`,
          {
            method: 'PATCH',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json; charset=utf-8',
              'Connection': 'keep-alive',
            },
            body: JSON.stringify({
              user_id: this.props.route.params.user.user_id,
              name: this.props.route.params.user.name,
              email: this.props.route.params.user.email,
              phone_number: this.props.route.params.user.phone_number,
              password: this.props.route.params.user.password,
              pledge_score: this.state.pledgeType,
              pledge_amount: this.state.pledgeAmount,
              score_amount: this.props.route.params.user.score_amount,
              outstanding_balance: this.props.route.params.user.outstanding_balance,
              amount_paid_to_date: this.props.route.params.user.amount_paid_to_date,
              total_pledged: this.props.route.params.user.total_pledged
            })
          }
        ).then((response) => response.json()).then((json) => {
          this.props.route.params.user.pledge_score = this.state.pledgeType;
          this.props.route.params.user.pledge_amount = this.state.pledgeAmount;
          this.props.navigation.navigate('Profile', {
            user: this.props.route.params.user
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
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('bfb/assets/Golf-green-bkgd-01.png')} resizeMode="cover" style={styles.image}>
          <View style={styles.shadow}>
            <Text style={styles.headerText}>
              Hello, {this.props.route.params.user.name}
            </Text>
            <Text style={styles.topText}>
              Pledge a dollar amount of your choice to be donated to Reach Out and Read Colorado for each Birdie, Par or Bogey that you score during the 2022 golf season.
            </Text>
            <Text style={styles.textStyle}>
              I'd like to pledge for my…
            </Text>
            {/* <View style={styles.pickerContainer}> */}
            <Picker
              style={styles.pickerStyle}
              itemStyle={{ color: 'white', fontSize: 17, height: 90 }}
              onValueChange={(val) => updateInputVal(val, 'pledgeType')}
              selectedValue={this.state.pledgeType || "Birdie"}
            >
              <Picker.Item label={"Birdies"} value={"Birdie"} />
              <Picker.Item label={"Pars"} value={"Par"} />
              <Picker.Item label={"Bogeys"} value={"Bogey"} />
            </Picker>
            {/* </View> */}
            <Text style={styles.textStyleTwo}>
              I'll pledge...
            </Text>
            <TextInput
              keyboardType={"number-pad"}
              placeholderTextColor="white"
              style={styles.inputStyle}
              placeholder="Dollar Amount Per ($)"
              value={this.state.pledgeAmount.toString() != 0 ? this.state.pledgeAmount.toString() : null}
              onChangeText={(val) => updateInputVal(val.replace(/\D/g, ''), 'pledgeAmount')}
            />
            <Button
              color="black"
              title="Submit"
              onPress={() => goToProfile()}
            />
            <Button
              color="black"
              title="View My Profile"
              onPress={() => returnToProfile()}
            />
          </View>
          <Image
              style={styles.bottomBanner}
              source={require('bfb/assets/bottomlogobg.png')}
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
    justifyContent: "center"
  },
  buttonStyle: {
    marginTop: '10%'
  },
  topText: {
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
    marginLeft: '15%',
    textAlign: 'center',
    marginBottom: '5%'
  },
  pickerContainer: {
    marginTop: 0,
    marginBottom: 0
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '5%',
    width: '90%',
    marginLeft: '5%',
    marginTop: '50%'
  },
  bottomBanner: {
    height: 150,
    resizeMode: 'contain',
    width: '100%',
    marginTop: '0%',
    marginBottom: '24%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    width: '90%',
    marginLeft: '5%',
    fontWeight: 'bold'
  },
  textStyleTwo: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    width: '90%',
    marginLeft: '5%',
    marginBottom: '5%',
    marginTop: '5%',
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
    width: '20%',
    color: 'white',
    marginLeft: '40%',
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  shadow: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%'
  }
});