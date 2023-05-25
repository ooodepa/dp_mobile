import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ItemPage from '../screens/ItemPage/ItemPage';
import RootStackParamList from './RootStackParamList';
import ItemsPage from '../screens/ItemsPage/ItemsPage';
import AboutPage from '../screens/AboutPage/AboutPage';
import LoginPage from '../screens/LoginPage/LoginPage';
import OrderPage from '../screens/OrderPage/OrderPage';
import BasketPage from '../screens/BasketPage/BasketPage';
import OrdersPage from '../screens/OrdersPage/OrdersPage';
import AccountPage from '../screens/AccountPage/AccountPage';
import ArticlePage from '../screens/ArticlePage/ArticlePage';
import SessionsPage from '../screens/SessionsPage/SessionsPage';
import FavoritePage from '../screens/FavoritePage/FavoritePage';
import ArticlesPage from '../screens/ArticlesPage/ArticlesPage';
import ItemBrandsPage from '../screens/ItemBrandsPage/ItemBrandsPage';
import ResultSearchPage from '../screens/ResultSearchPage/ResultSearchPage';
import RegistrationPage from '../screens/RegistrationPage/RegistrationPage';
import ForgetPasswordPage from '../screens/ForgetPasswordPage/ForgetPasswordPage';
import ItemCategoriesPage from '../screens/ItemCategoriesPage/ItemCategoriesPage';
import EnvPage from '../screens/EnvPage/EnvPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Корзина"
        screenOptions={{
          tabBarStyle: {
            paddingBottom: 4,
          },
          tabBarActiveTintColor: '#06c',
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeTab}
          options={{
            // title: 'Главная',
            tabBarLabel: 'Главная',
            tabBarIcon: HomeIcon,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ArticlesScreen"
          component={ArticlesTab}
          options={{
            // title: 'News',
            tabBarLabel: 'Новости',
            tabBarIcon: ArticleIcon,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="BasketTab"
          component={BasketTab}
          options={{
            // title: 'Корзина',
            tabBarLabel: 'Корзина',
            tabBarIcon: BasketIcon,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountTab}
          options={{
            // title: 'Аккаунт',
            tabBarLabel: 'Аккаунт',
            tabBarIcon: AccountIcon,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Icons

interface IIconProps {
  color: string;
  size: number;
}

function HomeIcon(props: IIconProps) {
  return <Icon name="home" color={props.color} size={props.size} />;
}

function ArticleIcon(props: IIconProps) {
  return <Icon name="newspaper-o" color={props.color} size={props.size} />;
}

function BasketIcon(props: IIconProps) {
  return <Icon name="shopping-basket" color={props.color} size={props.size} />;
}

function AccountIcon(props: IIconProps) {
  return <Icon name="user" color={props.color} size={props.size} />;
}

// Tabs

function HomeTab(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ItemBrandsPage"
        component={ItemBrandsPage}
        options={{title: 'Главная', headerShown: false}}
      />
      <Stack.Screen
        name="ItemCategoriesPage"
        component={ItemCategoriesPage}
        options={{title: 'Категории номенклатуры'}}
      />
      <Stack.Screen
        name="ItemsPage"
        component={ItemsPage}
        options={{title: 'Список номенлатуры'}}
      />
      <Stack.Screen
        name="ItemPage"
        component={ItemPage}
        options={{title: 'Номенклатура'}}
      />
      <Stack.Screen
        name="ResultSearchPage"
        component={ResultSearchPage}
        options={{title: 'Поиск номенклатуры'}}
      />
    </Stack.Navigator>
  );
}

function ArticlesTab(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticlesPage"
        component={ArticlesPage}
        options={{
          // title: 'News',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ArticlePage"
        component={ArticlePage}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

function BasketTab(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BasketPage"
        component={BasketPage}
        options={{title: 'Главная', headerShown: false}}
      />
      <Stack.Screen
        name="ItemPage"
        component={ItemPage}
        options={{title: 'Номенклатура'}}
      />
    </Stack.Navigator>
  );
}

function AccountTab(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountPage"
        component={AccountPage}
        options={{title: 'Аккаунт', headerShown: false}}
      />
      <Stack.Screen
        name="AboutPage"
        component={AboutPage}
        options={{title: 'О приложении'}}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          title: 'Аутентификация',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegistrationPage"
        component={RegistrationPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPasswordPage"
        component={ForgetPasswordPage}
        options={{title: 'Забыли пароль?'}}
      />
      <Stack.Screen
        name="ArticlePage"
        component={ArticlePage}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="SessionsPage"
        component={SessionsPage}
        options={{
          title: 'Устройства',
        }}
      />
      <Stack.Screen
        name="FavoritePage"
        component={FavoritePage}
        options={{
          title: 'Избранные',
        }}
      />
      <Stack.Screen
        name="ItemPage"
        component={ItemPage}
        options={{
          title: 'Номенклатура',
        }}
      />
      <Stack.Screen
        name="OrdersPage"
        component={OrdersPage}
        options={{
          title: 'Мои заказы',
        }}
      />
      <Stack.Screen
        name="OrderPage"
        component={OrderPage}
        options={{
          title: 'Мой заказ',
        }}
      />
      <Stack.Screen
        name="EnvPage"
        component={EnvPage}
        options={{
          title: 'ENV',
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
