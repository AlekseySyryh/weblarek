export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = 'card' | 'cash' | undefined;

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}


export interface IValidationResult {
  payment: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderData {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
export interface IOrderResult {
  id: string | null;
  total: number | null;
  error: string | null;
}

export interface IDataSource {
  getProducts(): Promise<IProductResponse>;
  placeOrder(data: IOrderData): Promise<IOrderResult>;
}