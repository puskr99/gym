import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {NavigationContainer} from '@react-navigation/native';
import { Appbar , FAB } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Analytics from './HomeScreens/Analytics';
import Finance from './HomeScreens/Finance';
import Test from './Stats';
import AddMembersPage from '../AddMembers/AddMembersPage';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const HomeMain = () => {
  return (
    <>

     <Appbar.Header>
        <Appbar.Content title="Dashboard" 
        color='#FF1493'
        titleStyle={{fontSize:20}}
         />
        {/* <Appbar.Action icon="bell" onPress={() => { }} /> */}
      </Appbar.Header>

    <NavigationContainer independent={true}>

    <Tab.Navigator>
      <Tab.Screen name="Stats" component={Test} />
      <Tab.Screen name="Finance" component={Finance} />
      <Tab.Screen name="Analytics" component={Analytics} />

    </Tab.Navigator>
    
      </NavigationContainer>

    </>
  )
}

export default HomeMain

const styles = StyleSheet.create({})