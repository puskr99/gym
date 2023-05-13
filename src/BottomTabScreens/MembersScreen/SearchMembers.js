import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'
import { Avatar } from 'react-native-paper'

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../database/firebaseDB';


const SearchMembers = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [allmembers, setAllMembers] = useState([])
  const [memberswithexpiryDate, setMembersWithExpiryDate] = useState([])

  const fetchData = async () => {
    getMembers()
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getMembers();
    setRefreshing(false);
  };

  useEffect(() => {
    getMembers()
    setFilteredDataSource(allmembers)
    setMasterDataSource(allmembers)
  }, []);




  const getMembers = async () => {
    const querySnapshot = await getDocs(collection(db, "gym1","members","Details"));
    const memberNames = [];
    const updatedArray =[]
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());  
      const memberName = doc.data();
      const startDateParts = memberName.startDate.split("/");
      const endDateParts = memberName.endDate.split("/");
      const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
      const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);
      const differenceInMs = endDate - startDate;
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
      // console.log("days rem ", differenceInDays)
      // memberName.push({remainingDays : differenceInDays})
      memberNames.push(memberName);

    });
    setAllMembers(memberNames)
    setFilteredDataSource(memberNames)
    setMasterDataSource(memberNames)
    // console.log(filteredDataSource)
    // console.log(masterDataSource)
  }


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      console.log("inside search filter")
      console.log(masterDataSource)
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.memberName
          ? item.memberName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      console.log(filteredDataSource)
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.showMembers} >
        <Avatar.Image size={50} source={{ uri: item.image }} style={styles.avatarStyle} />
        <Text style={styles.itemStyle}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('MembersProfile', {
            userName: item.memberName,
            userAddress : item.address,
            phoneNumber : item.phoneNumber,
            joinedOn : item.startDate,
            expiresOn : item.endDate,
            program: item.program,
            profilePic : item.image,
          });
        }}
        >

          {item.memberName}
        </Text>
        {item.expires > 50 &&
          <Text style={{
            position: 'absolute',
            right: 40
          }}>
            <MaterialCommunityIcons name="alert" color='red' size={24} />
          </Text>
        }
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.searchView}>
          <FontAwesome5Icons name="search" size={22} style={{
            paddingLeft: 20
          }} />
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here..."
          />
        </View>

        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  textInputStyle: {
    height: 40,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#009688',
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
  },
  showMembers: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  itemStyle: {
    paddingLeft: 10,
    fontSize: 18,
    width:'100%',

  },
  avatarStyle: {
    margin: 8,
  },
});

export default SearchMembers