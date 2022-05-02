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
      tableHeaders: ['NAME', 'PLEDGE TYPE', 'TOTAL'],
      scores: [],
      initialScores: [],
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
      this.state.initialScores = this.state.scores;
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
          currentIndex: this.state.currentIndex + 5
        });
      }
    }

    viewLastTen = () => {
      if (this.state.currentIndex > 0) {
        this.setState({
          currentIndex: this.state.currentIndex - 5
        });
      }
    }

    filter = (type) => {
      switch (type) {
        case 1:
          this.setState({
            scores: this.state.initialScores
          });
          return;
        case 2:
          this.setState({
            scores: this.state.initialScores.filter((item) => item[1] == 'Birdie')
          });
          console.log(this.state.scores);
          return;
        case 3:
          this.setState({
            scores: this.state.initialScores.filter((item) => item[1] == "Par")
          });
          console.log(this.state.scores);
          console.log(this.state.scores);
          return;
        case 4:
          this.setState({
            scores: this.state.initialScores.filter((item) => item[1] == 'Bogey')
          });
          console.log(this.state.scores);
          return;
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
            <Image
              style={styles.bottomBanner}
              source={require('bfb/assets/birdies-for-books-only-green-logo.png')}
            />
            <Text style={styles.headerText}>LEADERBOARD</Text>
            <Text style={styles.totalPledgedText}>
              Birdies for Books golfers have pledged <Text style={{ 'color': 'white' }}>${this.state.totalPledged}</Text> so far this season!
            </Text>
            <Table style={styles.borderTop}>
              <Row data={this.state.tableHeaders} style={styles.HeadStyle} textStyle={styles.HeadText} />
              <Rows data={this.state.scores.length > 5 ? this.state.scores.slice(this.state.currentIndex, (this.state.scores.length > this.state.currentIndex + 5 ? this.state.currentIndex + 5 : this.state.scores[this.state.scores.length])) : this.state.scores} textStyle={styles.TableText} style={styles.rowStyle} />
            </Table>
            <Text style={styles.textButtonStyle}>
              <Text onPress={() => viewLastTen()}>Previous Page</Text>   |   <Text onPress={() => viewNextTen()}>Next Page</Text>
            </Text>
            <Text style={styles.textButtonStyle}>
              View:  <Text onPress={() => filter(1)}>All</Text>  |  <Text onPress={() => filter(2)}>Birdies</Text>  |  <Text onPress={() => filter(3)}>Pars</Text>  |  <Text onPress={() => filter(4)}>Bogies</Text>
            </Text>
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
    justifyContent: "center"
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
  textButtonStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
  bottomBanner: {
    resizeMode: 'contain',
    height: 80,
    width: '50%',
    marginLeft: '25%',
    marginTop: '10%'
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
    marginTop: '5%'
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