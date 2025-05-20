import { Text, TouchableOpacity } from "react-native"

const AppButton = ({
    title,
    style,
    textStyle,
    loadingTitle,
    onPress,
    loading
}) => {
     
    return(
        <TouchableOpacity 
           style={style.button}
           onPress={onPress}
           disabled={loading}>

            <Text style={textStyle.buttonText}>
                {loading ? loadingTitle :  title }
                </Text>
           </TouchableOpacity>
    )
}

export default AppButton;