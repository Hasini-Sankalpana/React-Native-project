import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: (theme) => ({
        backgroundColor: theme.backgroundColor,  
    }),
    label: (theme) => ({
        fontSize: 15,
        color: theme.textColor,
        fontWeight: '500'
    }),
    input: (theme) => ({
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderBottomColor: theme.primaryColor,
        borderBottomWidth: 1,
    }),
    button: (theme) => ({
        backgroundColor: theme.primaryColor,
        borderRadius: 10,
        alignItems: 'center',
    }),
    buttonText: (theme) => ({
        color: theme.textColor,
        fontWeight: 'bold',
        fontSize: 18,   
    }),
    account: (theme) => ({
        color: theme.textColor,
        paddingLeft: 5
    }),
    link: (theme) => ({
        color: theme.primaryColor,
        cursor: 'pointer'
    }),
    header: {
        marginBottom: 70,
        alignItems: 'center',
    },
    title: (theme) => ({
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.textColor,
    }),
    subtitle: (theme) => ({
        fontSize: 16,
        color: theme.subTextColor,
        marginTop: 8,
    }),
});