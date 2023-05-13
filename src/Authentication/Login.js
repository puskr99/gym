import { StatusBar } from "expo-status-bar";
import React, { useState, useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { db ,auth } from '../../database/firebaseDB'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { LoginContext } from "../../Context/LoginContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setUser } = useContext(LoginContext);
  const handleLogin = () => setUser(auth.currentUser.uid);

  const submitHandler = async () => {
    if (!email || !password) {
      Alert.alert('Fill all the spaces!')
    }
    else {
      try {
        
        const loginDone = new Promise.allSettled(
          await signInWithEmailAndPassword(auth, email, password),
          await AsyncStorage.setItem("email",email)
        )
        // Alert.alert('Logged In Successfully')
        // navigation.navigate('TabContainer');
        handleLogin()
      }
       catch (e) 
      {
        Alert.alert('Invalid Credentials!')
      }
    }
  }

  return (

    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/gymsaathi-logo1.png")} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Your Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} 
        onPress={submitHandler}>
        <Text style={styles.loginText}
          onPress={submitHandler}
        >
          LOGIN</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Text style={{ fontSize: 15, textAlign: 'center', }}> Dont't have an account? </Text>
        <Text onPress={() => {
          navigation.navigate('Register')
        }}
          style={{ color: 'blue', fontSize: 15, textAlign: 'center', textDecorationLine: 'underline' }} >Register Here...</Text>
      </View>
    </View>


  );
}
export default TestLogin


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 170,
    height: 170,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    // alignItems: "center",
    paddingLeft: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  forgot_button: {
    marginBottom: 25,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
  },
});