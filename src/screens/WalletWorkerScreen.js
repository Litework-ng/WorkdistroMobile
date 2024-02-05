import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';



const TransactionFeedPlus = ({payer, time, amount}) => {
    return(
        <View style={{marginBottom:24,  flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20,}}>
            <View style={{ flexDirection:'row', alignItems:'center', gap:10}}>
                <Image source={require('../../assets/images/profilepic2.png')} style={{width:30, height:30}}/>
                <View>
                    <Text style={{fontSize:14, fontWeight:500, color:'#000',}} >{payer}</Text>
                    <Text style={{fontSize:12, fontWeight:400, color:'#797979',}}>{time}</Text>
                </View>

            </View>
            <Text style={{fontSize:14, fontWeight:700, color:'#19B00C',}}>{amount}</Text>
        </View>
    )
}

const TransactionFeedMinus = ({payer, time, amount}) => {
    return(
        <View  style={{marginBottom:24,  flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20,}}>
            <View style={{ flexDirection:'row', alignItems:'center', gap:10}}>
                <Image source={require('../../assets/images/profilepic2.png')} style={{width:30, height:30}}/>
                <View>
                    <Text style={{fontSize:14, fontWeight:500, color:'#000',}}>{payer}</Text>
                    <Text style={{fontSize:12, fontWeight:400, color:'#797979'}}>{time}</Text>
                </View>

            </View>
            <Text style={{fontSize:14, fontWeight:700, color:'#C11414',}}>{amount}</Text>
        </View>
    )
}
const WalletWorkerScreen = ({navigation}) => {
    const [showBalance, setShowBalance] = useState(true);
    const toggleBalance = () => {
        setShowBalance(!showBalance);
      };


    return(
        <View style={{flex:1, backgroundColor:'white', paddingTop:20,}} >
            <Text style={{fontSize:16, fontWeight:'600', marginTop:25,  alignSelf:'center',}}>Wallet</Text>
                <View style={{paddingLeft:20}}>
                    <View style={{flexDirection:'row', marginTop:12, marginBottom:5, alignItems:'center', gap:8,}}>
                        <Text style={{fontSize:14, fontWeight:'400',}}>Total Balance</Text>
                        <TouchableOpacity onPress={toggleBalance}>
                        <FontAwesomeIcon icon={showBalance ? faEye : faEyeSlash} size={14} color="#000" />
                        </TouchableOpacity>
                    
                    </View>
                    {showBalance ? <Text style={{fontSize:16, fontWeight:'500',}}>N5000.00</Text>: <Text style={{fontSize:16, fontWeight:'500',}}>********</Text>}
                    
                </View>
            <View style={{flexDirection:'row', alignSelf:'center', marginTop:24, gap:18,}}>
                <View style={{alignItems:'center'}}>

                <TouchableOpacity style={{padding:8, backgroundColor:'#EDF1FF', width:40,height:40, borderRadius:4,}}>
                <Image source={require('../../assets/images/money-recive.png')} style={{width:24,height:24}}/>
                </TouchableOpacity>
                     <Text style={{ fontSize:12, fontWeight:'400', marginTop:3}}>Deposit</Text>
                </View>
                <View style={{alignItems:'center'}}>

                <TouchableOpacity style={{padding:8, backgroundColor:'#EDF1FF', width:40,height:40, borderRadius:4,}} onPress={() => navigation.navigate('VerifyWithdrawal')}>
                <Image source={require('../../assets/images/money-send.png')} style={{width:24,height:24}}/>
                </TouchableOpacity>
                    <Text style={{ fontSize:12, fontWeight:'400', marginTop:3}}>Withdrawal</Text>
                </View>

            </View>
            <Text style={{ fontSize:14, fontWeight:500, marginTop:26,  paddingLeft:20,}}>All Transactions</Text>
            <Text style={{backgroundColor:'#EDF2FF', paddingVertical:2, paddingLeft:20,fontSize:12, fontWeight:'400', color:'#9B9B9B', marginTop:13,marginBottom:26,}}>20th May 2023</Text>
                <TransactionFeedPlus payer='Monnify' time='7:45pm' amount='+N5000'/>
                <TransactionFeedMinus payer='Tosin Alabi' time='7:45pm' amount='-N5000'/>
                <Text style={{backgroundColor:'#EDF2FF', paddingVertical:2, paddingLeft:20,fontSize:12, fontWeight:'400', color:'#9B9B9B', marginTop:13,marginBottom:26,}}>19th May 2023</Text>
                <TransactionFeedPlus payer='Monnify' time='7:45pm' amount='+N5000'/>
                <TransactionFeedMinus payer='Tosin Alabi' time='7:45pm' amount='-N5000'/>
        </View>
    );
};

export default WalletWorkerScreen;