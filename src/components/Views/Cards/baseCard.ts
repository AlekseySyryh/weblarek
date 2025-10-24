import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface BaseCardData {
  id: string;
  title: string;
  price: number | null;
}

export interface IProductID {
  id: string;
}

export abstract class BaseCard<T extends BaseCardData> extends Component<T> {
  private readonly titleElement: HTMLElement;
  private readonly priceElement: HTMLElement;
  private idValue: string | null;

  constructor(container: HTMLElement, private readonly events: IEvents) {
    super(container);
    
      this.titleElement = ensureElement<HTMLElement>('.card__title', container);
      this.priceElement = ensureElement<HTMLElement>('.card__price', container);
      this.idValue = null;
  }

  protected emit(message: string) {
    if (this.idValue){
        this.events.emit<IProductID>(message, { id: this.idValue });
    }
  }

  set id(id: string){
    this.idValue = id;
  }

  set title(title: string) {
    this.titleElement.textContent = title;
  }

  set price(price: number | null) {
    this.priceElement.textContent = 
      price === null ?
        'Бесценно' :
        `${price} синапсов`;
  }
}

