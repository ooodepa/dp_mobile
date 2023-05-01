import React, {useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {View, Text, Pressable, TextInput, RefreshControl} from 'react-native';

import styles from './ItemPageStyles';
import Basket from '../../utils/Basket/Basket';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import PostImageBlock from '../../components/PostImageBlock/PostImageBlock';
import FetchItemCharacteristics from '../../utils/FetchBackend/rest/api/item-characteristics';

function ItemPage(): JSX.Element {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [counter, setCounter] = useState(0);
  const [itemCharacteristics, setItemCharacteristic] = useState([
    {
      dp_id: -1,
      dp_name: '',
    },
  ]);
  const [productData, setProductData] = useState({
    dp_id: '',
    dp_name: '',
    dp_model: '',
    dp_cost: 0,
    dp_photoUrl: '',
    dp_itemCategoryId: -1,
    dp_seoKeywords: '',
    dp_seoDescription: '',
    dp_itemCharecteristics: [
      {
        dp_id: -1,
        dp_itemId: '',
        dp_characteristicId: -1,
        dp_value: '',
      },
    ],
    dp_itemGalery: [
      {
        dp_id: -1,
        dp_itemId: '',
        dp_photoUrl: '',
      },
    ],
  });

  useEffect(() => {
    (async function () {
      setIsRefreshing(true);

      setCounter(await Basket.getCount(productData.dp_model));

      setIsRefreshing(false);
    })();
  }, [isFocused, productData.dp_model]);

  useEffect(function () {
    (async function () {
      await onRefresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      const params: any = route.params;
      const dp_id = params.dp_id;

      const data = await FetchItems.get(dp_id);
      setProductData(data);
      setItemCharacteristic(await FetchItemCharacteristics.getAll());

      setCounter(await Basket.getCount(data.dp_model));
    } catch (exception) {
      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  async function countPlus(model: string) {
    await Basket.plus(model);
    setCounter(await Basket.getCount(model));
  }

  async function countMinus(model: string) {
    await Basket.minus(model);
    setCounter(await Basket.getCount(model));
  }

  function countChange(value: string) {
    const str = value.trim();
    const cntr = Number(str);

    if (isNaN(cntr)) {
      setCounter(0);
      return;
    }
    setCounter(cntr);
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.title}>{productData.dp_model}</Text>
      <PostImageBlock url={productData.dp_photoUrl} height={180} />
      <View style={styles.count__block}>
        <Pressable onPress={() => countMinus(productData.dp_model)}>
          <View style={styles.count__button}>
            <Text style={styles.count__buttonText}>-</Text>
          </View>
        </Pressable>
        <TextInput
          style={styles.count__value}
          placeholder={`${counter}`}
          keyboardType="numeric"
          value={`${counter}`}
          onChangeText={value => countChange(value)}
        />
        <Pressable onPress={() => countPlus(productData.dp_model)}>
          <View style={styles.count__button}>
            <Text style={styles.count__buttonText}>+</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.info__block}>
        <Text style={styles.item__nameText}>{productData.dp_name}</Text>
      </View>
      {productData.dp_itemCharecteristics?.map(characteristic => {
        const charId = characteristic.dp_characteristicId;

        let key = '';
        for (let i = 0; i < itemCharacteristics.length; ++i) {
          if (itemCharacteristics[i].dp_id === charId) {
            key = itemCharacteristics[i].dp_name;
          }
        }

        return (
          <View key={characteristic.dp_id}>
            <Text style={styles.characteristic__text}>
              {key}: {characteristic.dp_value}
            </Text>
          </View>
        );
      })}
    </AppWrapper>
  );
}

export default ItemPage;
