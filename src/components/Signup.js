import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

import {SignupUser} from '../services/action';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SignupScreen: true,
      drawer: false,
      user: '',
      pass: '',
      confirmpass: '',
      email: '',
      password: true,
      socialId: null,
    };
  }

  checkFeild = () => {
    if (!/^[a-zA-Z]{4,18}$/.test(this.state.user)) {
      Alert.alert(
        'UserName',
        'It should contain only alphabets and have atleast 4 digits',
      );
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        this.state.pass,
      )
    ) {
      Alert.alert(
        'Password',
        'It should contain only 6 Characters, Uppercase , lowercase , special character and number',
      );
    }
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(this.state.email)) {
      Alert.alert('Email', 'It should be valid email');
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        this.state.confirmpass,
      )
    ) {
      Alert.alert(
        'Password',
        'It should contain only 6 Characters, Uppercase , lowercase , special character and number',
      );
    }
    if (this.state.pass !== this.state.confirmpass) {
      Alert.alert('Password', 'password should match');
    }

    const user = {
      username: this.state.email,
      password: this.state.pass,
      name: this.state.user,
      mobile: this.state.socialId,
      socialId: this.state.socialId,
    };
    this.props.SignupUser(user);
    if (
      this.state.user !== '' &&
      this.state.pass !== '' &&
      this.state.confirmpass !== '' &&
      this.state.email !== ''
    ) {
      this.props.navigation.navigate('Login');
    }
  };
  loginScreen = () => {
    this.setState({
      SignupScreen: false,
    });
  };
  render() {
    return (
      <>
        <SafeAreaView />

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.txt}>Sign Up</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.signuptxt}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/camera.png')}
            />
          </View>
          <View style={styles.txtInputContainer}>
            <View style={styles.userContainer}>
              <TextInput
                style={styles.txtInput}
                placeholder="Email address"
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>
            <View style={styles.userContainer}>
              <TextInput
                style={styles.txtInput}
                placeholder="Username"
                onChangeText={(text) => this.setState({user: text})}
              />
            </View>
            <View style={styles.passContainer}>
              <TextInput
                style={styles.txtInput}
                placeholder="Password"
                onChangeText={(text) => this.setState({pass: text})}
                secureTextEntry={this.state.password}
              />
              <TouchableOpacity
                onPress={() => this.setState({password: false})}>
                <Icons name={'eyeo'} size={30} color={'grey'} />
              </TouchableOpacity>
            </View>
            <View style={styles.passContainer}>
              <TextInput
                style={styles.txtInput}
                placeholder=" Repeat Password"
                onChangeText={(text) => this.setState({confirmpass: text})}
                secureTextEntry={this.state.password}
              />
              <TouchableOpacity
                onPress={() => this.setState({password: false})}>
                <Icons name={'eyeo'} size={30} color={'grey'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity style={styles.touch} onPress={this.checkFeild}>
              <Icons name={'check'} size={20} color={'blue'} />
              <Text style={styles.loginButtontxt}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomtxt}>Terms of servises</Text>
          </View>
        </View>

        {console.log(this.props.listData)}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 30,
    fontWeight: '900',
  },
  signuptxt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'grey',
  },
  img: {
    width: 100,
    height: 100,
  },
  imgContainer: {
    alignItems: 'center',
  },
  txtInputContainer: {
    alignItems: 'center',
  },
  txtInput: {
    textAlign: 'left',
    marginTop: 30,
    fontSize: 20,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: 250,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  userContainer: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: 250,
    paddingBottom: 10,
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 90,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 20,
    width: 200,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtontxt: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 17,
    marginLeft: 10,
  },
  touch: {
    flexDirection: 'row',
  },
  bottomContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomtxt: {
    fontSize: 15,
    color: 'grey',
    margin: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    listData: state.list,
  };
};
const mapDispatchToProps = (dispatch) => ({
  SignupUser: (user) => dispatch(SignupUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
