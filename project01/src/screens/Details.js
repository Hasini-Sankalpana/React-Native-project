import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { detailStyles } from '../css/detailStyle';


function Details() {
  const route = useRoute();
  const { item } = route.params;


    return (
      <View style={detailStyles.container}>
        <Text style={detailStyles.title}>{item.title}</Text>
        <Text style={detailStyles.tagline}>{item.tagline}</Text>
        <Image style={detailStyles.img} source={{ uri: item.imgURL }} />
        <Text style={detailStyles.imdb}>IMDB {item.imdb}</Text>
        <Text style={detailStyles.description}>{item.description}</Text>       
      </View>
    );
  }


export default Details