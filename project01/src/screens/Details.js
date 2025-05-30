import { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from '../ThemeProvider';
import { styles } from '../css/Styles';


function Details() {
  const route = useRoute();
  const { item } = route.params;
   const themeColors = useContext(ThemeContext);
    const detail = styles.details(themeColors);


    return (
      <View style={detail.container}>
        <Text style={detail.title}>{item.title}</Text>
        <Text style={detail.tagline}>{item.tagline}</Text>
        <Image style={detail.img} source={{ uri: item.imgURL }} />
        <Text style={detail.imdb}>IMDB {item.imdb}</Text>
        <Text style={detail.description}>{item.description}</Text>       
      </View>
    );
  }


export default Details