import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const List = props =>{
  return(
    <View style={{...styles.container, ...props.style}}>
      {props.listItems && props.listItems.map(item =>(
        <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Button 
        title='Delete'
        onPress={()=> props.onDelete.bind(this, item.id)} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'center'
  }
})

export default List;