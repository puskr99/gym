import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { FAB, Portal, Provider, Appbar } from 'react-native-paper';
import { RadioButton, Modal } from 'react-native-paper';
// import { Modal } from 'react-native';
import { collection, doc, setDoc } from "firebase/firestore";
import { db, app } from './database/firebaseDB';


import HomeMain from './src/BottomTabScreens/HomeMain'
import Members from './src/BottomTabScreens/Members'
import Profile from './src/BottomTabScreens/Profile'

import TestLogin from './src/Authentication/Login';
import TestRegister from './src/Authentication/Register';

import AddMembersPage from './src/AddMembers/AddMembersPage';


import { Chip } from 'react-native-paper';



const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
// const Drawer = createDrawerNavigator();


import { auth } from './database/firebaseDB';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { LoginContext } from './Context/LoginContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Test from './Test';

export default function App({ navigation }) {

  const [user, setUser] = useState(null)

  const checkAuth = async () => {
    try {
      onAuthStateChanged(auth, isUser => {
        if (isUser) {
          // Alert.alert('User Found',user.uid)
          setUser(isUser.uid)
          console.log(isUser.uid)
          // console.log(user)
        }
      })
    } catch (err) {
      setUser(null)
    }

  }

  useEffect(() => {
    AsyncStorage.getItem('email').then(res => {
      setUser(res)
    })

  }, [user])

  useEffect(() => {
    console.log("useEffect")
    checkAuth()
    // if(auth.currentUser)
    // console.log(auth.currentUser.uid)
    return () => {
    }
  }, [])

  const BottomTabs = () => {
    return (
      <NavigationContainer independent={true}>

        <Tab.Navigator
          initialRouteName='Home'
          labeled={true}
          activeColor='rgb(25,100,200)'
          shifting={true}
          screenOptions={{
            // tabBarColor:'rgb(25,100,200)'
          }}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5Icons name="home" color={color} size={25} />
              ),
            }}
            component={HomeMain}
          />

          <Tab.Screen
            name="Members"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5Icons name="book-open" color={color} size={25} />
              ),
            }}
            component={Members} />

          <Tab.Screen
            name="Profile"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5Icons name="user" color={color} size={24} />
              ),
            }}
            component={Profile} />

        </Tab.Navigator>

      </NavigationContainer>
    )
  }

  const RegLogin = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>

          <Stack.Screen name="Login" component={TestLogin} />
          <Stack.Screen name="Register" component={TestRegister} />
          <Stack.Screen name="Test" component={Test} />

          {/* Refrence to bottom tab screens */}

        </Stack.Navigator>
      </NavigationContainer>
    )
  }

    return (
      <LoginContext.Provider value={{ user, setUser }}>
        {user
          ?
          <>
            <Provider>
              <BottomTabs />
              <Portal>
                <AddMembersPage />
              </Portal>
            </Provider>
          </>

          :
          <RegLogin />
        }

      </LoginContext.Provider>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

  });