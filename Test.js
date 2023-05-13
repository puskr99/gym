import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper'

const Test = () => {
  return (
    <View>
      <Text>Test</Text>
      <FAB
              icon="plus"
              style={styles.fab}
              // onPress={() => setIsModalVisible(true)}
              
            />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        // margin: 20,
        right: 40,
        bottom: 90,
        // zIndex: 99,
        borderRadius: 30,
      },
})