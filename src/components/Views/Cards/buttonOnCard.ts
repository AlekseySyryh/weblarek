import { ensureElement } from "../../../utils/utils";

export class ButtonOnCard {
   private readonly buttonElement: HTMLButtonElement;
   constructor(container: HTMLElement, callback: ()=>void) {
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);
    this.buttonElement.addEventListener('click', () => callback());
   }

   set text(text: string) {
    this.buttonElement.textContent = text;
   }

   set enabled(enabled: boolean) {
    this.buttonElement.disabled = !enabled;
   }
}