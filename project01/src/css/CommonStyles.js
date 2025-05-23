import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const commonStyles = StyleSheet.create({
    container:{
        backgroundColor:colors.backgroundColor,  
    },
     label:{
        fontSize:15,
        color:colors.textColor,
        fontWeight:500
    },
    input:{
        color:colors.textColor,
        backgroundColor:colors.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderBottomColor:colors.primaryColor,
        borderBottomWidth:1,
    },
     button:{
        backgroundColor:colors.primaryColor,
        borderRadius:10,
        alignItems:'center',
    },
     buttonText:{
        color: colors.textColor,
        fontWeight: 'bold',
        fontSize: 18,   
    },
    account:{
    color:colors.textColor,
    paddingLeft:5
  },
  link:{
    color:colors.primaryColor,
    cursor: 'pointer'
  },
  header: {
    marginBottom: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  subtitle: {
    fontSize: 16,
     color: colors.subTextColor,
    marginTop: 8,
  },
})