import { IProduct } from "../../types";

export class CatalogModel {
  protected _items: IProduct[] = [];
  protected _detailedItem: IProduct | undefined = undefined;
  get Products(): IProduct[] {
    return this._items;
  } 
  set Products(products: IProduct[]) {
    this._items = products;
  }

  getProduct(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }
  get ProductDetailed(): IProduct | undefined {
    return this._detailedItem; 
  }
  set ProductDetailed(product: IProduct){
    this._detailedItem = product;
  }
}