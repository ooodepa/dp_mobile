import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, TextInput, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './SearchStyles';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import RootStackParamList from '../../navigation/RootStackParamList';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

interface IProps {
  nativeStackScreenProps: NativeStackScreenProps<
    RootStackParamList,
    'ItemBrandsPage'
  >;
}

function Search(props: IProps) {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [shortResults, setShortResults] = useState([
    {
      dp_id: '-1',
      dp_name: '',
      dp_model: '',
      dp_cost: 0,
      dp_photoUrl: '',
      dp_itemCategoryId: 0,
      dp_seoKeywords: '',
      dp_seoDescription: '',
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      setShortResults([]);
      setSearch('');
    }
  }, [isFocused]);

  function toResultSearchPageFindAll() {
    if (search.trim().length === 0) {
      return;
    }
    props.nativeStackScreenProps.navigation.navigate('ResultSearchPage', {
      search,
    });
  }

  function toResultSearchPageFindOne(srch: string) {
    props.nativeStackScreenProps.navigation.navigate('ResultSearchPage', {
      search: srch,
    });
  }

  async function onChangeSearch(srch: string) {
    try {
      setSearch(srch);

      if (srch.length === 0) {
        setShortResults([]);
        return;
      }

      const items = await FetchItems.search(srch);
      setShortResults(items);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }
  }

  return (
    <>
      <View style={styles.search__container}>
        <TextInput
          placeholderTextColor="#a0a0a0"
          style={styles.search__input}
          placeholder={'Поиск номенклатуры...'}
          value={search}
          onChange={event => onChangeSearch(event.nativeEvent.text.trim())}
          // onEndEditing={findAll}
          onSubmitEditing={toResultSearchPageFindAll}
          keyboardType="web-search"
        />
        {shortResults[0]?.dp_id === '-1'
          ? null
          : shortResults.map(e => {
              return (
                <Pressable
                  key={e.dp_id}
                  style={styles.search__item}
                  onPress={() => toResultSearchPageFindOne(e.dp_name)}>
                  <Text style={styles.search__itemText}>
                    ({e.dp_model}) {e.dp_name}
                  </Text>
                </Pressable>
              );
            })}
      </View>
    </>
  );
}

export default Search;
