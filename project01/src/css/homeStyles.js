import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { commonStyles } from "./CommonStyles";

export const homeStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 20,
    minHeight: '100%',
    backgroundColor: colors.backgroundColor,
  },
  head: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 20,
  },
  headIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headText: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:5
  },
  headIconText: {
    color: colors.textColor,
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    color: colors.textColor,
    fontWeight: '600',
  },
  name: {
    fontSize: 28,
    color: colors.primaryColor,
    fontWeight: '700',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
  backgroundColor: colors.cardColor, 
  width: 110,
  height: 160,
  borderRadius: 10,
  padding: 8,
  marginBottom: 20,
  justifyContent: 'flex-start',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1, 
  shadowRadius: 6,
  elevation: 4,
},

  img: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  cardtitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.cardTitle,
    textAlign: 'center',
    marginBottom: 2,
  },
  cardsubtitle: {
    fontSize: 11,
    color: colors.cardSubTitle,
    textAlign: 'center',
  },
  button: {
    ...commonStyles.button,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  buttonText: {
    ...commonStyles.buttonText,
    fontSize: 16,
  }
});
