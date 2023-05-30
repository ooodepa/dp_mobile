import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';

import styles from './OrderPageStyles';
import AppButton from '../../components/AppButton/AppButton';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import FetchOrders from '../../utils/FetchBackend/rest/api/orders';
import RootStackParamList from '../../navigation/RootStackParamList';
import DataController from '../../utils/DateConroller/DateController';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import PostImageBlock from '../../components/PostImageBlock/PostImageBlock';
import GetOrderWithIdDto from '../../utils/FetchBackend/rest/api/orders/dto/get-order-with-id.dto';

interface OrderItem {
  dp_count: number;
  dp_cost: number;
  dp_id: string;
  dp_name: string;
  dp_model: string;
  dp_photoUrl: string;
}

type IProps = NativeStackScreenProps<RootStackParamList, 'OrderPage'>;

export default function OrderPage(props: IProps): JSX.Element {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [order, setOrder] = useState<GetOrderWithIdDto>({
    dp_id: '',
    dp_date: '',
    dp_userId: -1,
    dp_canceledByClient: null,
    dp_canceledByManager: null,
    dp_receivedByClient: null,
    dp_sentedByManager: null,
    dp_orderItems: [
      {
        dp_id: -1,
        dp_orderId: '',
        dp_itemId: '',
        dp_count: 0,
        dp_cost: 0,
      },
    ],
  });
  const [orderItem, setOrderItem] = useState([
    {
      dp_id: '',
      dp_name: '',
      dp_model: '',
      dp_count: 0,
      dp_cost: 0,
      dp_photoUrl: '',
    },
  ]);

  useEffect(() => {
    setIsRefreshing(false);
    if (!isFocused) {
      return;
    }

    (async function () {
      await onRefresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      const params: any = route.params;
      const dp_id = params.dp_id;
      if (!dp_id) {
        return;
      }

      const orderData = await FetchOrders.getById(dp_id);
      setOrder(orderData);

      const ids = orderData.dp_orderItems.map(e => e.dp_itemId);
      const itemsData = await FetchItems.getByIds(ids);

      const orderItemsData: OrderItem[] = itemsData.map(item => {
        const orderElement = orderData.dp_orderItems.find(
          e => (e.dp_itemId = item.dp_id),
        );
        return {
          dp_cost: orderElement?.dp_cost || 0,
          dp_count: orderElement?.dp_count || 0,
          dp_id: item.dp_id,
          dp_model: item.dp_model,
          dp_name: item.dp_name,
          dp_photoUrl: item.dp_photoUrl,
        };
      });
      setOrderItem(orderItemsData);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }

    setIsRefreshing(false);
  }

  const date = new Date(order.dp_date);
  const strDate = DataController.getStringTime(date);
  const timeAgo = DataController.getTimeAgo(date);
  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.items}>
        <View style={styles.item__block}>
          <Text style={styles.item__nameText}>{strDate}</Text>
          <Text style={styles.item__nameText}>Заказ оформлен {timeAgo}</Text>
          <AppButton
            onPress={() =>
              props.navigation.push('SendCheckPage', {orderId: order.dp_id})
            }
            text="Отправить excel счёт на почту"
          />
        </View>
        {orderItem.map(e => {
          const sum = e.dp_cost * e.dp_count;
          return (
            <View key={e.dp_id} style={styles.item__block}>
              <PostImageBlock url={e.dp_photoUrl} />
              <Text style={styles.item__modelText}>{e.dp_model}</Text>
              <Text style={styles.item__nameText}>{e.dp_name}</Text>
              {!e.dp_count ? null : (
                <Text style={styles.item__costText}>
                  (Заказано) {e.dp_count} шт.
                </Text>
              )}
              {!e.dp_cost ? null : (
                <Text style={styles.item__costText}>
                  (По цене с НДС) Br {Number(e.dp_cost).toFixed(2)}
                </Text>
              )}
              {!sum ? null : (
                <Text style={styles.item__costText}>
                  (Итого) Br {Number(sum).toFixed(2)}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </AppWrapper>
  );
}
