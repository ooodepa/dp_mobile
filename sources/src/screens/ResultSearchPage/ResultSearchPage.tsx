import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Text, View, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './ResultSearchPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import PostImageBlock from '../../components/PostImageBlock/PostImageBlock';
import ItemShortDto from '../../utils/FetchBackend/rest/api/items/dto/item-short.dto';

type Props = NativeStackScreenProps<RootStackParamList, 'ResultSearchPage'>;

function ResultSearchPage({navigation}: Props): JSX.Element {
  const route = useRoute();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([
    {
      dp_id: '-1',
      dp_name: '',
      dp_model: '',
      dp_cost: 0,
      dp_photoUrl: '',
      dp_itemCategoryId: -1,
      dp_seoKeywords: '',
      dp_seoDescription: '',
    },
  ]);

  useEffect(() => {
    (async function () {
      await onRefresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      const params: any = route.params;
      const search: string = params.search;
      setProducts(await FetchItems.searchAll(search));
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  function select(dp_id: string) {
    navigation.navigate('ItemPage', {dp_id});
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.items}>
        {products[0]?.dp_id === '-1'
          ? null
          : products.map((element: ItemShortDto) => {
              return (
                <Pressable
                  key={element.dp_id}
                  onPress={() => select(element.dp_id)}>
                  <View style={styles.item__block}>
                    <PostImageBlock url={element.dp_photoUrl} />
                    <Text style={styles.item__modelText}>
                      {element.dp_model}
                    </Text>
                    <Text style={styles.item__nameText}>{element.dp_name}</Text>
                    <Text style={styles.item__costText}>
                      BYN {element.dp_cost}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
      </View>
    </AppWrapper>
  );
}

export default ResultSearchPage;
