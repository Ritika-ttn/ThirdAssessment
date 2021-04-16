import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Login from './Login';
class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: true,
    };
  }
  render() {
    return this.state.loginScreen ? <Login /> : null;
  }
}
export default LogOut;
