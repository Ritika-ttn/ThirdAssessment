import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import AddNotes from './AddNotes';
import {LoginUser, Notes, NotesGet} from '../services/action';
class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      notes: {},
      isRefreshing: false,
      modalVisible: false,
    };
    this.props.NotesGet(this.props.id);
  }
  componentDidMount() {}

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
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
    this.props.NotesGet(this.props.id);
  };

  renderItem = ({item}) => {
    const count = 0;
    return (
      <View>
        <View style={styles.listItemContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNotes', {item})}>
            <View style={styles.data}>
              <Text style={styles.txt}>{item.title}</Text>
              <View style={styles.count}>
                <Text style={styles.counttxt}>{item.data.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  result = this.props.listData.reduce((accumulator, currentValue) => {
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
  }, []);
  render() {
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.firstHeaderTxt}>MY </Text>
            <Text style={styles.secondheaderTxt}>Notes</Text>
          </View>
          <View style={styles.listConatiner}>
            <FlatList
              data={this.result}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => {
                    this.refreshList(true);
                    setTimeout(() => {
                      this.refreshList(false);
                    }, 1000);
                  }}
                />
              }
            />
          </View>
          <ScrollView>
            <View style={styles.bottomContainer}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Icons name={'menu'} size={60} color={'blue'} />
                  <Text style={styles.icontxt}>Menu</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.plusIcon}>
                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                  <PlusIcon name={'pluscircle'} size={70} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
            <Modal visible={this.state.modalVisible}>
              <View style={styles.Modalcontainer}>
                <View style={styles.submitIcon}>
                  <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                    <CrossIcon name={'cross'} size={60} color={'red'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                  <TextInput
                    multiline={true}
                    style={styles.title}
                    placeholder="Enter Title"
                    onChangeText={(text) => this.setState({title: text})}
                  />
                </View>
                <View style={styles.noteContainer}>
                  <TextInput
                    multiline={true}
                    style={styles.note}
                    placeholder="Add a Note here"
                    onChangeText={(text) => this.setState({data: text})}
                  />
                </View>
                <View style={styles.submitIcon}>
                  <TouchableOpacity onPress={this.submitData}>
                    <PlusIcon name={'checkcircle'} size={60} color={'red'} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
          {console.log('norebsajda', this.props.listData)}
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
  secondheaderTxt: {
    fontSize: 40,
    color: 'darkblue',
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
  title: {
    fontSize: 20,
  },
  note: {
    fontSize: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  noteContainer: {
    height: 300,
    borderWidth: 2,
    margin: 12,
    padding: 15,
    borderRadius: 10,
  },
  Modalcontainer: {
    marginTop: 60,
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
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
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
const mapStateToProps = (state) => {
  return {
    listData: state.notes,
    id: state.list,
  };
};
const mapDispatchToProps = (dispatch) => ({
  Notes: (data, id) => dispatch(Notes(data, id)),
  NotesGet: (id) => dispatch(NotesGet(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
