import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, FlatList, Text, TouchableOpacity, TextInput, Alert, RefreshControl } from 'react-native';
import { Chip, Avatar, Surface, Card, Title, Paragraph, List, Subheading } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import { doc, getDocs, collection, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../database/firebaseDB';

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'


const Finance = () => {

  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState(null);
  const textInputRef = useRef(null);

  const handleSearchQuery = (text) => {
    setQuery(text);
  };
  const handleSearchAmount = (text) => {
    setAmount(text);
    // console.log(amount,"handle ")
  };
  const handle1500Chip = () => {
    setAmount('1500')
    // handleSearchAmount(5000)
    textInputRef.current.setNativeProps({ text: '1500' });
  }
  const handle3000Chip = () => {
    setAmount('3000')
    // handleSearchAmount(5000)
    textInputRef.current.setNativeProps({ text: '3000' });
  }
  const handle5000Chip = () => {
    setAmount('5000')
    // handleSearchAmount(5000)
    textInputRef.current.setNativeProps({ text: '5000' });
  }

  const [options, setOptions] = useState(null)
  const getMembersOptions = async () => {
    const querySnapshot = await getDocs(collection(db, "gym1", "members", "Details"));
    const memberNames = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());  
      const memberName = doc.id;
      memberNames.push(memberName);
    });
    // console.log(memberNames)
    setOptions(memberNames)
  }

  useEffect(() => {
    getTransactionLogs()
    getMembersOptions()
    return () => {

    }
  }, [])

  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState(null)

  const durationOptions = ["1 month", "2 months", "3 months", "6 months", "1 year"]

  const submitHandler = async () => {
    if (!amount || !selectedDuration || !selectedOption) {
      Alert.alert('Fill all the fields')
    }
    else {
      try {
        await setDoc(doc(db, "gym1", "finance", "transactionLogs", Date()), {
          date:  Date(),
          member: selectedOption,
          duration: selectedDuration,
          amount: amount,
        },)
        Alert.alert('Transaction Recorded')
      } catch (error) {
        Alert.alert('Some error occured. Try again')
        console.log(error)
      }
    }
  }

  const [transactions, setTransactions] = useState([])
  const getTransactionLogs = async () => {
    const querySnapshot = await getDocs(collection(db, "gym1", "finance", "transactionLogs"));
    const memberNames = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());  
      const memberName = doc.data();
      memberNames.push(memberName);
    });
    // console.log(memberNames)
    setTransactions(memberNames)
    // console.log(transactions)
  }

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    console.log("onRefresh")
    setRefreshing(true);
    await getTransactionLogs();
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }>

        <Surface style={styles.container}>


          <Card.Title
            title="Register Funds"
            titleStyle={{
              fontSize: 23,
              color: '#FF1493',
              textAlign: 'center',
              paddingTop: 8,
              // textDecorationLine:'underline'
            }}
          />

          <Text style={{
            color: '#FF1493',
            fontSize: 18,
            margin: 10,
          }}>
            Member Name</Text>

          <SelectDropdown
            data={options}
            buttonStyle={styles.dropDownButton}
            onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index)
              setSelectedOption(selectedItem);
              console.log(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
            defaultButtonText='Select a member'
            buttonTextStyle={styles.dropDownText}
          />



          <Text style={{
            color: '#FF1493',
            fontSize: 18,
            margin: 10,
          }}>
            Duration</Text>
          <SelectDropdown
            data={durationOptions}
            buttonStyle={styles.dropDownButton}
            onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index)
              setSelectedDuration(selectedItem)
              // console.log(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
            defaultButtonText='Select duration'
            buttonTextStyle={styles.dropDownText}
          />


          <Text style={{
            color: '#FF1493',
            fontSize: 18,
            margin: 10,
          }}>
            Amount</Text>
          <View style={styles.inputView}>
            <TextInput
              ref={textInputRef}
              style={styles.TextInput}
              placeholder=""
              onChangeText={handleSearchAmount}
              value={amount}
              keyboardType='numeric'
              
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.chip}>
              <Chip
                icon="information"
                mode="flat"
                onPress={handle1500Chip}
              >
                Rs 1500
              </Chip>
            </View>

            <View style={styles.chip}>
              <Chip
                icon="information"
                mode="flat"
                onPress={handle3000Chip}
              >
                Rs 3000
              </Chip>
            </View>

            <View style={styles.chip}>
              <Chip
                icon="information"
                mode="flat"
                onPress={handle5000Chip}>
                Rs 5000
              </Chip>
            </View>

          </View>

          <TouchableOpacity style={styles.loginBtn}
            onPress={submitHandler}
          >
            <Text style={styles.loginText}>SUBMIT</Text>
          </TouchableOpacity>

        </Surface>


        <List.Accordion
          titleStyle={styles.transLog}
          title="Transaction Logs"
          left={props => <List.Icon {...props}
            icon="information"
            color='#FF1493'
          />}>

          {transactions.map((item, index) => (
            <>
              <Surface style={{
                padding: 10,
                elevation: 4,
                margin: 10,
                backgroundColor: "#fff",
                borderRadius:10,
              }}>
                <Text style={styles.logText}>{item.member}</Text>
                <Text style={{fontSize:16,}}>Rs. {item.amount}</Text>
                <Text style={{fontSize:16,}}>Duration : {item.duration}</Text>
                <Text style={{fontSize:16,}}>{item.date}</Text>
              </Surface>
            </>
          ))}


        </List.Accordion>



        <List.Section
        // title="Accordions"
        >
          <List.Accordion
            title="Summary "
            titleStyle={styles.transLog}
            left={props => <List.Icon {...props}
              icon="information"
              color='#FF1493'
            />}>
            <List.Item
              title="Total Amount Registered "
              description="Rs. 75000 "
              left={props => <List.Icon {...props}
              // icon="folder" 
              />}
            />


          </List.Accordion>
        </List.Section>



      </ScrollView>
    </>
  );
};

export default Finance;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    // height: 370,
    // width: 80,
    // alignItems: 'center',
    // justifyContent: 'center',
    elevation: 4,
    margin: 10,
    backgroundColor: "#fff",

  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 4,
    // height: 370,
    margin: 10,
    paddingBottom: 10,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 10,
    // alignItems: "center",
    paddingLeft: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  chip: {
    width: 100,
    margin: 5,
    // alignItems:'stretch',
    // marginLeft: 20,
    // marginBottom: 10,
    // height:10,
  },

  dataResult: {},

  showMembers: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    zIndex: 0.1,
  },
  itemStyle: {
    paddingLeft: 10,
    fontSize: 17,
  },
  avatarStyle: {
    margin: 8,
  },
  transLog: {
    color: '#FF1493',
    fontSize:20,
  },
  dropDownButton: {
    width: '70%',
    backgroundColor: "#FFC0CB",
    borderRadius: 10,
  },
  dropDownText: {
    // color: '#FF1493',
  },
  logText:{
    fontSize:19,
    color:'#FF1493',
  }
})
