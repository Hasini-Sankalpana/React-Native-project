import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.backgroundColor,
    padding: 25,
    justifyContent: 'center',
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
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    color: colors.textColor,
    marginBottom: 1,
    fontWeight:500,
    marginLeft:5
  },
  input: {
    height: 50,
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderBottomColor:colors.primaryColor,
    borderBottomWidth:1,
    fontSize: 16,
    color:colors.textColor,
    
    borderColor:colors.borderColor,
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  account:{
    color:colors.textColor,
    paddingLeft:5
  },
  link:{
    color:colors.primaryColor
  }
});