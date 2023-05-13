import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native';
import SearchMembers from './MembersScreen/SearchMembers'
import { Avatar, Appbar } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MembersStack from './MembersScreen/MembersStack'

import { collection, query, getDocs, doc, getDoc, collectionGroup, where } from 'firebase/firestore';;
import { db } from '../../database/firebaseDB'

const Tab = createMaterialTopTabNavigator();

const Members = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [allmembers, setAllMembers] = useState([])

  useEffect( () => {
    getMembers()
    return () => {
    }
  }, [])

  const fetchData = async () => {
    getMembers()
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getMembers();
    setRefreshing(false);
  };

  const getMembers = async () => {

    const querySnapshot = await getDocs(collection(db, "gym1","members","Details"));
    const memberNames = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data()); 
      const memberName = doc.data();
      memberNames.push(memberName);
    });
    setAllMembers(memberNames)
    // console.log(allmembers)
  }

  const Expiring = () => {

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
    const ItemView = ({ item }) => {
      return (
        // Flat List Item
        <View style={styles.showMembers}>
          <Avatar.Image size={50} source={{ uri: item.image }} style={styles.avatarStyle} />
          <Text style={styles.itemStyle} onPress={() => { console.log('Item') }} >
            {/* Roshish Parajuli */}
            {/* {item.id} */}
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
    return (
      <FlatList
        data={allmembers}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

    )
  }
  return (
    <>
      {/* <Appbar.Header style={{backgroundColor:'white'}}>
        <Appbar.Content title="Members" 
        color='#FF1493'
         />
      </Appbar.Header> */}

      <NavigationContainer independent={true}>

        <Tab.Navigator>
          <Tab.Screen name="All Members" component={MembersStack} />
          <Tab.Screen name="Expiring !" component={Expiring} />
          <Tab.Screen name="Locker" component={Expiring} />
        </Tab.Navigator>

      </NavigationContainer>

    </>


  )
}

export default Members

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
    // color:'#FF1493'

  },
  avatarStyle: {
    margin: 8,
  },
});
