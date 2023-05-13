import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const SearchResults = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Perform search based on searchText and update searchResults state
    // Example search code:
    const results = [{id: 1, title: 'Result 1'}, {id: 2, title: 'Result 2'}, {id: 3, title: 'Result 3'}];
    setSearchResults(results);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 16}}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Enter search text"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No results found</Text>
        </View>
      )}
    </View>
  );
};

export default SearchResults;
