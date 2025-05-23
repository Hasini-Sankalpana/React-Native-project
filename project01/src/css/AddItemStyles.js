import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { commonStyles } from "./CommonStyles";

export const addItemStyles = StyleSheet.create({
    container:{
        ...commonStyles.container,
        flex:1,
        paddingVertical:70,
        paddingHorizontal:30,

    },
    head:{
        marginBottom:20,
    },
    headText:{
        fontSize:30,
        fontWeight:500,
        color:colors.textColor,
    },
    label:{
       ...commonStyles.label,
        marginVertical:10,
    },
    input:{
       ...commonStyles.input
    },
    button:{
        ...commonStyles.button,
        marginTop:50,
        paddingVertical:14,
    },
    buttonText:{
       ...commonStyles.buttonText
    }
})