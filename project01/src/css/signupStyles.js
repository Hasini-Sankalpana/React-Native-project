import { StyleSheet } from "react-native";
import { commonStyles } from "./CommonStyles";

export const signupStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    flex: 1,
    padding: 25,
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
    marginBottom: 1,
    marginLeft:5
  },
  input: {
    ...commonStyles.input,
    height: 50,
  },
  button: {
    ...commonStyles.button,
    paddingVertical: 14,
    marginTop: 30,
  },
  buttonText: {
    ...commonStyles.buttonText
  },
  account:{
    ...commonStyles.account
  },
  link:{
    ...commonStyles.link
  }
});