import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LineChart, BarChart, } from 'react-native-chart-kit';

import { TouchableOpacity } from 'react-native';
import GraphsData from '../../Components/GraphsData';

const Analytics = ({ navigation }) => {

  return (
    <ScrollView>

      

      {/*Example of Bezier LineChart*/}
      <TouchableOpacity >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            padding: 16,
            // marginTop: 16,
            color: '#FF1493'
          }}>
          Members
        </Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
              {
                data: [
                  40,
                  30,
                  37,
                  53,
                  63,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          // yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            propsForBackgroundLines: {
              strokeDasharray: '', // solid background lines with no dashes
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>

      {/*Example of Bezier LineChart*/}
      <TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            padding: 16,
            // marginTop: 16,
            color: '#FF1493'
          }}>
          Income (In thousands)
        </Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
              {
                data: [
                  70,
                  65,
                  80,
                  77,
                  96,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          yAxisLabel={'Rs.'}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            propsForBackgroundLines: {
              strokeDasharray: '', // solid background lines with no dashes
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>







      {/* Bar Chart
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          padding: 16,
          marginTop: 16,
          color: '#FF1493'
        }}>
        Members
      </Text>
      <BarChart
        data={{
          labels: ["January", "February", "March", "April",'May'],
          datasets: [
            {
              data: [20, 45, 28, 80,77]
            }
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        // yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        fromZero={true}

      /> */}




    </ScrollView>
  )
}

export default Analytics

const styles = StyleSheet.create({})