import { StyleSheet, Text, View ,Image,Button,Alert,FlatList,Dimensions, TouchableOpacity} from 'react-native'
import React,{ useState , useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Avatar, Card, Title, Paragraph, TextInput} from 'react-native-paper'
import { db ,auth } from '../../database/firebaseDB'
import { onAuthStateChanged , signOut } from 'firebase/auth';
import { LoginContext } from '../../Context/LoginContext'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({navigation}) => {

  const [isFullScreen, setIsFullScreen] = useState(false);

  const { setUser } = useContext(LoginContext);

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
      value:'Dhulikhel-2 , Kavre'
    },
    {
      id: 2,
      title: 'Contact',
      value:'9813937903'
    },
    {
      id: 3,
      title: 'Joined On:',
      value:'April-2 , 2022'
    },
    {
      id: 4,
      title: 'Membership Expires On:',
      value:'October-2 , 2022'
    },
    {
      id: 5,
      title: 'Program',
      value:'Gym/Boxing'
    },
    
  ];

  const Item = ({title,value}) => (
    <Card>
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{value}</Paragraph>
    </Card.Content>
  </Card>
  );


  return (
    <SafeAreaView style={{flex:1}}>

      <View>
        <TouchableOpacity  onPress={toggleFullScreen}>
        <Image source={{uri:'https://hips.hearstapps.com/hmg-prod/images/mh-bodybuild-royalty-free-image-1576882445.jpg?crop=1xw:0.8429543847241867xh;center,top&resize=1200:*'}}
       style={isFullScreen ? styles.fullScreenImage : styles.image}
       />
       </TouchableOpacity>
        <Text style={styles.dpName}>Puskar Adhikari</Text>
      </View>

      

      <FlatList
        data={myData}
        renderItem={({item}) => <Item title={item.title} value={item.value} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 10,paddingTop:10}}
      />

  <Button title='Logout' onPress={async ()=>{
      await signOut(auth)
      setUser(null)
      // Alert.alert('Logged Out Success')  
      // navigation.navigate('StackScreen')
      handleLogout()
      console.log("Logged Out")
    }}>
    </Button>


    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  dpName:{
    alignSelf:'center',
    margin:10,
    fontSize:25,
  },
  image: {
    height:200,
    width:200,
    borderRadius:100,
    alignSelf:'center',
    marginTop:30,
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})