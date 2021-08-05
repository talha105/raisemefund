import React, { Component,useState } from 'react';
import {Platform, View, Text,StyleSheet, Image,Dimensions, TextInput,TouchableOpacity, ScrollView } from 'react-native';
import ImgIcon from "react-native-vector-icons/Entypo"
import DateIcon from "react-native-vector-icons/Fontisto"
import FillBtn from '../../../components/fillBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModel from "../../../components/imagePikerModel";
import dateFormat from "../../../utils/formatDate"

const {width,height}=Dimensions.get('window')

function Step3({getValue,values,next}){
  
    const [imageModel,setImageModel]=useState(false)
    const [img,setImg]=useState('')
    console.log("image",img)
    //firt data
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [submit,setSubmit]=useState(false);
    const [startDateCheck,setStartDateCheck]=useState(false)
    const [endDateCheck,setEndDateCheck]=useState(false)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || "";
        setShow(Platform.OS === 'ios');
        getValue('start_date',dateFormat(currentDate))
        setStartDateCheck(currentDate)
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

      // second date

      const [mode2, setMode2] = useState('date');
    const [show2, setShow2] = useState(false);
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || "";
        setShow2(Platform.OS === 'ios');
        getValue('end_date',dateFormat(currentDate))
        setEndDateCheck(currentDate)
      };
    
      const showMode2 = (currentMode) => {
        setShow2(true);
        setMode2(currentMode);
      };
    
      const showDatepicker2 = () => {
        showMode2('date');
      };

      // image picker
      function OpenLibrary(){
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true
          }).then(image => {
            renderImageModel(false)
            getValue('image_path',image)
            setImg(image.path)
          });
      }

      function OpenCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 200,
            cropping: true,
          }).then(image => {
            renderImageModel(false)
            getValue('image_path',image)
            setImg(image.path)
            
          })
      }

      function renderImageModel(con){
        if(con){
          setImageModel(true)
        }
        else{
          setImageModel(false)
        }
      }
      

    return(
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.con}>
          <ImagePickerModel
          visible={imageModel}
          closeModle={()=>renderImageModel(false)}
          goToCamera={OpenCamera}
          goToGallery={OpenLibrary}
          />
            <Text style={styles.title}>
            Almost done. Choose a
            fundraiser photo
            </Text>
            <Text style={styles.subTitle}>
                Describe why you are fundrasing
            </Text>
            <Image
            style={{width:width-40,height:200,marginTop:20}}
            source={
              img?
              {uri:img}:
              require('../../../../assets/imgIcon.png')
            }
            />
            <TouchableOpacity 
            onPress={()=>renderImageModel(true)}
            style={styles.btn}>
                <ImgIcon
                name="image"
                size={25}
                color="#f9a533"
                />
                <Text style={{color:'#f9a533',marginLeft:10}}>UPLOAD PHOTO</Text>
            </TouchableOpacity>
            {!values.image_path && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
            {/* <Text style={styles.subTitle}>
                Start Date
            </Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.date}>
            <DateIcon
                name="date"
                size={20}
                color="gray"
                />
                <Text style={{paddingLeft:20,color:'gray'}}>{values.start_date?values.start_date:'Please Select'}</Text>
            </TouchableOpacity>
            {!values.start_date && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null} */}
            <Text style={styles.subTitle}>
                End Date
            </Text>
            <TouchableOpacity
            onPress={showDatepicker2}
             style={{...styles.date}}>
            <DateIcon
                name="date"
                size={20}
                color="gray"
                />
                <Text style={{paddingLeft:20,color:'gray'}}>{values.end_date?values.end_date.toString().slice(0,16):'Please Select'}</Text>
            </TouchableOpacity>
            {!values.end_date && submit?<Text style={{color:'red',textAlign:'right',fontSize:11}}>Please Fill</Text>:null}
            {endDateCheck && submit?(

            new Date().getTime()>endDateCheck.getTime()?<Text style={{color:'red',textAlign:'right',fontSize:11}}>End date should be greater then start date</Text>:null

            ):null}
                <View style={{width:'100%'}}>
                {show2 && (
                <DateTimePicker
                  testID="dateTimePicker2"
                  value={new Date()}
                  mode={mode2}
                  is24Hour={true}
                  display={Platform.OS=="ios"?"spinner":"default"}
                  onChange={onChangeEnd}
                />
              )}
                </View>
            <View style={{marginVertical:30}}>
            <FillBtn
            call={()=>{
                setSubmit(true)
                if(values.end_date && values.image_path && endDateCheck.getTime()>new Date().getTime() ){
                    next()
                }
            }}
            text="PREVIEW funraiser"
            />
            </View>
            {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display={Platform.OS=="ios"?"spinner":"default"}
          onChange={onChange}
        />
      )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    date:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'gray',
        borderBottomWidth:1,
        paddingVertical:10,
        marginVertical:10
    },
    title:{
        fontSize:18,
        fontFamily:'Poppins-Bold',
        width:'70%'
    }
    ,
    con:{
        marginTop:20,
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    subTitle:{
        color:'gray',
        fontSize:15,
        marginTop:20
    },
    btn:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#f9a533',
        borderWidth:1,
        height:40,
        borderRadius:7
    }
})

export default Step3;