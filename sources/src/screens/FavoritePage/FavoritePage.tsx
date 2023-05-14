import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './FavoritePageStyles';
import LikeController from '../../utils/LikeController';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import RootStackParamList from '../../navigation/RootStackParamList';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import PostImageBlock from '../../components/PostImageBlock/PostImageBlock';
import LikeUnlikeItemDto from '../../utils/LikeController/dto/LikeUnlikeItemDto';
import FetchFavoriteItems from '../../utils/FetchBackend/rest/api/favorite-items';
import UnauthorizedException from '../../utils/FetchBackend/exceptions/UnauthorizedException';

type Props = NativeStackScreenProps<RootStackParamList, 'FavoritePage'>;

export default function FavoritePage(props: Props) {
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [likeUnlikeItems, setLikeUnlikeItems] = useState([
    {
      dp_id: '-1',
      dp_name: '',
      dp_model: '',
      dp_cost: 0,
      dp_photoUrl: '',
      dp_itemCategoryId: -1,
      dp_seoKeywords: '',
      dp_seoDescription: '',
      isLike: false,
    },
  ]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    (async function () {
      await onRefresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function onRefresh() {
    try {
      setIsRefreshing(true);

      const refreshToken = await MyLocalStorage.getItem('refresh');
      if (!refreshToken) {
        setIsRefreshing(false);
        props.navigation.navigate('AccountPage');
        return;
      }

      const faviriteItems = await FetchFavoriteItems.getAll();
      const itemIds = faviriteItems.map(element => element.dp_itemId);
      const items = await FetchItems.getByIds(itemIds);
      const itms = LikeController.getProducts(items, faviriteItems);
      setLikeUnlikeItems(itms);
      setIsRefreshing(false);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
      if (exception instanceof UnauthorizedException) {
        MyLocalStorage.removeItem('access');
        MyLocalStorage.removeItem('refresh');
        setIsRefreshing(false);
        props.navigation.navigate('AccountPage');
      }

      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  function select(dp_id: string) {
    props.navigation.navigate('ItemPage', {dp_id});
  }

  async function like(itemId: string) {
    try {
      const isLike = await FetchFavoriteItems.like(itemId);

      if (!isLike) {
        return;
      }

      setLikeUnlikeItems(
        likeUnlikeItems.map(e => {
          if (e.dp_id === itemId) {
            e.isLike = true;
          }
          return e;
        }),
      );
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      if (exception instanceof UnauthorizedException) {
        MyLocalStorage.removeItem('access');
        MyLocalStorage.removeItem('refresh');
        setIsRefreshing(false);
        props.navigation.navigate('AccountPage');
      }

      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }
  }

  async function unLike(itemId: string) {
    try {
      const isUnlike = await FetchFavoriteItems.unLike(itemId);

      if (!isUnlike) {
        return;
      }

      setLikeUnlikeItems(
        likeUnlikeItems.map(e => {
          if (e.dp_id === itemId) {
            e.isLike = false;
          }
          return e;
        }),
      );
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      if (exception instanceof UnauthorizedException) {
        MyLocalStorage.removeItem('access');
        MyLocalStorage.removeItem('refresh');
        setIsRefreshing(false);
        props.navigation.navigate('AccountPage');
      }

      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.items}>
        {likeUnlikeItems.length !== 0 ? null : (
          <Text style={styles.list_empty_text}>Список избранных пуст</Text>
        )}
        {likeUnlikeItems[0]?.dp_id === '-1'
          ? null
          : likeUnlikeItems.map((element: LikeUnlikeItemDto) => {
              return (
                <Pressable
                  key={element.dp_id}
                  onPress={() => select(element.dp_id)}>
                  <View style={styles.item__block}>
                    {element.isLike ? (
                      <Pressable
                        onPress={() => unLike(element.dp_id)}
                        style={styles.like}>
                        <Icon name="heart" color={'#06c'} size={32} />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => like(element.dp_id)}
                        style={styles.like}>
                        <Icon name="heart" color={'lightgrey'} size={32} />
                      </Pressable>
                    )}
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
