import { IApi, IDataSource, IOrderData, IOrderResult, IProductResponse } from "../../types";

export class DataSource implements IDataSource {
  protected _api: IApi;
  constructor (api: IApi) {
    this._api = api;
  }
  async getProducts(): Promise<IProductResponse> {
    return await this._api.get<IProductResponse>('/product/');
  }
  async placeOrder(data: IOrderData): Promise<IOrderResult>{
    return await this._api.post<IOrderResult>('/order/', data);
  }

}