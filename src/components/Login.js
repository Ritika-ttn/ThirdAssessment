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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icons from 'react-native-vector-icons/AntDesign';
import TwitterIcons from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import {LoginUser, LoginGoogle} from '../services/action';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loginScreen: true,
      // drawer: false,
      user: '',
      pass: '',
      password: true,
      login: false,
      userDetails: [],
      uriIcon: require('../assets/user.png'),
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '970774513004-2a75oh9hu8vohpmeu5ec5vdl19bbouhi.apps.googleusercontent.com',
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userDetails: userInfo.user, login: true});
      this.props.LoginGoogle(this.state.userDetails.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert('error');
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userDetails: null, login: false});
    } catch (error) {
      console.error(error);
    }
  };
  checkFeild = async () => {
    if (!/^[a-zA-Z0-9]$/.test(this.state.user)) {
      Alert.alert('UserName', 'It should contain only alphabets');
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

    const data = {
      username: this.state.user,
      password: this.state.pass,
    };

    const status = (message) => {
      if (message === true) {
        this.props.navigation.navigate('DrawerScreen');
      } else {
        Alert.alert('Error', 'Not a Valid User', [
          {
            text: 'Close',
            style: 'cancel',
          },
        ]);
      }
    };
    this.props.LoginUser(data, status);
  };

  render() {
    return (
      <>
        <SafeAreaView />
        {/* {this.state.loginScreen ? ( */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.txt}>Login</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.signuptxt}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={
                !this.state.userDetails.photo
                  ? this.state.uriIcon
                  : {uri: this.state.userDetails.photo}
              }
            />
          </View>
          <View style={styles.txtInputContainer}>
            <View style={styles.userContainer}>
              <TextInput
                style={styles.txtInput}
                value={this.state.userDetails.name}
                placeholder="Username or email address"
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
                <Icons name={'eyeo'} size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity style={styles.touch} onPress={this.checkFeild}>
              <Icons name={'check'} size={20} color={'blue'} />
              <Text style={styles.loginButtontxt}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomtxt}>Login With</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={this.signIn}>
                <Icons
                  style={styles.icons}
                  name={'googleplus'}
                  size={40}
                  color={'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icons
                  style={styles.icons}
                  name={'github'}
                  size={40}
                  color={'blue'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <TwitterIcons
                  style={styles.icons}
                  name={'twitter-with-circle'}
                  size={40}
                  color={'skyblue'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <TwitterIcons
                  style={styles.icons}
                  name={'facebook-with-circle'}
                  size={40}
                  color={'darkblue'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {console.log('Data', this.props.listData)}
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
    borderRadius: 100,
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
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  icons: {
    margin: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    listData: state.list,
  };
};
const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data, status) => dispatch(LoginUser(data, status)),
  LoginGoogle: (id) => dispatch(LoginGoogle(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
