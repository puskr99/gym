import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SearchMembers from './SearchMembers'
import Profile from './MembersProfile'
import MembersProfile from './MembersProfile'

const Stack = createNativeStackNavigator()

const MembersStack = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="SearchMembers" component={SearchMembers} options={{ headerShown: false }} />
                <Stack.Screen name="MembersProfile" component={MembersProfile} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MembersStack

const styles = StyleSheet.create({})