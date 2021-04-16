import * as React from 'react';
import {Button, View, Text, Switch, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';
import MenuScreen from './MenuScreen';
import LogOut from './LogOut';
import Login from './Login';
const Drawer = createDrawerNavigator();

class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      istoggle: false,
    };
  }
  onToggle = (value) => {
    this.setState({
      istoggle: value,
    });
    this.props.navigation.navigate('MenuScreen');
  };

  CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View style={styles.toggle}>
          <Switch
            value={this.state.istoggle}
            trackColor={{false: 'grey', true: 'black'}}
            thumbColor={this.state.istoggle ? 'darkcyan' : 'black'}
            onValueChange={(text) => this.onToggle(text)}
          />
        </View>
      </DrawerContentScrollView>
    );
  };
  render() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <this.CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Menu" component={MenuScreen} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  }
}
export default DrawerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggle: {
    alignSelf: 'center',
  },
});
