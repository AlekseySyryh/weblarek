import { IProduct, ModelEvents } from "../../types"
import { IEvents } from "../base/Events";

export class BasketModel {
  private _products: IProduct[] = [];  

  constructor(private events:IEvents){ }

  get products(): IProduct[] {
    return this._products;
  }
  addProduct(product: IProduct): void {
    this._products.push(product);
    this.events.emit(ModelEvents.basketChanged);
  }
  deleteProduct(product: IProduct): void {
    this._products = this._products.filter(x => x.id !== product.id);
    this.events.emit(ModelEvents.basketChanged);
  }
  clear(): void {
    this._products = [];
    this.events.emit(ModelEvents.basketChanged);
  }
  getTotalPrice(): number {
    return this._products.reduce((total, item) => total + (item.price ?? 0), 0);
  }
  getTotalCount(): number {
    return this._products.length;
  }
  isInBasket(id: string): boolean {
    return this._products.some(item => item.id === id);
  }
}