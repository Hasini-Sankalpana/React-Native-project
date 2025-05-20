import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";


export const homeStyles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom:50,
    paddingHorizontal:30,
    gap: 40,
    backgroundColor:colors.backgroundColor,
    minHeight:'100%'
  },
  head:{
   display:'flex',
   flexDirection:'row',
   justifyContent:"space-between"
  },
  headIcon:{
   display:'flex',
   flexDirection:'row',
   gap:8
  },
  headText:{
    display:'flex',
    flexDirection:'row',
    paddingLeft:10,
    gap:10,
    alignContent:'center',
  },
  headIconText:{
   color:colors.textColor,
   fontSize:30,
  },
  title:{
    fontSize:30,
    color:colors.textColor

  },
  name:{
    fontSize:30,
    color:colors.primaryColor,
    fontWeight:700
  },
  cards:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
  },
  card:{
    backgroundColor:colors.cardColor,
    width:110,
    height:150,
    borderRadius:10,
    padding:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'left',
    marginTop:20,
    marginRight:10
  },
  cardtitle:{
    fontSize:12,
    fontWeight:'bold',
    color:colors.cardTitle,
    marginTop:5
  },
  cardsubtitle:{
    fontSize:10,
    color:colors.cardSubTitle
  },
   img:{
    width:80,
    height:80,
    resizeMode:'cover',
    marginVertical:5,
    marginHorizontal:5
  },
  button:{
    backgroundColor:colors.primaryColor,
    paddingVertical:4,
    paddingHorizontal:8,
    borderRadius:5,
    alignSelf:"center"
  },
  buttonText:{
    color:colors.textColor
  }
});