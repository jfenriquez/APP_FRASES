import React, {useContext, useEffect, useState} from 'react';

import {View, TextInput, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSearchPhrase} from '../hooks/useSearchPhrase';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {ThemeContext} from '../context/themeContext/ThemeContext';

interface Props {
  onDebounce: (value: string) => void;
  onRes: (value: any[]) => void;
}
const SearchInput = ({onDebounce, onRes}: Props) => {
  const {isLoading, phrases, setPhrases, searchPhrase} = useSearchPhrase();
  const [textValue, setTextValue] = useState('');

  const debouncerValue = useDebouncedValue(textValue, 500);

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  useEffect(() => {
    onDebounce(debouncerValue);
    (async () => {
      try {
        if (typeof debouncerValue === 'string' && debouncerValue.length > 0) {
          const response = await searchPhrase(debouncerValue);
          if ((await response.length) > 0) {
            console.log('response', response);
            return onRes(response);
          }
        }
      } catch (error) {
        return onRes([]);
        console.log( error);
      }
    })();
  }, [debouncerValue]);

  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: colors.card,
        overflow: 'hidden',
        height: 40,
      }}>
      <TextInput
        placeholderTextColor={colors.text}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: 'transparent',
          borderColor: colors.text,
          color: colors.text,
        }}
        onChangeText={setTextValue}
        value={textValue}
        placeholder="Search"
      />
      <Icon
        name="search"
        style={{position: 'absolute', fontSize: 45, right: 15}}
      />

      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
};

export default SearchInput;
