import { StyleSheet } from "react-native";
import { commonStyles } from "./CommonStyles";

export const signinStyles = (theme) => StyleSheet.create({
  container: {
    ...commonStyles.container(theme),
    flex: 1,
    padding: 20,
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
    marginBottom: 2,
    marginLeft: 5
  },
  input: {
    ...commonStyles.input(theme),
    height: 50,
    borderWidth: 0,
  },
  button: {
    ...commonStyles.button(theme),
    paddingVertical: 14,
    marginTop: 40,
  },
  buttonText: {
    ...commonStyles.buttonText(theme)
  },
  account: {
    ...commonStyles.account(theme)
  },
  link: {
    ...commonStyles.link(theme)
  },
});