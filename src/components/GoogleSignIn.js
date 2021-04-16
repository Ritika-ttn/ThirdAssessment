import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
class GoogleSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {login: false, userDetails: []};
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
  render() {
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <Text style={styles.txt}>Sign In With Google</Text>
          {this.state.login ? (
            <View style={styles.first}>
              <Image
                style={styles.image}
                source={{uri: this.state.userDetails.photo}}
              />

              <Text style={styles.txt}>
                Name : {this.state.userDetails.name}
              </Text>
              <Text style={styles.txt}>
                Email : {this.state.userDetails.email}{' '}
              </Text>

              <Button onPress={this.signOut} title="LogOut" color="red" />
            </View>
          ) : (
            <>
              <Text style={styles.txt}>You are currently logged out</Text>
              <GoogleSigninButton
                style={styles.button}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
              />
            </>
          )}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 15,
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  first: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'blue',
    fontWeight: '500',
  },
  button: {
    width: 200,
    height: 50,
  },
});
export default GoogleSignIn;
