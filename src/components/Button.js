import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({text, onPress}) =>{
    return(
        <TouchableOpacity style={styles.Button} onPress={onPress}>
            <Text style ={styles.ButtonText}>
                    {text}
            </Text>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    Button:{
        backgroundColor: '#1F2A47',
    padding: 10,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    width: 340,
    height: 50,
    marginBottom:36,
    },
    ButtonText:{
        color: 'white',
        fontWeight: 'bold',
    }
})

export default Button;