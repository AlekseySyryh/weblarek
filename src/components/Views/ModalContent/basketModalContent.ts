import { ViewEvents } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface BasketData {
  total: number;
  cards: HTMLElement[];
}

export class BasketModalContent extends Component<BasketData> {
  private readonly submitButton: HTMLButtonElement;
  private readonly contentElement: HTMLElement;
  private readonly totalElement: HTMLElement;
  constructor(container: HTMLElement, events: IEvents){
    super(container);
    
    this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', container);
    this.submitButton.addEventListener('click', () => {
      events.emit(ViewEvents.basketSubmit);
    })

    this.contentElement = ensureElement<HTMLElement>('.basket__list', container);
    
    this.totalElement = ensureElement<HTMLElement>('.basket__price', container);
  }

  set total(total: number){
    this.totalElement.textContent = `${total} синапсов`;
  }

  set cards(cards: HTMLElement[]) {
    if (cards.length > 0) {
      this.contentElement.classList.remove('basket__list-disabled');
      this.contentElement.replaceChildren(...cards);
      this.submitButton.disabled = false;
    } else {
      this.contentElement.classList.add('basket__list-disabled');
      this.contentElement.replaceChildren(document.createTextNode("Корзина пуста"));
      this.submitButton.disabled = true;
    }
  }

}