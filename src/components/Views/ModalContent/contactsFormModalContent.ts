import { ViewEvents } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { BaseFormData, BaseFormModalContent } from "./baseFormModalContent";

interface ContantactsFormData extends BaseFormData {
  email: string;
  phone: string;
}

export class ContantactsFormModalContent extends BaseFormModalContent<ContantactsFormData> {
  private readonly emailElement: HTMLInputElement;
  private readonly phoneElement: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents)
  {
    super(container, events, result => [result.email, result.phone]);

    this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', container);
    this.emailElement.addEventListener('input', () => {
      this.onChanged('email', this.emailElement.value);
    })

    this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', container);
    this.phoneElement.addEventListener('input', () => {
      this.onChanged('phone', this.phoneElement.value);
    })
  }
  
  set email(email: string){
    this.emailElement.value = email;
  }

  set phone(phone: string) {
    this.phoneElement.value = phone;
  }

  protected submit(): void {
    this.events.emit(ViewEvents.contactsSubmit);
  }
}