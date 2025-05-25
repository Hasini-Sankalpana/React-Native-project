import { StyleSheet } from "react-native";
import { commonStyles } from "./CommonStyles";

export const signupStyles = (theme) => StyleSheet.create({
  container: {
    ...commonStyles.container(theme), 
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  header: {
    ...commonStyles.header
  },
  title: {
    ...commonStyles.title(theme) 
  },
  subtitle: {
    ...commonStyles.subtitle(theme) 
  },
  form: {
    gap: 20,
  },
  label: {
    ...commonStyles.label(theme), 
    marginBottom: 1,
    marginLeft: 5
  },
  input: {
    ...commonStyles.input(theme), 
    height: 50,
  },
  button: {
    ...commonStyles.button(theme), 
    paddingVertical: 14,
    marginTop: 30,
  },
  buttonText: {
    ...commonStyles.buttonText(theme)
  },
  account: {
    ...commonStyles.account(theme) 
  },
  link: {
    ...commonStyles.link(theme) 
  }
});