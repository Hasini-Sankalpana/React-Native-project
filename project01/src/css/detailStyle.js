import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";


export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingLeft:30,
    backgroundColor:colors.backgroundColor
  },
  title:{
    fontSize:30,
    color:colors.cardTitle,
    fontWeight:500,
  },
  tagline:{
    fontSize:15,
    marginBottom:20,
    color:colors.cardSubTitle
  },
  img:{
    width:350,
    height:350,
    resizeMode:'cover',
    marginBottom:30
  },
  imdb:{
    fontSize:20,
    marginBottom:15,
    color:'#e4f17f'
  },
  description:{
    fontSize:15,
    paddingRight:40,
    textAlign:'justify',
    color:colors.textColor
  }
})
