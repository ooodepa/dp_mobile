import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, Text, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './ItemBrandsPageStyles';
import Search from '../../components/Search/Search';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import FetchItemBrands from '../../utils/FetchBackend/rest/api/item-brands';
import PostImageBlock from '../../components/PostImageBlock/PostImageBlock';
import checkUpdate from '../../utils/FetchBackend/rest/api/apk-versions/checkUpdate';
import SwipeDownToRefresh from '../../components/SwipeDownToRefresh/SwipeDownToRefresh';
import ItemBrandsDto from '../../utils/FetchBackend/rest/api/item-brands/dto/item-brand.dto';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemBrandsPage'>;

function ItemBrandsPage(props: Props): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [array, setArray] = useState([
    {
      dp_id: -1,
      dp_name: '',
      dp_sortingIndex: 1,
      dp_photoUrl: '',
      dp_urlSegment: '',
      dp_seoKeywords: '',
      dp_seoDescription: '',
      dp_isHidden: false,
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      setIsRefreshing(false);
    }
  }, [isFocused]);

  useEffect(function () {
    (async function () {
      await checkUpdate();
      await onRefresh();
    })();
  }, []);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      setArray(await FetchItemBrands.getAll());
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  function select(brand: string) {
    props.navigation.navigate('ItemCategoriesPage', {brand});
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.items}>
        <Search nativeStackScreenProps={props} />
        {array.length === 0 || array[0]?.dp_id === -1 ? (
          <SwipeDownToRefresh />
        ) : null}
        {array[0]?.dp_id === -1
          ? null
          : array.map((element: ItemBrandsDto) => {
              return (
                <Pressable
                  key={element.dp_id}
                  onPress={() => select(element.dp_urlSegment)}>
                  <View style={styles.item__block}>
                    <PostImageBlock url={element.dp_photoUrl} />
                    <Text style={styles.item__text}>{element.dp_name}</Text>
                  </View>
                </Pressable>
              );
            })}
      </View>
    </AppWrapper>
  );
}

export default ItemBrandsPage;
