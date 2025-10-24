import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

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
      this.events.emit('header:basketclick')
    );
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}