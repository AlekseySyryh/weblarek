import { IBuyer, TPayment, IValidationResult } from "../../types";

export class BuyerModel implements IBuyer {
  protected _payment: TPayment = undefined;
  protected _email: string = "";
  protected _phone: string = "";
  protected _address: string = "";
  set payment(payment: TPayment) {
    this._payment = payment;
  }
  set address(address: string) {
    this._address = address;
  }
  set phone(phone: string) {
    this._phone = phone;
  }
  set email(email: string) {
    this._email = email;
  }
  get payment(): TPayment {
    return this._payment;
  }
  get address(): string {
    return this._address;
  }
  get phone(): string {
    return this._phone;
  }
  get email(): string {
    return this._email;
  }
  Clear(): void {
    this._payment = undefined;
    this._address = "";
    this._email = "";
    this._phone = "";
  }
  Validate(): IValidationResult {
    return {
      payment: this._payment === undefined ? "Не задан метод оплаты" : null,
      email: this._email === "" ? "Укажите email" : null,
      phone: this._phone === "" ? "Укажите телефон" : null,
      address: this._address === "" ? "Укажите адрес доставки" : null
    }
  }
}