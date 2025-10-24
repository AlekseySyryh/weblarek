import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface SuccessData {
  total: number;
}

export class SuccessWindow extends Component<SuccessData>{
  private readonly totalElement: HTMLElement;
  private readonly closeButton: HTMLElement;

  constructor(container: HTMLElement, private event: IEvents) {
    super(container);

    this.totalElement = ensureElement<HTMLElement>('.order-success__description', container);

    this.closeButton = ensureElement<HTMLButtonElement>('.button', container);
    this.closeButton.addEventListener('click', () => {
      this.event.emit('success:submit');
    });
  }

  set total(total: number){
    this.totalElement.textContent = `Списано ${total} синапсов`;
  }
}