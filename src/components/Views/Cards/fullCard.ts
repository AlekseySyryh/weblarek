import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { ButtonOnCard } from "./buttonOnCard";
import { ImageCard, ImageCardData } from "./imageCard";

export enum ButtonMode {
  add,
  remove,
  disabled
}

interface FullCardData extends ImageCardData {
  buttonMode: ButtonMode;
  text: string;
}

export class FullCard extends ImageCard<FullCardData> {
  private readonly textElement: HTMLElement;
  private readonly button: ButtonOnCard;

  constructor(container: HTMLElement, events: IEvents){
      super(container, events);
  
      this.textElement = ensureElement<HTMLElement>('.card__text', container);

      this.button = new ButtonOnCard(container, ()=>this.onButtonClick());

      this.buttonMode = ButtonMode.add;
    }

    protected onButtonClick(): void {
      this.emit('fullcard:click');
    }

    set buttonMode(buttonMode: ButtonMode) {
      switch (buttonMode){
        case ButtonMode.add:
          this.button.text = 'В корзину';
          this.button.enabled = true;
          break;
        case ButtonMode.remove:
          this.button.text = 'Удалить из корзины';
          this.button.enabled = true;
          break;
        case ButtonMode.disabled:
          this.button.text = 'Недоступно';
          this.button.enabled = false;
          break;
      }
    }

    set text(text: string) {
      this.textElement.textContent = text;
    }
}