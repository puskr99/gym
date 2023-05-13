import { StyleSheet, Text, View, Image, Button, Alert, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Card, Title, Paragraph, TextInput } from 'react-native-paper'
import { auth } from '../../../database/firebaseDB'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LoginContext } from '../../../Context/LoginContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../database/firebaseDB';


const MembersProfile = ({ route, navigation }) => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allmembers, setAllMembers] = useState([])

  const { setUser } = useContext(LoginContext);
  const { userName, userAddress, phoneNumber,joinedOn, expiresOn, program , profilePic} = route.params;

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
  }, []);


  const getMembers = async () => {

    const querySnapshot = await getDocs(collection(db, "gym1", "members", "Details"));
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

  // const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => {
    AsyncStorage.removeItem("email")
    setUser(null);
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const myData = [
    {
      id: 1,
      title: 'Address',
      value: userAddress,
    },
    {
      id: 2,
      title: 'Contact',
      value: phoneNumber,
    },
    {
      id: 3,
      title: 'Membership Started:',
      value: joinedOn,
    },
    {
      id: 4,
      title: 'Membership Expires On:',
      value: expiresOn,
    },
    {
      id: 5,
      title: 'Program',
      value: program,
    },

  ];

  const Item = ({ title, value }) => (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{value}</Paragraph>
      </Card.Content>
    </Card>
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>
        <TouchableOpacity onPress={toggleFullScreen}>
          <Image source={{ uri: profilePic}}
            style={isFullScreen ? styles.fullScreenImage : styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.dpName}>{userName}</Text>
      </View>



      <FlatList
        data={myData}
        renderItem={({ item }) => <Item title={item.title} value={item.value} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 10, paddingTop: 10 }}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />


    </SafeAreaView>
  )
}

export default MembersProfile

const styles = StyleSheet.create({
  dpName: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 25,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})