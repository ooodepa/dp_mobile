import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, Text, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './ArticlesPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import FetchArticles from '../../utils/FetchBackend/rest/api/articles';
import DataController from './../../utils/DateConroller/DateController';
import PostImageBlock from './../../components/PostImageBlock/PostImageBlock';
import ArticleDto from '../../utils/FetchBackend/rest/api/articles/dto/ArticleDto';
import SwipeDownToRefresh from '../../components/SwipeDownToRefresh/SwipeDownToRefresh';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticlesPage'>;

function ArticlesPage(props: Props): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [array, setArray] = useState([
    {
      dp_id: '-1',
      dp_name: '',
      dp_date: '',
      dp_urlSegment: '',
      dp_photoUrl: '',
      dp_text: '',
      dp_seoKeywords: '',
      dp_seoDescription: '',
      dp_articleAttachedLinks: [
        {
          dp_id: -1,
          dp_name: 'string',
          dp_url: 'string',
          dp_articleId: 'string',
        },
      ],
    },
  ]);

  useEffect(() => {
    (async function () {
      setIsRefreshing(false);
    })();
  }, [isFocused]);

  useEffect(function () {
    (async function () {
      await onRefresh();
    })();
  }, []);

  async function onRefresh() {
    setIsRefreshing(true);

    try {
      setArray(await FetchArticles.getAll());
    } catch (exception) {
      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  function toArticlePage(url: string) {
    props.navigation.navigate('ArticlePage', {url});
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      title="Новости">
      <View style={styles.items}>
        {array.length === 0 || array[0]?.dp_id === '-1' ? (
          <SwipeDownToRefresh />
        ) : null}
        {array[0]?.dp_id === '-1'
          ? null
          : array.map((element: ArticleDto) => {
              const lastEdit = DataController.getTimeAgo(
                new Date(element.dp_date),
              );
              return (
                <Pressable
                  key={element.dp_id}
                  onPress={() => toArticlePage(element.dp_urlSegment)}>
                  <View style={styles.item__block}>
                    <PostImageBlock url={element.dp_photoUrl} />
                    <Text style={styles.item__text}>{element.dp_name}</Text>
                    <Text style={styles.item__lastEdit}>{lastEdit}</Text>
                  </View>
                </Pressable>
              );
            })}
      </View>
    </AppWrapper>
  );
}

export default ArticlesPage;
