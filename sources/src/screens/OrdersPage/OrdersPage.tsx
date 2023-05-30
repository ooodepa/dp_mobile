import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, Text, RefreshControl, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './OrdersPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchOrders from '../../utils/FetchBackend/rest/api/orders';
import RootStackParamList from '../../navigation/RootStackParamList';
import DataController from '../../utils/DateConroller/DateController';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import GetOrderWithIdDto from '../../utils/FetchBackend/rest/api/orders/dto/get-order-with-id.dto';

type Props = NativeStackScreenProps<RootStackParamList, 'OrdersPage'>;

function OrdersPage(props: Props): JSX.Element {
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orders, setOrders] = useState<GetOrderWithIdDto[]>([]);

  useEffect(() => {
    setIsRefreshing(false);
    if (!isFocused) {
      return;
    }

    (async function () {
      await onRefresh();
    })();
  }, [isFocused]);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      setOrders(await FetchOrders.getAll());
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }

    setIsRefreshing(false);
  }

  function selectOrder(dp_id: string) {
    props.navigation.navigate('OrderPage', {dp_id});
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.wrapper}>
        {orders.map(e => {
          const positions = e.dp_orderItems.length;
          let countAll = 0;
          let sum = 0;
          e.dp_orderItems.map(item => {
            countAll += item.dp_count;
            sum += item.dp_count * item.dp_cost;
          });
          const SUM = Number(sum).toFixed(2);

          const data = new Date(e.dp_date);
          const dateStr = DataController.getStringTime(data);
          const timeAgo = DataController.getTimeAgo(data);

          return (
            <Pressable
              key={e.dp_id}
              style={styles.order__item}
              onPress={() => selectOrder(e.dp_id)}>
              <Text style={styles.item__date_text}>{dateStr}</Text>
              <View style={styles.item__row}>
                <Text style={styles.item__text}>Позиций выбрано</Text>
                <Text style={styles.item__text}>{positions} шт.</Text>
              </View>
              <View style={styles.item__row}>
                <Text style={styles.item__text}>Всего заказано</Text>
                <Text style={styles.item__text}>{countAll} шт.</Text>
              </View>
              <View style={styles.item__row}>
                <Text style={styles.item__text}>Заказ на сумму</Text>
                <Text style={styles.item__text}>Br {SUM}</Text>
              </View>
              <Text style={styles.item__time_ago}>{timeAgo}</Text>
            </Pressable>
          );
        })}
      </View>
    </AppWrapper>
  );
}

export default OrdersPage;
