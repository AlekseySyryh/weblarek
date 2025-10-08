import { BasketModel } from './components/Models/basketModel';
import { BuyerModel } from './components/Models/buyerModel';
import { CatalogModel } from './components/Models/catalogModel';
import { Api } from './components/base/Api';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { DataSource } from './components/communication/dataSource';

let catalog = new CatalogModel();
catalog.products = apiProducts.items;

console.log(`Товары из каталога: ${catalog.products.map(x => JSON.stringify(x))}`);

console.log(`Выбран товар ${catalog.productDetailed}`);

let prod = catalog.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
if (prod !== undefined) {
  catalog.productDetailed = prod;
}

console.log(`Выбран товар ${JSON.stringify(catalog.productDetailed)}`);

let basket = new BasketModel();
console.log("Корзина пуста");
if (prod != undefined) {
  console.log(`Выбранный товар в корзине? ${basket.isInBasket(prod.id)}`);
}
console.log("Заполняем корзину");
for (let prod of catalog.products){
  basket.addProduct(prod);
}
if (prod != undefined) {
  console.log(`Выбранный товар в корзине? ${basket.isInBasket(prod.id)}`);
}
console.log(`Всего ${basket.getTotalCount()} товаров на сумму ${basket.getTotalPrice()}`);



let buyer = new BuyerModel();
console.log(`Результат 1 валидации ${JSON.stringify(buyer.validate())}`);
buyer.address = "1";
buyer.email = "2";
buyer.phone = "3";
buyer.payment = "card";
console.log(`Результат 2 валидации ${JSON.stringify(buyer.validate())}`);
buyer.clear();
console.log(`Результат 3 валидации ${JSON.stringify(buyer.validate())}`);

let api = new Api(API_URL);
let dataSource = new DataSource(api);
let products = await dataSource.getProducts();
console.log(`API вернул ${products.total} продуктов: ${JSON.stringify(products.items)}`);