import { View, Text, ScrollView, TouchableOpacity,Image } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faFillDrip, faKey, faUser, faMessage, faLock, faCircleInfo, faComments, faSignOut } from '@fortawesome/free-solid-svg-icons';

const MenuItems =({icon, text, size, onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:22,}}>
        <View style={{flexDirection:'row',  alignItems:'center', gap:15,}}>
            <FontAwesomeIcon icon={icon} size={size}/>
            <Text style={{fontSize:14, fontWeight:'400',}} >{text}</Text>
        </View>
        <FontAwesomeIcon icon={faChevronRight} size={24}/>
         </TouchableOpacity>
    )
};
const ProfileWorkerScreen = ({navigation}) => {
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

        <MenuItems text='Account Settings' size={20} icon={faUser} onPress={()=>navigation.navigate('AccountSetting')}/>
        <Text style={{marginTop:22, fontSize:10, fontWeight:'600', color:'#7B7B7B', marginBottom:14,}}>Preferences</Text>
        <MenuItems text='Theme' size={20} icon={faFillDrip}/>
        <MenuItems text='Security' size={20} icon={faKey}/>
        <Text style={{marginTop:22, fontSize:10, fontWeight:'600', color:'#7B7B7B', marginBottom:14,}}>Reesources</Text>
        <MenuItems text='FAQ' size={20} icon={faMessage}/>
        <MenuItems text='Support' size={20} icon={faComments}/>
        <MenuItems text='Privacy' size={20} icon={faLock}/>
        <MenuItems text='About Us' size={20} icon={faCircleInfo}/>
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:22,}}>
        <View style={{flexDirection:'row',  alignItems:'center', gap:15,}}>
            <FontAwesomeIcon icon={faSignOut} size={20} color="#C11414"/>
            <Text style={{fontSize:14, fontWeight:'400', color:'#C11414'}} >Sign Out</Text>
        </View>
        
         </TouchableOpacity>
         <TouchableOpacity style={{borderWidth:1,width:172, height:39, alignSelf:'center',padding:10, marginTop:132, borderRadius:8, borderColor:'#F#1F2A47' }}>
            <Text style={{fontSize:14, fontWeight:'400', alignSelf:'center'}}>Become a Distro</Text>
         </TouchableOpacity>
        </View>

        </ScrollView>
    );
};

export default ProfileWorkerScreen