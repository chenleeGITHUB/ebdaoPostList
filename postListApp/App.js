import React, {useEffect, useState} from "react";
import { StyleShee, Text, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import axios from 'axios';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [posts, setPosts]= useState([]);
  const [loading, setLoading] =useState(true);

  //fetch posts from API 
  useEffect(() => {
    const fetchPosts= async () => {
      try {
        const response = await axios.get('https://josnplaceholder.typicode.com/posts');
        setPosts(response.data);
      
      } catch (error) {
        console.error();
      } finally {
        setLoading(false);

      }   
    };
    fetchPosts();
  }, [])

//render item for each post 
const renderItem =({item}) => (
  <View style= {styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Text>{item.body}</Text>
  </View>
);

if(loading){
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={"#0000ff"}/>
    </SafeAreaView>
  );
}

return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
      data={posts}
      keyExtractor={item=> item.id.toString()}
      renderItem={{renderItem}}/>
    </SafeAreaView>
  </SafeAreaProvider>
)
}

const styles=StyleSheet.create({
  container:{
    flex:11,
    backgroundColor: '#f9c2ff',
    padding:20,
    marginVerical: 8,
    marginHorizontal:16,
    borderRadius:10
  },

});