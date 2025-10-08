import { IProduct } from "../../types";

export class CatalogModel {
  protected _items: IProduct[] = [];
  protected _detailedItem: IProduct | undefined = undefined;
  get products(): IProduct[] {
    return this._items;
  } 
  set products(products: IProduct[]) {
    this._items = products;
  }

  getProduct(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }
  get productDetailed(): IProduct | undefined {
    return this._detailedItem; 
  }
  set productDetailed(product: IProduct){
    this._detailedItem = product;
  }
}