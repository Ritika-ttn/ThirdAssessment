import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import {Delete, NotesGet} from '../services/action';
class AddNotes extends Component {
  constructor(props) {
    super(props);
  }
  deleteData = (noteid) => {
    this.props.Delete(this.props.id, noteid);
    // this.props.NotesGet(this.props.id);
  };
  render() {
    const {item} = this.props.route.params;
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>{item.title}</Text>
          </View>
          <View style={styles.dataConatiner}>
            <Text style={styles.txt}>{item.data}</Text>
            <TouchableOpacity onPress={() => this.deleteData(item.id)}>
              <Icons name={'cross'} size={40} />
            </TouchableOpacity>
          </View>

          {console.log('data', item)}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginLeft: 30,
  },
  headerTxt: {
    fontSize: 40,
    color: 'red',
    fontWeight: '800',
  },
  txt: {
    color: 'blue',
    fontSize: 20,
    marginLeft: 30,
  },
  dataConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    id: state.list,
  };
};
const mapDispatchToProps = (dispatch) => ({
  NotesGet: (id) => dispatch(NotesGet(id)),
  Delete: (id, noteid) => dispatch(Delete(id, noteid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNotes);
