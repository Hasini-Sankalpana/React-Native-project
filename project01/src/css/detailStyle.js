import { StyleSheet } from "react-native";
import { commonStyles } from "./CommonStyles";

export const detailStyles = (theme) => StyleSheet.create({
  container: {
    ...commonStyles.container(theme), 
    flex: 1,
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 20,
  },
  title: {
    fontSize: 30,
    color: theme.primaryColor, 
    fontWeight: '500', 
    marginBottom: 10, 
  },
  tagline: {
    fontSize: 15,
    marginBottom: 20,
    color: theme.cardSubTitle || theme.subTextColor, 
    fontStyle: 'italic',
  },
  img: {
    width: '100%', 
    height: 350,
    resizeMode: 'cover',
    marginBottom: 30,
    borderRadius: 10, 
  },
  imdb: {
    fontSize: 20,
    marginBottom: 15,
    color: theme.primaryColor, 
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    paddingRight: 20, 
    textAlign: 'justify',
    color: theme.textColor, 
    lineHeight: 22, 
  }
});