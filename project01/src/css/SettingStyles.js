import { StyleSheet } from "react-native";
import { commonStyles } from "./CommonStyles";

export const settingStyles = (theme) => StyleSheet.create({
  container: {
    ...commonStyles.container(theme),
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor || '#e0e0e0', 
    paddingBottom: 15,
  },
  headerText: {
    color: theme.textColor, 
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.cardColor || '#fff', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: theme.shadowColor || '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingText: {
    fontSize: 16,
    color: theme.textColor, 
  },
  button: {
    ...commonStyles.button(theme), 
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
    shadowColor: theme.shadowColor || '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    alignItems: 'center',
  },
  buttonText: {
    ...commonStyles.buttonText(theme), 
    fontSize: 16,
    fontWeight: '500',
  },
});