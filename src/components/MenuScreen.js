import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {Notes, NotesGet} from '../services/action';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      notes: {},
      listcontant: [],
      isRefreshing: false,
      modalVisible: false,
    };
    this.props.NotesGet(this.props.id);
  }
  componentDidUpdate(prevProp) {
    if (this.props.listData !== prevProp.listData) {
      this.render();
    }
  }
  componentDidMount() {
    this.props.NotesGet(this.props.id);
    this.result();
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  result = () =>
    this.props.listData.reduce((accumulator, currentValue) => {
      var newtitle = currentValue.title;
      var data = currentValue.data;
      var flag = true;
      accumulator.map((item, index) => {
        if (newtitle === item.title) {
          flag = false;
          accumulator[index].data.push(data);
        }
      });
      if (flag) {
        accumulator.push({title: newtitle, data: [data]});
      }
      return accumulator;
    }, this.state.listcontant);
  submitData = () => {
    const data = {
      title: this.state.title,
      data: this.state.data,
    };
    this.props.Notes(data, this.props.id);
    this.setState({modalVisible: false});
    this.props.NotesGet(this.props.id);
  };
  refreshList = (refresh) => {
    this.setState({
      isRefreshing: refresh,
    });
  };

  renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.listItemContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNotes', {item})}>
            <View style={styles.data}>
              <Text style={this.props.dark ? styles.DarkdataTxt : styles.txt}>
                {item.title}
              </Text>
              <View style={styles.count}>
                <Text style={styles.counttxt}>{item.data.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <SafeAreaView />
        <View style={this.props.dark ? styles.DarkConatiner : styles.container}>
          <View style={styles.header}>
            <Text
              style={
                this.props.dark ? styles.darkFirstHeader : styles.firstHeaderTxt
              }>
              MY{' '}
            </Text>
            <Text
              style={
                this.props.dark
                  ? styles.darksecondheaderTxt
                  : styles.secondheaderTxt
              }>
              Notes
            </Text>
          </View>
          <View style={styles.listConatiner}>
            <FlatList
              data={
                this.state.listcontant !== null
                  ? this.state.listcontant
                  : this.props.listData
              }
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => {
                    this.refreshList(true);
                    this.props.NotesGet(this.props.id);
                    setTimeout(() => {
                      this.refreshList(false);
                    }, 1000);
                  }}
                />
              }
            />
          </View>

          <View style={styles.bottomContainer}>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Icons
                  name={'menu'}
                  size={60}
                  color={this.props.dark ? 'white' : 'blue'}
                />
                <Text style={styles.icontxt}>Menu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.plusIcon}>
              <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <PlusIcon
                  name={'pluscircle'}
                  size={70}
                  color={this.props.dark ? 'white' : 'red'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Modal visible={this.state.modalVisible}>
            <View
              style={
                this.props.dark
                  ? styles.DarkModalContainer
                  : styles.Modalcontainer
              }>
              <View style={styles.submitIcon}>
                <Text style={this.props.dark ? styles.darkTitle : styles.title}>
                  ADD NOTES HERE
                </Text>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <CrossIcon
                    name={'cross'}
                    size={60}
                    color={this.props.dark ? 'white' : 'red'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={
                  this.props.dark
                    ? styles.darkTitleContainer
                    : styles.titleContainer
                }>
                <TextInput
                  multiline={true}
                  style={this.props.dark ? styles.darkTitle : styles.title}
                  placeholder="Enter Title"
                  onChangeText={(text) => this.setState({title: text})}
                />
              </View>
              <View
                style={
                  this.props.dark
                    ? styles.darkNoteContainer
                    : styles.noteContainer
                }>
                <TextInput
                  multiline={true}
                  style={this.props.dark ? styles.darkNote : styles.note}
                  placeholder="Add a Note here"
                  onChangeText={(text) => this.setState({data: text})}
                />
              </View>
              <View style={styles.submitIcon}>
                <TouchableOpacity onPress={() => this.submitData()}>
                  <PlusIcon
                    name={'checkcircle'}
                    size={60}
                    color={this.props.dark ? 'white' : 'red'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {console.log('norebsajda', this.props.listData)}
          {console.log('DRAK ', this.props.dark)}
          {console.log('IDDDD', this.props.id)}
          {console.log('list', this.state.listcontant)}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listData: state.notes,
    id: state.list,
    dark: state.darkScreen,
  };
};
const mapDispatchToProps = (dispatch) => ({
  NotesGet: (id) => dispatch(NotesGet(id)),
  Notes: (data, id) => dispatch(Notes(data, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  DarkConatiner: {
    flex: 1,
    backgroundColor: 'black',
  },
  icontxt: {
    fontSize: 15,
    marginLeft: 10,
    color: 'red',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    marginLeft: 30,
  },
  firstHeaderTxt: {
    fontSize: 40,
    color: 'red',
    fontWeight: '800',
  },
  darkFirstHeader: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
  },
  secondheaderTxt: {
    fontSize: 40,
    color: 'darkblue',
    fontWeight: '800',
  },
  darksecondheaderTxt: {
    fontSize: 40,
    color: 'blue',
    fontWeight: '800',
  },
  plusIcon: {
    margin: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 50,
  },
  titleContainer: {
    margin: 12,
    borderWidth: 2,
    padding: 10,
    height: 60,
    borderRadius: 10,
  },
  darkTitleContainer: {
    margin: 12,
    borderWidth: 2,
    padding: 10,
    height: 60,
    borderRadius: 10,
    borderColor: 'white',
  },
  title: {
    fontSize: 20,
  },
  note: {
    fontSize: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  darkTitle: {
    fontSize: 20,
    color: 'white',
  },
  darkNote: {
    fontSize: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'white',
  },
  noteContainer: {
    height: 300,
    borderWidth: 2,
    margin: 12,
    padding: 15,
    borderRadius: 10,
  },
  darkNoteContainer: {
    height: 300,
    borderWidth: 2,
    margin: 12,
    padding: 15,
    borderRadius: 10,
    borderColor: 'white',
  },
  Modalcontainer: {
    marginTop: 60,
  },

  DarkModalContainer: {
    marginTop: 60,
    flex: 1,
    backgroundColor: 'black',
  },
  listConatiner: {
    //backgroundColor: 'red',
    height: 550,
  },
  listItemContainer: {
    marginTop: 50,
  },
  txt: {
    fontSize: 30,
    color: 'darkblue',
    fontWeight: '700',
    marginLeft: 30,
  },
  submitIcon: {
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
  },
  DarkdataTxt: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
    marginLeft: 30,
  },
  count: {
    borderColor: '#f5afc0',
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f5afc0',
  },
  counttxt: {
    fontSize: 30,
    color: 'darkblue',
    fontWeight: '700',
  },
});
