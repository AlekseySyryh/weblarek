import { IProduct, ModelEvents } from "../../types";
import { IEvents } from "../base/Events";

export class CatalogModel {
  constructor(private events: IEvents){

  }

  protected _items: IProduct[] = [];
  protected _detailedItem: IProduct | undefined = undefined;
  get products(): IProduct[] {
    return this._items;
  } 
  set products(products: IProduct[]) {
    this._items = products;
    this.events.emit(ModelEvents.productsChanged);
  }

  getProduct(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }
  get productDetailed(): IProduct | undefined {
    return this._detailedItem; 
  }
  set productDetailed(product: IProduct){
    this._detailedItem = product;
    this.events.emit(ModelEvents.productSelected);
  }
}