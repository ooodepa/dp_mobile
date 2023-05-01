import MyLocalStorage from './../MyLocalStorage/MyLocalStorage';
import ItemShortDto from '../FetchBackend/rest/api/items/dto/ItemShortDto';

interface IBasketItem {
  dp_id: string;
  dp_model: string;
  dp_name: string;
  dp_img: string;
  dp_cost: number;
  dp_count: number;
}

class Basket {
  static async getBasket() {
    let stringBasket = await MyLocalStorage.getItem('dp_basket');

    if (!stringBasket) {
      await MyLocalStorage.setItem('dp_basket', JSON.stringify({}));
      stringBasket = await MyLocalStorage.getItem('dp_basket');
    }

    const basket = JSON.parse(stringBasket as string);

    return basket;
  }

  static async getModels() {
    const basket: any = await Basket.getBasket();
    const models = Object.keys(basket);
    return models;
  }

  static async plus(model: string) {
    const basket = await Basket.getBasket();

    let count = model in basket ? Number(basket[model]) : 0;

    count += 1;

    basket[model] = count;

    await MyLocalStorage.setItem('dp_basket', JSON.stringify(basket));
  }

  static async minus(model: string) {
    const basket = await Basket.getBasket();

    let count = model in basket ? Number(basket[model]) : 0;

    count -= 1;

    count = count <= 0 ? 0 : count;

    basket[model] = count;

    if (count <= 0) {
      delete basket[model];
    }

    await MyLocalStorage.setItem('dp_basket', JSON.stringify(basket));
  }

  static async getCount(model: string) {
    const basket = await Basket.getBasket();

    if (!basket[model]) {
      return 0;
    }

    return basket[model];
  }

  static async setCount(model: string, count: number) {
    if (count <= 0) {
      return;
    }

    const basket = await Basket.getBasket();
    basket[model] = count;

    await MyLocalStorage.setItem('dp_basket', JSON.stringify(basket));
  }

  static async getBasketArray(
    products: ItemShortDto[],
  ): Promise<IBasketItem[]> {
    const basket = await Basket.getBasket();
    const keys = Object.keys(basket);

    let arr: IBasketItem[] = [];

    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const value = basket[key];

      const model = key;
      const count = value;

      for (let j = 0; j < products.length; ++j) {
        if (model === products[j].dp_model) {
          arr.push({
            dp_id: products[j].dp_id,
            dp_model: model,
            dp_name: products[j].dp_name,
            dp_img: products[j].dp_photoUrl,
            dp_cost: products[j].dp_cost,
            dp_count: count,
          });
          break;
        }
      }
    }

    return arr;
  }
}

export default Basket;
