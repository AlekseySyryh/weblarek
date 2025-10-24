import { IBuyer, TPayment, IValidationResult } from "../../types";
import { IEvents } from "../base/Events";

export class BuyerModel implements IBuyer {
  private _payment: TPayment = undefined;
  private _email: string = "";
  private _phone: string = "";
  private _address: string = "";
  constructor(private events: IEvents) {}

  set payment(payment: TPayment) {
    this._payment = payment;
    this.events.emit('buyer:changed');
  }
  set address(address: string) {
    this._address = address;
    this.events.emit('buyer:changed');
  }
  set phone(phone: string) {
    this._phone = phone;
    this.events.emit('buyer:changed');
  }
  set email(email: string) {
    this._email = email;
    this.events.emit('buyer:changed');
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
  clear(): void {
    this._payment = undefined;
    this._address = "";
    this._email = "";
    this._phone = "";
    this.events.emit('buyer:changed');
  }
  validate(): IValidationResult {
    return {
      payment: this._payment === undefined ? "Не задан метод оплаты" : null,
      email: this._email === "" ? "Укажите email" : null,
      phone: this._phone === "" ? "Укажите телефон" : null,
      address: this._address === "" ? "Укажите адрес доставки" : null
    }
  }
}