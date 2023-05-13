import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet , RefreshControl, ScrollView} from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { Surface, Card } from 'react-native-paper';

import { db } from '../../database/firebaseDB';
import { collection, getCountFromServer } from 'firebase/firestore';

const AnimatedCircularProgress = ({ size, width, duration, progress, svgText, svgTextColor }) => {
  const [offset, setOffset] = useState(0);
  const circumference = size * Math.PI;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);


  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={(size - width) / 2}
          stroke="#ddd"
          strokeWidth={width}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={(size - width) / 2}
          stroke="#AED6F4"
          strokeWidth={width}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <SvgText
          x={size / 2}
          y={38}
          fontSize={21}
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
          // fill="#2E86C1"
          fill={svgTextColor || '#2E86C1'}
        >
          {svgText}
        </SvgText>
      </Svg>
    </View>
  );
};



export default function App() {
  const [progress, setProgress] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMemberCount()
    return () => {
    }
  }, [])


  const getMemberCount = async () => {
    // console.log("get member count")
    const coll = collection(db, "gym1","members","Details");
    const snapshot = await getCountFromServer(coll);
    // console.log('count: ', snapshot.data().count);
    setMemberCount(snapshot.data().count)
    // console.log(memberCount)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return prevProgress;
        } else {
          return prevProgress + 10;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getMemberCount();
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.container}   refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }>

     {/* Memebers */}
      <View style={styles.surface}>
        <View style={styles.twoIndView}>
          <AnimatedCircularProgress
            size={60}
            width={8}
            duration={memberCount}
            progress={100}
            svgText= {memberCount}
          />
          <Text style={styles.dashText}>Members</Text>
        </View>

        {/* Total Check Ins */}

        <View style={styles.twoIndView}>
          <AnimatedCircularProgress
            size={60}
            width={8}
            duration={100}
            progress={41}
            svgText="41"
          />
          <Text style={styles.dashText}>Check-Ins Today</Text>
        </View>
      </View>


      {/* Expiring this Week */}
      <View style={styles.twoIndView}>
        <AnimatedCircularProgress
          size={60}
          width={8}
          duration={100}
          progress={4}
          svgText="4"
          svgTextColor="red"
        />
        <Text style={styles.dashText}>Expiring This Week!</Text>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    padding: 10,
    width: '100%',
    // justifyContent:'space-around',
    justifyContent: 'space-evenly',
    elevation: 4,
    flexDirection: 'row',
  },
  dashText: {
    fontSize: 18,
    color: '#2E86C1',
    fontWeight: '500',
  },
  twoIndView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  }
});
