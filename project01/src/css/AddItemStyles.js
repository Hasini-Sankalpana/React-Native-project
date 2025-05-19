import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const addItemStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:70,
        paddingHorizontal:30,
        backgroundColor:colors.backgroundColor
    },
    head:{
        marginBottom:20,
    },
    headText:{
        fontSize:30,
        fontWeight:500,
        color:colors.textColor
    },
    label:{
        fontSize:15,
        marginVertical:10,
        color:colors.textColor
    },
    input:{
        color:colors.secondaryColor,
        backgroundColor:colors.inputBackgroundColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor:colors.borderColor,
    },
    button:{
        backgroundColor:colors.primaryColor,
        marginTop:50,
        paddingVertical:14,
        borderRadius:10,
        alignItems:'center',
    },
    buttonText:{
        color: colors.textColor,
        fontWeight: 'bold',
        fontSize: 18,   
    }
})