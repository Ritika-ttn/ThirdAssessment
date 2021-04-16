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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import {LoginUser, Notes, NotesGet} from '../services/action';
class DarkMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      notes: {},
      modalVisible: false,
    };
    this.props.NotesGet(this.props.id);
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.id !== this.props.id) {
  //     this.props.NotesGet(this.props.id);
  //   }
  // }
  // renderCategoryList = () => {
  //   const categories = {};
  //   let lastNoteTitle;
  //   if (this.props.listData) {
  //     lastNoteTitle = this.props.listData[this.props.listData.length - 1];
  //   }
  //   this.props.listData &&
  //     this.props.listData.map((item) => {
  //       const title = item.title;
  //       if (categories.hasOwnProperty(item.title)) {
  //         categories[title] += 1;
  //       } else {
  //         categories[title] = 1;
  //       }
  //     });
  // };
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
    // this.props.navigation.navigate('AddNotes');
  };
  renderItem = ({item}) => {
    const count = 0;
    return (
      <View>
        <View style={styles.listItemContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNotes', {item})}>
            <Text style={styles.txt}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
              data={this.props.listData}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <ScrollView>
            <View style={styles.bottomContainer}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Icons name={'menu'} size={60} color={'white'} />
                  <Text style={styles.icontxt}>Menu</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.plusIcon}>
                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                  <PlusIcon name={'pluscircle'} size={70} color={'white'} />
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
    backgroundColor: 'black',
  },
  icontxt: {
    fontSize: 15,
    marginLeft: 10,
    color: 'white',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    marginLeft: 30,
  },
  firstHeaderTxt: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
  },
  secondheaderTxt: {
    fontSize: 40,
    color: 'white',
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
    color: 'white',
    fontWeight: '700',
    marginLeft: 30,
  },
  submitIcon: {
    alignSelf: 'center',
    marginTop: 50,
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
export default connect(mapStateToProps, mapDispatchToProps)(DarkMenuScreen);
