import { TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { BaseFormData, BaseFormModalContent } from "./baseFormModalContent";

interface OrderFormData extends BaseFormData{
  payment: TPayment,
  address: string
}

export class OrderFormModalContent extends BaseFormModalContent<OrderFormData> {
  private readonly addressElement: HTMLInputElement;
  private readonly cardButton: HTMLButtonElement;
  private readonly cashButton: HTMLButtonElement;
  constructor(container: HTMLElement, events: IEvents){
    super(container, 
      events,
      result => [result.address, result.payment]);

    this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', container);
    this.addressElement.addEventListener('input', () => {
      this.OnChanged('address', this.addressElement.value);
    } );

    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', container);
    this.cardButton.addEventListener('click', () => {
      this.OnChanged('payment', 'card');
    });

    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
    this.cashButton.addEventListener('click', () => {
      this.OnChanged('payment', 'cash');
    });
  }

  set address(address: string) {
    this.addressElement.textContent = address;
  }

  set payment(payment: TPayment) {
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');

    switch (payment){
      case 'card':
        this.cardButton.classList.add('button_alt-active');
        break;
      case 'cash':
        this.cashButton.classList.add('button_alt-active');
        break;
    }
  }

  protected Submit(): void {
      this.events.emit('order:submit');
  }
}