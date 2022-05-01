// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Span, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { Rows } from 'react-native-table-component';
import { Row } from 'react-native-table-component';
import { Table } from 'react-native-table-component';

export default class Leaderboard extends Component {


  constructor() {
    super();
    this.state = {
      isLoading: true,
      tableHeaders: ['Name', 'Pledge Type', 'Total'],
      scores: [],
      hasRendered: false,
      currentIndex: 0,
      totalPledged: 0
    }
    fetch('https://birdies-for-books.herokuapp.com/users',
      {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json; charset=utf-8',
          'Connection': 'keep-alive',
        }
      }
    ).then((response) => response.json()).then((responseData) => {
      responseData.forEach(user => {
        const currentScore = [];
        if (!!user.name && !!user.pledge_score) {
          currentScore.push(user.name);
          currentScore.push(user.pledge_score.charAt(0).toUpperCase() + user.pledge_score.slice(1));
          currentScore.push(!!user.score_amount ? user.score_amount : 0);
          this.state.scores.push(currentScore);
        }
      });
      this.state.scores.sort((a, b) => b[2] - a[2]);
      fetch('https://birdies-for-books.herokuapp.com/users/total-pledged',
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
          }
        }
      ).then((response) => response.json()).then((responseData) => {
        this.setState({
          totalPledged: parseInt(responseData)
        });
        this.hasRendered = true;
        this.setState({
          isLoading: false,
        });
      })
    }).catch((error) => {
      console.log(error);
    });
  }


  render() {

    viewNextTen = () => {
      if (this.state.scores.length > (this.state.currentIndex + 5)) {
        this.setState({
          currentIndex: currentIndex + 5
        });
      }
    }

    viewLastTen = () => {
      if (this.state.currentIndex > 0) {
        this.setState({
          currentIndex: currentIndex - 5
        });
      }
    }

    const goToProfile = () => {
      this.props.navigation.navigate('Profile', { user: this.props.route.params.user })
    }

    const goToInputPage = () => {
      this.props.navigation.navigate('Input', { user: this.props.route.params.user })
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
        <ImageBackground source={require('bfb/assets/backgroundplain.jpg')} resizeMode="cover" style={styles.image}>
          <View style={styles.shadow}>
            <Text style={styles.headerText}>LEADERBOARD</Text>
            <Text style={styles.totalPledgedText}>
              Birdies for Books golfers have pledged ${this.state.totalPledged} so far this season!
            </Text>
            <Table style={styles.borderTop}>
              <Row data={this.state.tableHeaders} style={styles.HeadStyle} textStyle={styles.HeadText} />
              <Rows data={this.state.scores.length > 7 ? this.state.scores.slice(this.state.currentIndex, this.state.currentIndex + 5) : this.state.scores} textStyle={styles.TableText} style={styles.rowStyle} />
            </Table>
            <Button
              color="white"
              title="Previous Page"
              onPress={() => viewLastTen()}
            />
            <Button
              color="white"
              title="Next Page"
              onPress={() => viewNextTen()}
            />
            <Button
              color="#9cbe52"
              title="Record My Activity"
              onPress={() => goToInputPage()}
            />
            <Button
              color="#9cbe52"
              title="View My Profile"
              onPress={() => goToProfile()}
            />
            <Image
              style={styles.bottomBanner}
              source={require('bfb/assets/birdies-for-books-only-green-logo.png')}
            />
          </View>
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
  totalPledgedText: {
    width: '80%',
    marginLeft: '10%',
    fontSize: 18,
    textAlign: 'center',
    color: '#9cbe52',
    fontWeight: 'bold',
    marginBottom: '2%'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  bottomBanner: {
    resizeMode: 'contain',
    height: 80,
    width: '50%',
    marginLeft: '25%',
    marginBottom: '0%'
  },
  shadow: {
    backgroundColor: 'rgba(5,71,88,0.8)',
    height: '100%'
  },
  buttonStyle: {
    marginTop: '10%'
  },
  buttonStyleTwo: {
    marginTop: '1%'
  },
  borderTop: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  HeadStyle: {
    height: 50,
    width: '95%',
    marginLeft: '2.5%',
    alignContent: "center",
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '5%',
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    marginLeft: '10%',
    marginTop: '20%'
  },
  HeadText: {
    width: '95%',
    marginLeft: '2.5%',
    margin: 10,
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
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
    backgroundColor: 'black'
  },
  TableText: {
    width: '95%',
    marginLeft: '2.5%',
    margin: 10,
    color: 'white',
    textAlign: 'center'
  },
  rowStyle: {
    width: '95%',
    marginLeft: '2.5%'
  }
});