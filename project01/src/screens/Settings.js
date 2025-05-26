import { useContext, useEffect } from 'react';
import { View, Text, Switch, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/Buttons';
import { SettingConstants } from '../constants/TextConstant';
import { logout } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../ThemeProvider';
import { setTheme, setResolvedTheme } from '../redux/themeSlice';
import { styles } from '../css/Styles';

const Settings = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const { theme, resolvedTheme } = useSelector((state) => state.theme);
  const themeColors = useContext(ThemeContext);
  const settings = styles.settings(themeColors);


  useEffect(() => {
    const newResolvedTheme = theme === 'system' ? colorScheme : theme;
    dispatch(setResolvedTheme(newResolvedTheme));
  }, [theme, colorScheme, dispatch]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
  };

  const handleToggle = async () => {
    let newTheme;
    if (theme === 'system') {
      newTheme = 'light'; 
    } else if (theme === 'light') {
      newTheme = 'dark'; 
    } else {
      newTheme = 'system'; 
    }
    dispatch(setTheme(newTheme));
  };

 
  const switchValue = theme !== 'system' && theme === 'dark';

  return (
    <View style={settings.container}>
      <View style={settings.header}>
        <Text style={settings.headerText}>{SettingConstants.headerText}</Text>
      </View>

      <View style={settings.settingItem}>
        <View style={settings.settingLeft}>
          <Text style={settings.settingText}>{SettingConstants.settingText}</Text>
          <Text style={settings.settingSubText}>
            Current: {theme === 'system' ? `System (${colorScheme})` : theme}
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={resolvedTheme === 'dark' ? '#f4f3f4' : '#f5dd4b'}
          onValueChange={handleToggle}
          value={switchValue}
        />
      </View>

      <AppButton
        title={SettingConstants.button}
        loadingTitle={SettingConstants.button}
        style={settings}
        textStyle={settings}
        onPress={handleLogout}
      />
    </View>
  );
};

export default Settings;