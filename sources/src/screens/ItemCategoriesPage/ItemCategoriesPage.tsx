import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {View, Text, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './ItemCategoriesPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import PostImageBlock from '../../components/PostImageBlock/PostImageBlock';
import FetchItemCategories from '../../utils/FetchBackend/rest/api/item-categories';
import ItemCategoryDto from '../../utils/FetchBackend/rest/api/item-categories/dto/ItemCategoryDto';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemCategoriesPage'>;

function ItemCategoriesPage(props: Props): JSX.Element {
  const route = useRoute();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoriesItem, setCategoriesItem] = useState([
    {
      dp_id: -1,
      dp_name: '',
      dp_sortingIndex: 10000,
      dp_urlSegment: '',
      dp_photoUrl: '',
      dp_seoKeywords: '',
      dp_seoDescription: '',
      dp_isHidden: true,
      dp_itemBrandId: -1,
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
      const {brand} = params;
      setCategoriesItem(await FetchItemCategories.getAll({brand}));
    } catch (exception) {
      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  function select(category: string) {
    props.navigation.navigate('ItemsPage', {category});
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.items}>
        {categoriesItem.map((element: ItemCategoryDto) => {
          return element.dp_isHidden ? null : (
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

export default ItemCategoriesPage;
