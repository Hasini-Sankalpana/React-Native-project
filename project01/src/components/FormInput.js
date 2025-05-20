import { Text, TextInput, View } from 'react-native'

const FormInput  = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry=false,
    keyboardType='default',
    multiline=false,
    numberOfLines=1,
    style,
    PlaceholderTextColor='#aaa'
}) => {


  return (
    <View style={{marginBottom:15}}>
        <Text style={style.label}>{label}</Text>
        <TextInput 
          style={[style.input, multiline && { height: numberOfLines * 40 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={PlaceholderTextColor}
          />
    </View>
  )
}

export default FormInput