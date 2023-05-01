import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  RefreshControl,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './BasketPageStyles';
import Basket from '../../utils/Basket/Basket';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import RootStackParamList from '../../navigation/RootStackParamList';

type IProps = NativeStackScreenProps<RootStackParamList, 'BasketPage'>;

export default function BasketPage(props: IProps): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([
    {
      dp_id: '',
      dp_name: '',
      dp_model: '',
      dp_cost: 0,
      dp_photoUrl: '',
      dp_itemCategoryId: -1,
      dp_seoKeywords: '',
      dp_seoDescription: '',
    },
  ]);
  const [basket, setBasket] = useState([
    {
      dp_id: '',
      dp_model: '',
      dp_name: '',
      dp_img: '',
      dp_cost: 0,
      dp_count: 0,
    },
  ]);
  const [rerenderBasket, setRerenderBasket] = useState(1);

  useEffect(() => {
    if (!isFocused) {
      setIsRefreshing(false);
      return;
    }

    (async function () {
      await onRefresh();
    })();
  }, [isFocused]);

  useEffect(() => {
    (async function () {
      setBasket(await Basket.getBasketArray(products));
    })();
  }, [products, rerenderBasket]);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      const models = await Basket.getModels();
      const prdcts = await FetchItems.getByModels(models);
      const bskt = await Basket.getBasketArray(prdcts);

      setProducts(prdcts);
      setBasket(bskt);
    } catch (exception) {
      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  function isEmptyBasket() {
    if (basket.length === 0) {
      const title = 'Корзина';
      const message = 'Корзина пуста';
      Alert.alert(title, message);
      return true;
    }
    return false;
  }

  async function countPlus(model: string) {
    await Basket.plus(model);
    setRerenderBasket(e => e + 1);
  }

  async function countMinus(model: string) {
    await Basket.minus(model);
    setRerenderBasket(e => e + 1);
  }

  async function countChange(model: string, strCount: string) {
    const str = strCount.trim();
    const counter = parseInt(str, 10);

    if (isNaN(counter)) {
      await Basket.setCount(model, 1);
      setRerenderBasket(e => e + 1);
      return;
    }

    await Basket.setCount(model, counter);

    setRerenderBasket(e => e + 1);
  }

  function MakeOrder() {
    const isEmpty = isEmptyBasket();
    if (isEmpty) {
      return;
    }

    const title = 'Заглушка';
    const message = 'Функция в разработке';
    Alert.alert(title, message);
  }

  function toItemBrandsPage() {
    props.navigation.navigate('ItemBrandsPage');
  }

  function toItemPage(dp_id: string) {
    props.navigation.navigate('ItemPage', {dp_id});
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      title="Корзина">
      <View style={styles.items}>
        {rerenderBasket &&
          basket.map(element => {
            const {dp_model, dp_name, dp_img, dp_cost, dp_count} = element;
            const dp_cost_no_nds = Number(dp_cost).toFixed(2);
            const dp_cost_nds = Number(dp_cost * 1.2).toFixed(2);
            const dp_sum = Number(dp_cost * dp_count * 1.2).toFixed(2);
            return (
              <Pressable
                style={styles.item__block}
                key={dp_model}
                onPress={() => toItemPage(element.dp_id)}>
                <View style={styles.item__imageBlock}>
                  {dp_img !== '' ? (
                    <Image
                      style={styles.image}
                      source={{uri: dp_img}}
                      resizeMode={'contain'}
                    />
                  ) : (
                    <Text style={styles.img__x}>x</Text>
                  )}
                </View>
                <Text style={styles.item__modelText}>{dp_model}</Text>
                <Text style={styles.item__nameText}>{dp_name}</Text>
                <View style={styles.count__block}>
                  <Pressable onPress={() => countMinus(dp_model)}>
                    <View style={styles.count__button}>
                      <Text style={styles.count__buttonText}>-</Text>
                    </View>
                  </Pressable>
                  <TextInput
                    style={styles.count__value}
                    placeholder={`${dp_count}`}
                    keyboardType="numeric"
                    value={`${dp_count}`}
                    onChangeText={value => countChange(dp_model, value)}
                  />
                  <Pressable onPress={() => countPlus(dp_model)}>
                    <View style={styles.count__button}>
                      <Text style={styles.count__buttonText}>+</Text>
                    </View>
                  </Pressable>
                </View>
                <Text style={styles.item__costNoNdsText}>
                  (без НДС) BYN {dp_cost_no_nds}
                </Text>
                <Text style={styles.item__costText}>
                  (c НДС) BYN {dp_cost_nds}
                </Text>
                <Text style={styles.item__costText}>
                  (Итого с НДС) BYN {dp_sum}
                </Text>
              </Pressable>
            );
          })}
      </View>
      <View style={styles.block__center}>
        {basket.length === 0 ? (
          <Pressable style={styles.button__wrapper} onPress={toItemBrandsPage}>
            <Text style={styles.button__text}>Выбрать товары</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button__wrapper} onPress={MakeOrder}>
            <Text style={styles.button__text}>Оформить заявку</Text>
          </Pressable>
        )}
      </View>
    </AppWrapper>
  );
}
