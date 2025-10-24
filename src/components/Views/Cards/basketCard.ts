import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { BaseCard, BaseCardData} from "./baseCard";
import { ButtonOnCard } from "./buttonOnCard";

interface BasketCardData extends BaseCardData {
  index: number;
}

export class BasketCard extends BaseCard<BasketCardData> {
  private readonly indexElement: HTMLElement;
  private readonly deleteButton: ButtonOnCard;

  constructor(container: HTMLElement, events: IEvents){
    super(container, events);
    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container); 
    this.deleteButton = new ButtonOnCard(container, ()=>this.onButtonClick());
    this.deleteButton.text = "";
  }

  private onButtonClick(): void {
    this.emit('basketcard:click');
  }

  set index(index: number) {
    this.indexElement.textContent = `${index}`;
  }
}