// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import('@react-navigation/native').Route;


export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            isLoading: false,
            password: ''
        }
    }

    render() {



        const updateInputVal = (val, prop) => {
            const state = this.state;
            state[prop] = val;
            this.setState(state);
        }

        const goToProfile = () => {
            this.props.navigation.navigate('Profile', {
                user: this.props.route.params.user
            });
        }

        const updateEmailAddress = () => {
            if (this.state.email == '') {
                Alert.alert('Please enter an email address')
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
                            name: this.props.route.params.displayName,
                            email: this.state.email.toLowerCase(),
                            phone_number: this.props.route.params.phoneNumber,
                            password: this.props.route.params.password,
                            pledge_score: this.props.route.params.pledgeType,
                            pledge_amount: this.props.route.params.pledgeAmount,
                            score_amount: this.props.route.params.score_amount,
                            outstanding_balance: this.props.route.params.outstanding_balance,
                            amount_paid_to_date: this.props.route.params.amount_paid_to_date,
                            total_pledged: this.props.route.params.user.total_pledged
                        })
                    }
                ).then((response) => response.json()).then((json) => {
                    this.props.route.params.user.email = this.state.email;
                    Alert.alert('Successfully updated email address!')
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

        const updatePassword = () => {
            if (this.state.password == '') {
                Alert.alert('Please enter a new password')
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
                            name: this.props.route.params.displayName,
                            email: this.props.route.params.email,
                            phone_number: this.props.route.params.phoneNumber,
                            password: this.state.password,
                            pledge_score: this.props.route.params.pledgeType,
                            pledge_amount: this.props.route.params.pledgeAmount,
                            score_amount: this.props.route.params.score_amount,
                            outstanding_balance: this.props.route.params.outstanding_balance,
                            amount_paid_to_date: this.props.route.params.amount_paid_to_date,
                            total_pledged: this.props.route.params.user.total_pledged
                        })
                    }
                ).then((response) => response.json()).then((json) => {
                    this.props.route.params.user.password = this.state.password;
                    Alert.alert('Successfully updated password!')
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <ImageBackground source={require('bfb/assets/Golf-green-bkgd-01.png')} resizeMode="cover" style={styles.image}>
                        <View style={styles.shadow}>
                            <Text style={styles.headerText}>
                                Edit My Profile
                            </Text>
                            <Text style={styles.buttonStyleTwo}></Text>
                            <Text style={styles.textStyle}>
                                Want to update your email address?
                            </Text>
                            <TextInput
                                placeholderTextColor="white"
                                style={styles.inputStyle}
                                placeholder="New Email Address"
                                value={this.state.email}
                                onChangeText={(val) => updateInputVal(val, 'email')}
                            />
                            <Button
                                color="white"
                                title="Update Email Address"
                                onPress={() => updateEmailAddress()}
                            />
                            <Text style={styles.buttonStyle}>
                            </Text>
                            <Text style={styles.textStyle}>
                                Want to update your password?
                            </Text>
                            <TextInput
                                placeholderTextColor="white"
                                style={styles.inputStyle}
                                placeholder="New Password"
                                value={this.state.password}
                                onChangeText={(val) => updateInputVal(val, 'password')}
                                secureTextEntry={true}
                            />
                            <Button
                                color="white"
                                title="Update Password"
                                onPress={() => updatePassword()}
                            />

                            <Text style={styles.buttonStyle}>
                            </Text>
                            <Button
                                color="white"
                                title="Return To Profile"
                                onPress={() => goToProfile()}
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
        marginTop: '3%'
    },
    buttonStyleTwo: {
        marginBottom: '1%'
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