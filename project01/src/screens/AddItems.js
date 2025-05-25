import React, { useState, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import AppButton from '../components/Buttons';
import FormInput from '../components/FormInput';
import { addItem } from '../api/items';
import { addItemValidation } from '../utils/validation';
import { AddItemConstants } from '../constants/TextConstant';
import { useDispatch } from 'react-redux';
import { setItemError, getItemSuccess } from '../redux/itemSlice';
import { ThemeContext } from '../ThemeProvider';
import { styles } from '../css/Styles';


const AddItems = () => {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    imgURL: '',
    imdb: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const themeColors = useContext(ThemeContext);
  const item = styles.item(themeColors);

  const FormInputs = [
    { id: 'title', label: 'Title', placeholder: 'Enter the title' },
    { id: 'tagline', label: 'Tagline', placeholder: 'Enter tagline' },
    { id: 'imgURL', label: 'Image URL', placeholder: 'Enter image URL' },
    { id: 'imdb', label: 'IMDB value (out of 10)', placeholder: 'Enter IMDB rating' },
    { id: 'description', label: 'Description', placeholder: 'Enter description' }
  ];

  const handleAddItem = async () => {
    const validate = addItemValidation(formData);

    if (!validate.success) {
      Alert.alert("Error", validate.message);
      return;
    }

    setLoading(true);

    try {
      const data = await addItem(formData);

      if (!data.success) {
        Alert.alert("Error", data.message || "Failed to add item");
        dispatch(setItemError(data.message));
        return;
      }

      dispatch(getItemSuccess(data.body));
      setFormData({
        title: '',
        tagline: '',
        imgURL: '',
        imdb: '',
        description: ''
      });
      
      Alert.alert("Success", "Item added successfully");
      
    } catch (error) {
      console.log(error);
      dispatch(setItemError(error.message || "An error occurred"));
      Alert.alert("Error", "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <View style={item.container}>
      <View style={item.head}>
        <Text style={item.headText}>
          {AddItemConstants.headText}
        </Text>
      </View>
      
      <View style={item.form}>
        {FormInputs.map((input) => (
          <FormInput
            key={input.id}
            style={item}
            label={input.label}
            value={formData[input.id]}
            onChangeText={(value) => handleChange(input.id, value)}
            placeholder={input.placeholder}
            placeholderTextColor={themeColors.subTextColor} // Using theme color
          />
        ))}
        
        <AppButton 
          title={AddItemConstants.button}
          loadingTitle={AddItemConstants.buttonLoading}
          style={item}
          textStyle={item}
          onPress={handleAddItem}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default AddItems;