import { IProduct } from "../../types"

export class BasketModel {
  protected _products: IProduct[] = [];  

  get products(): IProduct[] {
    return this._products;
  }
  addProduct(product: IProduct): void {
    this._products.push(product);
  }
  deleteProduct(product: IProduct): void {
    this._products = this._products.filter(x => x.id !== product.id);
  }
  clear(): void {
    this._products = [];
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