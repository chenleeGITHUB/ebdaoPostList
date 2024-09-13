import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import axios from 'axios';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error); // Log the error
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Render item for each post
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={"#0000ff"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem} // Pass the function directly
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Adjusted from 11 to 1 for proper container sizing
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8, // Fixed typo from marginVerical
    marginHorizontal: 16,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
