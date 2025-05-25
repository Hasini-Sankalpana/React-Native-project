import { useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/Buttons';
import { SettingConstants } from '../constants/TextConstant';
import { logout } from '../redux/authSlice';
import { useDispatch, useSelector} from 'react-redux';
import { ThemeContext } from '../ThemeProvider';
import { setTheme } from '../redux/themeSlice';
import { styles } from '../css/Styles';


const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const themeColors = useContext(ThemeContext);
  const settings = styles.settings(themeColors);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
  };

  const handleToggle = async() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  }

  return (
    <View style={settings.container}>
      <View style={settings.header}>
        <Text style={settings.headerText}>{SettingConstants.headerText}</Text>
      </View>

      <View style={settings.settingItem}>
        <View style={settings.settingLeft}>
          <Text style={settings.settingText}>{SettingConstants.settingText}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={theme === 'dark' ? '#f4f3f4' : '#f5dd4b' }
          onValueChange={handleToggle}
          value={theme === 'light'}
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