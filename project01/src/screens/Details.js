import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';


function Details() {
  const route = useRoute();
  const { item } = route.params;

  console.log("Image URL:", item.imgURL);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.tagline}>{item.tagline}</Text>
        <Image style={styles.img} source={{ uri: item.imgURL }} />
        <Text style={styles.imdb}>IMDB {item.imdb}</Text>
        <Text style={styles.description}>{item.description}</Text>       
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingLeft:30,
    backgroundColor:'#000000'
  },
  title:{
    fontSize:30,
    color:'#e2fb22'
  },
  tagline:{
    fontSize:15,
    marginBottom:20,
    color:'#b7b7b7'
  },
  img:{
    width:350,
    height:350,
    resizeMode:'cover',
    marginBottom:30
  },
  imdb:{
    fontSize:20,
    marginBottom:15,
    color:'#e4f17f'
  },
  description:{
    fontSize:15,
    paddingRight:40,
    textAlign:'justify',
    color:'#fff'
  }
})

export default Details