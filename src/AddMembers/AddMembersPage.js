import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Modal, Appbar, FAB } from 'react-native-paper'
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../database/firebaseDB';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";


const AddMembersPage = ({ }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
        setIsModalVisible(true);
    }

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const [isUploading, setIsUploading] = useState(false)

    const [memberName, setMemberName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);

    //To take start and expiry date Date
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [program, setProgram] = useState(null);
    const [image, setImage] = useState(null);

    const handleStartDatePicked = (date) => {
        let newStartDate = new Date(date).toLocaleDateString();
        setStartDate(newStartDate);
        setShowStartDatePicker(false);
    };

    const handleEndDatePicked = (date) => {
        let newEndDate = new Date(date).toLocaleDateString();
        setEndDate(newEndDate);
        setShowEndDatePicker(false);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const submitHandler = async () => {

        if (!memberName || !phoneNumber || !address && !startDate && !endDate && !program && !image) {
            Alert.alert('Fill all the fields!')
        }

        else {

            try {
                setIsUploading(true);
                const storage = getStorage();
                const storageRef = ref(storage, `profilePhoto/${memberName}`);
                const response = await fetch(image);
                const blob = await response.blob();
                await uploadBytes(storageRef, blob);
                let downLoadURL = await getDownloadURL(storageRef)
                // console.log(downLoadURL)
                // const colRef = collection(db, "gym1", "members",memberName);
                // await setDoc(doc(db, "gym1", "Members",memberName,"Details"),
                await setDoc(doc(db, "gym1","members","Details", memberName),
                    {   
                        memberName: memberName,
                        phoneNumber: phoneNumber,
                        address: address,
                        startDate: startDate,
                        endDate: endDate,
                        program: program,
                        image: downLoadURL,
                    },
                    {
                        // merge:true
                    })

                setIsUploading(false);
                Alert.alert("A new member added", memberName)
                // setMemberName(null)
                // setPhoneNumber(null)
                // setAddress(null)
                // setStartDate(null)
                // setEndDate(null)
                // setProgram(null)
                // setImage(null)
            }
            catch (error) {
                setIsUploading(false);
                Alert.alert('Error occured.Try again later')
                console.log(error)
               
            }



        }
    }

    return (
        <>

            <Modal visible={isModalVisible} onDismiss={hideModal } >

                <ScrollView style={styles.modalContainer}
                >
                    
                    <Appbar>
                        <Appbar.BackAction onPress={hideModal} />
                        <Appbar.Content title="Member Registration" />
                    </Appbar>

                    <View style={styles.nameField} >
                        <Text style={styles.textLabel}> Name</Text>
                        <TextInput
                            // label="Name"
                            value={memberName}
                            onChangeText={setMemberName}
                            style={styles.textInput}
                        // autoFocus={true}
                        />

                    </View>


                    <View style={styles.nameField}>
                        <Text style={styles.textLabel}> Phone Number</Text>
                        <TextInput
                            // label="Phone Number"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            keyboardType="phone-pad"
                            style={styles.textInput}
                        // autoFocus={true}
                        />
                    </View>

                    <View style={styles.nameField}>
                        <Text style={styles.textLabel}> Address</Text>
                        <TextInput
                            // label="Address"
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.nameField}>
                        <Text style={styles.textLabel}> Program</Text>
                        <TextInput
                            value={program}
                            onChangeText={(text) => setProgram(text)}
                            style={styles.textInput}
                        />
                    </View>

                    {/* start date */}
                    <View style={styles.nameField}>
                        <Text style={styles.textLabel}> Start Date</Text>
                        <FontAwesome5Icons name="image" size={30} onPress={() => setShowStartDatePicker(true)} style={styles.imageIcon} />
                        <DateTimePickerModal
                            isVisible={showStartDatePicker}
                            mode="date"
                            onConfirm={handleStartDatePicked}
                            onCancel={() => setShowStartDatePicker(false)}
                        />
                        {startDate &&
                            <TextInput
                                style={styles.textInput}
                                value={startDate}
                                editable={false}
                            />}
                    </View>


                    {/* Expiry Date */}
                    <View style={styles.nameField}>
                        <Text style={styles.textLabel}> Expiry Date</Text>
                        <FontAwesome5Icons name="image" size={30} onPress={() => setShowEndDatePicker(true)} style={styles.imageIcon} />
                        <DateTimePickerModal
                            isVisible={showEndDatePicker}
                            mode="date"
                            onConfirm={handleEndDatePicked}
                            onCancel={() => setShowEndDatePicker(false)}
                        />
                        {endDate &&
                            <TextInput
                                style={styles.textInput}
                                value={endDate}
                                editable={false}
                            />}
                    </View>


                    {/* Uplaod Photo  */}

                    <View style={styles.nameField}>
                        <Text style={styles.textLabel}> Upload Photo</Text>
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome5Icons name="image" size={30} onPress={pickImage} style={styles.imageIcon} />
                        </View>
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>


                    {/* Submit  */}
                    {!isUploading &&
                        <View style={styles.loginView}>
                            <TouchableOpacity style={styles.loginBtn}
                                onPress={submitHandler}
                            >
                                <Text style={styles.loginText}
                                >
                                    SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                       
                    }
                    { isUploading && <ActivityIndicator size="large" color="#0000ff" /> }


                </ScrollView>
            </Modal>
            {!isModalVisible &&
                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => setIsModalVisible(true)}
                />
            }

        </>
    )
}

export default AddMembersPage

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        // margin: 20,
        right: 40,
        bottom: 90,
        // zIndex: 99,
        borderRadius: 30,
    },
    modalContainer: {
        // flex:1,
        backgroundColor: 'white',
        height: '100%'
    },

    modalCloseButtonView: {
        marginBottom: 30,
    },
    nameField: {
        margin: 10,
        // paddingLeft:20,
    },
    textLabel: {
        fontSize: 18,
        color: '#FF1493'
    },
    imageIcon: {
        margin: 10,
    },
    textInput: {
        backgroundColor: "#FFC0CB",
        // borderRadius: 30,
        // width: "70%",
        height: 45,
        // marginBottom: 20,
        // alignItems: "center",
        paddingLeft: 20,
    },

    loginBtn: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
    },

    loginView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})