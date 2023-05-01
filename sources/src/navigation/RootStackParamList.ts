type RootStackParamList = {
  AboutPage: undefined;
  AccountPage: undefined;
  ArticlePage: {
    url?: string;
    // dp_id?: string;
  };
  ArticlesPage: undefined;
  BasketPage: undefined;
  FavoritePage: undefined;
  ForgetPasswordPage: undefined;
  ItemBrandsPage: undefined;
  ItemCategoriesPage: {
    brand?: string;
    // dp_itemBrandId?: number;
  };
  ItemPage: {
    dp_id: string;
    // dp_itemCategoryId: number;
    // dp_model: string;
  };
  ItemsPage: {
    category?: string;
    // dp_itemCategoryId?: number;
  };
  LoginPage: undefined;
  RegistrationPage: undefined;
  ResultSearchPage: {
    search: string;
  };
  SessionsPage: undefined;
};

export default RootStackParamList;
