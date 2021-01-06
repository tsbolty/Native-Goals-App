import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Input from './components/Input';
import List from './components/List';

export default function App() {
  const [data, setData] = useState({
    title: '',
    body: ''
  });
  const [allData, setAllData] = useState([])

  const handleTitleInputChange = inputText => {
    setData({ ...data, title: inputText })
  }

  const handleBodyInputChange = inputText => {
    setData({ ...data, body: inputText })
  }

  useEffect(async ()=>{
    const {data} = await fetch('api/test/read')
    setAllData(data)
  }, [])

  const handleDeleteClick = id =>{
    fetch(`/api/test/delete/${id}`, {
      method: 'DELETE'
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = () => {
    fetch('/api/test/create', {
      method: 'POST',
      body: data
    }).catch(err => console.log(err))
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Text>{data.title}</Text>
      </View>
      <View style={styles.preview}>
        <Text>{data.body}</Text>
      </View>
      <Input
        style={styles.input}
        inputValue={data.title}
        handleInputChange={handleTitleInputChange}
        name="title"
        placeholder="Title" />
      <Input
        style={styles.input}
        inputValue={data.body}
        handleInputChange={handleBodyInputChange}
        name='body'
        placeholder='Body' />
      <Button
        title='Submit'
        onPress={() => handleSubmit} />
      <List onDelete={handleDeleteClick} listItems={allData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    marginVertical: 15,
    fontSize: 25
  },
  input: {
    marginVertical: 10,
    width: '80%'
  }
});
