import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';

const userList = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mary' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Alice' },
];

const UserListScreen = () => {
  const [query, setQuery] = useState(null);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const filteredUsers = userList.filter((user) => {
    if(query===null)
        return null;
      else 
    return user.name.toLowerCase().includes(query.toLowerCase());
  });

  const renderUser = ({ item }) => {
    return <Text>{item.name}</Text>;
  };

  return (
    <View>
      <TextInput
        placeholder="Search users..."
        onChangeText={handleSearch}
        value={query}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
      />
    </View>
  );
};

export default UserListScreen;
