import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { ViewEvents } from "../../types";

interface HeaderData {
  counter: number;
}

export class HeaderView extends Component<HeaderData> {
  private readonly basketButtonElement: HTMLButtonElement;
  private readonly counterElement: HTMLElement;

  constructor(container: HTMLElement, private readonly events: IEvents) {
    super(container);
    
    this.basketButtonElement = ensureElement<HTMLButtonElement>(
      '.header__basket', container);
    this.counterElement = ensureElement<HTMLElement>(
      '.header__basket-counter', container);
      
    this.basketButtonElement.addEventListener('click', () =>
      this.events.emit(ViewEvents.headerBasketClick)
    );
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}