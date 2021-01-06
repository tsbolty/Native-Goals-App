import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = props => {
  return (
    <View style={{...styles.input, ...props.style}}>
      <TextInput
        placeholder={props.placeholder}
        name={props.name}
        value={props.inputValue}
        onChangeText={props.handleInputChange}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5
  }
})

export default Input;