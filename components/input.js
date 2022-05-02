// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Linking, Button, Picker, Alert, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      scores: ''
    }
  }

  render() {



    const updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    const goToLeaderboard = () => {
      this.props.navigation.navigate('Leaderboard', { user: this.props.route.params.user })
    }
    const goToProfile = () => {
      this.props.navigation.navigate('Profile', { user: this.props.route.params.user })
    }

    const updateScores = () => {
      if (this.state.scores == '') {
        Alert.alert('Please enter a score amount')
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
              name: this.state.username,
              email: this.props.route.params.user.email,
              phone_number: this.props.route.params.user.phone_number,
              password: this.props.route.params.user.password,
              pledge_score: this.props.route.params.user.pledge_type,
              pledge_amount: this.props.route.params.user.pledge_amount,
              score_amount: (parseInt(parseInt(this.props.route.params.user.score_amount) + parseInt(this.state.scores))),
              outstanding_balance: (parseInt(parseInt(this.props.route.params.user.outstanding_balance) + (parseInt(this.state.scores) * parseInt(this.props.route.params.user.pledge_amount)))),
              amount_paid_to_date: this.props.route.params.user.amount_paid_to_date,
              total_pledged: this.props.route.params.user.total_pledged
            })
          }
        ).then((response) => response.json()).then((json) => {
          this.setState({
            isLoading: false,
          });

          this.props.route.params.user.score_amount = parseInt(parseInt(this.props.route.params.user.score_amount) + parseInt(this.state.scores));
          this.props.route.params.user.outstanding_balance = parseInt(parseInt(this.props.route.params.user.outstanding_balance) + parseInt(parseInt(this.props.route.params.user.pledge_amount) * parseInt(this.state.scores)));

          const amt = parseInt(parseInt(this.props.route.params.user.outstanding_balance) + parseInt(parseInt(this.state.scores) * parseInt(this.props.route.params.user.pledge_amount)));


          Alert.alert(
            ("Thanks!"),
            ("You've pledged $" + amt + ' to date. Click Pay Now to settle up, or OK to return to the leaderboard.'),
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate('Leaderboard', { user: this.props.route.params.user }),
                style: "cancel"
              },
              {
                text: "Pay Now", onPress: () => {
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
                        pledge_score: this.props.route.params.user.pledge_type,
                        pledge_amount: this.props.route.params.user.pledge_amount,
                        score_amount: this.props.route.params.user.score_amount,
                        outstanding_balance: 0,
                        amount_paid_to_date: parseInt(parseInt(this.props.route.params.user.outstanding_balance) + parseInt(this.props.route.params.user.amount_paid_to_date)),
                        total_pledged: this.props.route.params.user.total_pledged
                      })
                    }
                  ).then((response) => response.json()).then((json) => {
                    this.props.route.params.user.outstanding_balance = 0;
                    this.props.route.params.user.pledge_amount = parseInt(parseInt(this.props.route.params.user.outstanding_balance) + parseInt(this.props.route.params.user.amount_paid_to_date));
                    Linking.openURL('http://weblink.donorperfect.com/birdiesforbooks-2022');
                  }).catch((error) => {
                    Alert.alert(error.Message);
                  });
                }
              }
            ]
          );
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
            <Text style={[styles.textStyle, styles.headerText]}>
              Hello, {this.props.route.params.user.name}
            </Text>
            <Text style={styles.textStyle}>
              How many {this.props.route.params.user.pledge_score}s do you want to record?
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Amount"
              value={this.state.scores}
              onChangeText={(val) => updateInputVal(val.replace(/\D/g, ''), 'scores')}
            />
            <Button
              color="white"
              title="Submit"
              onPress={() => updateScores()}
            />
            <Text style={styles.impactText}>
              Each time you track a Birdie, Par or Bogey, you’re “teeing kids up” for a lifetime of success through books and early literacy guidance!
            </Text>
            <Button
              color="white"
              title="View My Profile"
              onPress={() => goToProfile()}
            />
            <Text style={styles.buttonStyleThree}>
            </Text>
            <Button
              color="white"
              title="View Leaderboard"
              onPress={() => goToLeaderboard()}
            />
          </View>
          <Image
            style={styles.capTechBanner}
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
  topText: {
    color: 'rgb(5,71,88)',
    fontWeight: 'bold',
    width: '70%',
    marginLeft: '15%',
    textAlign: 'center'
  },
  impactText: {
    width: '78%',
    marginLeft: '11%',
    color: '#054758',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '3%',
    marginBottom: '3%',
    fontSize: 18
  },
  buttonStyle: {
    marginTop: '30%',
    marginBottom: '0%',
  },
  buttonStyleTwo: {
    marginTop: '1%',
    marginBottom: '0%',
  },
  buttonStyleTwo: {
    marginBottom: '20%',
    marginTop: '0%'
  },
  textStyle: {
    fontSize: 18,
    marginBottom: 15,
    color: 'white',
    textAlign: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10%',
    marginTop: '55%'
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
  inputStyle: {
    borderRadius: 10,
    marginBottom: '5%',
    paddingBottom: 15,
    paddingTop: 15,
    alignSelf: "center",
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: '3%',
    width: '90%',
    paddingLeft: '30%',
    paddingRight: '30%'
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