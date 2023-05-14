import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Pressable, RefreshControl, Linking} from 'react-native';

import styles from './ArticlePageStyles';
import AlertExceptionHelper, {
  AsyncAlertExceptionHelper,
} from '../../utils/AlertExceptionHelper';
import ContactPosts from './ContactPosts/ContactPosts';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import AppWrapper from './../../components/AppWrapper/AppWrapper';
import RootStackParamList from '../../navigation/RootStackParamList';
import FetchArticles from '../../utils/FetchBackend/rest/api/articles/index';
import FetchHelpers from './../../utils/FetchBackend/rest/api/helpers/index';
import PostImageBlock from './../../components/PostImageBlock/PostImageBlock';
import FetchCommunicationTypes from '../../utils/FetchBackend/rest/api/contact-types/index';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticlePage'>;

function ArticlePage(props: Props): JSX.Element {
  const route = useRoute();
  const params: any = route.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [articleData, setArticleDate] = useState({
    dp_id: '',
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
  });
  const [contacts, setContacts] = useState([
    {
      dp_id: '',
      dp_sortingIndex: 0,
      dp_name: '',
      dp_description: '',
      dp_isHidden: false,
      dp_helperContactTypes: [
        {
          dp_id: -1,
          dp_helperId: '',
          dp_contactTypeId: 0,
          dp_value: '',
          dp_isHidden: false,
        },
      ],
    },
  ]);
  const [communicationTypes, setCommunicationTypes] = useState([
    {
      dp_id: 0,
      dp_name: '',
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
      const data = await FetchArticles.getByUrl(params.url);

      if (params.url === 'contacts') {
        setContacts(await FetchHelpers.getAll());
        setCommunicationTypes(await FetchCommunicationTypes.getAll());
      }

      setArticleDate(data);
      props.navigation.setOptions({title: data.dp_name});
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  async function openLink(url: string) {
    try {
      await Linking.openURL(url);
    } catch (exception) {
      AlertExceptionHelper(exception);
    }
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      {params.url !== 'contacts' ? null : (
        <ContactPosts
          contacts={contacts}
          communicationTypes={communicationTypes}
        />
      )}
      <View style={styles.items}>
        {articleData.dp_articleAttachedLinks[0]?.dp_id === -1
          ? null
          : articleData.dp_articleAttachedLinks.map(e => {
              return (
                <Pressable
                  key={e.dp_id}
                  style={styles.item__block}
                  onPress={() => openLink(e.dp_url)}>
                  <PostImageBlock url="" iconName="external-link" height={64} />
                  <Text style={styles.item__text}>{e.dp_name}</Text>
                </Pressable>
              );
            })}
      </View>
    </AppWrapper>
  );
}

export default ArticlePage;
