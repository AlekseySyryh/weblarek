import { ViewEvents } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ModalData {
  content: HTMLElement;
  visible: boolean;
}

export class ModalView extends Component<ModalData> {
  private readonly closeButton: HTMLButtonElement;
  private readonly contentElement: HTMLElement;
  constructor(container: HTMLElement, private events: IEvents){
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close');
    this.closeButton.addEventListener('click', ()=> this.visible=false);

    this.contentElement = ensureElement<HTMLElement>('.modal__content');

    this.container.addEventListener('click', ev => {
      if(ev.target == this.container){
        this.visible = false;
      }
    });
  }

  set visible(isVisible: boolean){
    if (isVisible){
      if (!this.container.classList.contains('modal_active')) {
        this.container.classList.add('modal_active');
      }
    } else {
      if (this.container.classList.contains('modal_active')) {
        this.container.classList.remove('modal_active');
        this.events.emit(ViewEvents.modalClose);
      }
    }
  }

  set content(content: HTMLElement) {
    this.contentElement.replaceChildren(content);
  }
}