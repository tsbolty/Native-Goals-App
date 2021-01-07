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

  const getAllData = ()=>{
    return fetch('/api/test/create')
    .then(response => console.log('got a response!'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllData()
  }, [allData])

  const handleDeleteClick = id => {
    fetch(`/api/test/delete/${id}`, {
      method: 'DELETE'
    })
      .catch(err => console.log(err))
  }

  const handleSubmit = () => {
    console.log('the fuck')
    // fetch('/api/test/create', {
    //   method: 'POST',
    //   body: data
    // }).catch(err => console.log(err))
    setAllData([...allData, data])
    fetch('/api/test/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
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
        onPress={() => handleSubmit()} />
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
