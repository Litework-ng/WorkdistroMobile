import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity,Image } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faFillDrip, faKey, faUser, faMessage, faLock, faCircleInfo, faComments, faSignOut } from '@fortawesome/free-solid-svg-icons';
import {Eye, EyeSlash, InfoCircle, Key, Lock1, Logout, MessageQuestion, Messages2, User } from 'iconsax-react-native';
const MenuItems =({ text, saxIcon, onPress, })=>{
    return(
        <TouchableOpacity onPress={onPress} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:22,}}>
        <View style={{flexDirection:'row',  alignItems:'center', gap:15,}}>
        {saxIcon } 
           
            <Text style={{fontSize:14, fontWeight:'400',}}  >{text}</Text>
        </View>
        <FontAwesomeIcon icon={faChevronRight} size={24}/>
         </TouchableOpacity>
    )
};
const ProfileSScreen = ({navigation}) => {
    return(
        <ScrollView style={{backgroundColor:'white', padding:20,}}>
             <Text style={{fontSize:16, fontWeight:'600', alignSelf:'center', marginTop:20,}}>Profile</Text>
             <View style={{ flexDirection:'row',  gap:10,borderRadius:4, marginBottom:20, marginTop:32,}}>
            <Image source={require('../../assets/images/profilepic3.png')} style={{width:50, height:50}}/>
            <View>
                <Text style={{fontSize:14, fontWeight:600, marginTop:5, marginBottom:5,}}>Ife Aduralere</Text>
                <TouchableOpacity  onPress={()=>navigation.navigate('EditProfile')} style={{flexDirection:'row', alignItems:'center', gap:4}}>
                <Text style={{fontSize:12, fontWeight:400, color:'#7B7B7B'}}>Edit Profile</Text>
                <FontAwesomeIcon icon={faChevronRight} size ={12} color="#7B7B7B"/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{marginBottom:50,}}>

        <MenuItems saxIcon={<User size={20} color="black"/>}text='Account Settings'  onPress={()=>navigation.navigate('AccountSetting')}/>
        <Text style={{marginTop:22, fontSize:10, fontWeight:'600', color:'#7B7B7B', marginBottom:14,}}>Preferences</Text>
        
        <MenuItems  saxIcon={<Key size={20} color="black"/>} text='Security' size={20}  />
        <Text style={{marginTop:22, fontSize:10, fontWeight:'600', color:'#7B7B7B', marginBottom:14,}}>Resources</Text>
        <MenuItems text='FAQ' saxIcon={<MessageQuestion size={20} color="black"/>}   onPress={()=>navigation.navigate('Faq')}/>
        <MenuItems text='Support'  saxIcon={<Messages2 size={20} color="black"/>}  onPress={()=>navigation.navigate('Support')} />
        <MenuItems text='Privacy' saxIcon={<Lock1 size={20} color="black"  />} onPress={()=>navigation.navigate('Privacy')}/>
        <MenuItems text='About Us' saxIcon={<InfoCircle size={20} color="black"/>}  onPress={()=>navigation.navigate('AboutUs')} />
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:22,}}>
        <View style={{flexDirection:'row',  alignItems:'center', gap:15,}}>
            <Logout size={20} color="#C11414"/>
            <Text style={{fontSize:14, fontWeight:'400', color:'#C11414'}} >Sign Out</Text>
        </View>
        
         </TouchableOpacity>
         <TouchableOpacity style={{borderWidth:1,width:172, height:39, alignSelf:'center',padding:10, marginTop:132, borderRadius:8, borderColor:'#F#1F2A47' }}>
            <Text style={{fontSize:14, fontWeight:'400', }}>Become a DistroWorker</Text>
         </TouchableOpacity>
        </View>

        </ScrollView>
    );
};

export default ProfileSScreen