import React, {useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {View, Text, Pressable, TextInput, RefreshControl} from 'react-native';

import styles from './ItemPageStyles';
import Basket from '../../utils/Basket/Basket';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
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
    dp_itemCharacteristics: [
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
      await AsyncAlertExceptionHelper(exception);
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

  async function countChange(model: string, strCount: string) {
    const str = strCount.trim();
    const countr = parseInt(str, 10);

    if (isNaN(countr)) {
      await Basket.setCount(model, 0);
      setCounter(0);
      return;
    }

    await Basket.setCount(model, countr);
    setCounter(countr);
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
          onChangeText={text => countChange(productData.dp_model, text)}
        />
        <Pressable onPress={() => countPlus(productData.dp_model)}>
          <View style={styles.count__button}>
            <Text style={styles.count__buttonText}>+</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.table}>
        <View style={styles.table__row}>
          <View style={styles.table__span2}>
            <Text style={styles.table__span2Title}>Данные номенклатуры:</Text>
          </View>
        </View>
        {[
          {key: 'Наименование', value: productData.dp_name},
          {key: 'Модель', value: productData.dp_model},
          {
            key: 'Цена без НДС',
            value: `Br ${Number(productData.dp_cost).toFixed(2)}`,
          },
        ].map(e => {
          return (
            <View key={e.key} style={styles.table__row}>
              <View style={styles.table__key}>
                <Text style={styles.table__keyText}>{e.key}</Text>
              </View>
              <View style={styles.table__value}>
                <Text style={styles.table__valueText}>{e.value}</Text>
              </View>
            </View>
          );
        })}
        <View style={styles.table__row}>
          <View style={styles.table__span2}>
            <Text style={styles.table__span2Title}>
              Дополнительные характеристики:
            </Text>
          </View>
        </View>
        {!productData.dp_itemCharacteristics.length ? (
          <View style={styles.table__row}>
            <View style={styles.table__span2}>
              <Text style={styles.table__span2Text}>
                Дополнительные характеристики не указаны
              </Text>
            </View>
          </View>
        ) : null}
        {productData.dp_itemCharacteristics?.map(characteristic => {
          const charId = characteristic.dp_characteristicId;

          let key = '';
          for (let i = 0; i < itemCharacteristics.length; ++i) {
            if (itemCharacteristics[i].dp_id === charId) {
              key = itemCharacteristics[i].dp_name;
            }
          }

          return (
            <View key={characteristic.dp_id} style={styles.table__row}>
              <View style={styles.table__key}>
                <Text style={styles.table__keyText}>{key}</Text>
              </View>
              <View style={styles.table__value}>
                <Text style={styles.table__valueText}>
                  {characteristic.dp_value}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </AppWrapper>
  );
}

export default ItemPage;
