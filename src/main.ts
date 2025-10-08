import { BasketModel } from './components/Models/basketModel';
import { BuyerModel } from './components/Models/buyerModel';
import { CatalogModel } from './components/Models/catalogModel';
import { Api } from './components/base/Api';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { DataSource } from './components/communication/dataSource';

let catalog = new CatalogModel();
catalog.Products = apiProducts.items;

console.log(`Товары из каталога: ${catalog.Products.map(x => JSON.stringify(x))}`);

console.log(`Выбран товар ${catalog.ProductDetailed}`);

let prod = catalog.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
if (prod !== undefined) {
  catalog.ProductDetailed = prod;
}

console.log(`Выбран товар ${JSON.stringify(catalog.ProductDetailed)}`);

let basket = new BasketModel();
for (let prod of catalog.Products){
  basket.addProduct(prod);
}
console.log(`Всего ${basket.getTotalCount()} товаров на сумму ${basket.getTotalPrice()}`);

let buyer = new BuyerModel();
console.log(`Результат 1 валидации ${JSON.stringify(buyer.Validate())}`);
buyer.address = "1";
buyer.email = "2";
buyer.phone = "3";
buyer.payment = "card";
console.log(`Результат 2 валидации ${JSON.stringify(buyer.Validate())}`);
buyer.Clear();
console.log(`Результат 3 валидации ${JSON.stringify(buyer.Validate())}`);

let api = new Api(API_URL);
let dataSource = new DataSource(api);
let products = await dataSource.getProducts();
console.log(`API вернул продукты ${products.total} продуктов: ${JSON.stringify(products.items)}`);