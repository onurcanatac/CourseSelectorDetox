import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RadioButton, List} from 'react-native-paper';

const SecurityImageForm = ({radioItems, checked, setChecked}) => {
  return (
    <View>
      {radioItems.map(item => (
        <List.Item
          key={item.key}
          style={styles.listItem}
          title={() => (
            <View style={styles.radioAndImageContainer}>
              <RadioButton
                value={item.value}
                status={checked === item.value ? 'checked' : 'unchecked'}
                onPress={() => setChecked(item.value)}
                style={styles.radioButton}
                testID={`${item.key}_radioButton`}
              />
              {item.image ? (
                <Image source={item.image} style={styles.radioButtonImage} />
              ) : (
                <Text>{item.label}</Text>
              )}
            </View>
          )}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  radioAndImageContainer: {
    marginLeft: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 30,
  },
  radioButtonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default SecurityImageForm;
