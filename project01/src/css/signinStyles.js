import { StyleSheet } from "react-native";
import { commonStyles } from "./CommonStyles";


export const signinStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    ...commonStyles.header
  },
  title: {
    ...commonStyles.title
  },
  subtitle: {
    ...commonStyles.subtitle
  },
  form: {
    gap: 20,
  },
  label: {
    ...commonStyles.label,
    marginBottom: 2,
    marginLeft:5
  },
  input: {
    ...commonStyles.input,
    height: 50,
    border:'none',
  },
  button: {
    ...commonStyles.button,
    paddingVertical: 14,
    marginTop: 40,
  },
  buttonText: {
    ...commonStyles.buttonText
  },
  account:{
    ...commonStyles.account
  },
  link:{
    ...commonStyles.link
  },
});