import { IValidationResult, ViewEvents } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";


export interface BaseFormData {
  validationResult: IValidationResult
};

export interface OnChanged {
  fieldName: string;
  newValue: string;
}

export abstract class BaseFormModalContent<T extends BaseFormData> extends Component<T>{
  private readonly errorElement: HTMLElement;
  private readonly submitButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents, 
    private validationResultSelector: (reuslt:IValidationResult)=>(string|null)[])
    {
      super(container);

      this.errorElement = ensureElement<HTMLElement>('.form__errors', container);

      this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
      
      
      this.container.addEventListener('submit', ev => {
        ev.preventDefault();
        this.submit();
      });
  }

  set validationResult(result: IValidationResult){
    const results = 
      this.validationResultSelector(result).filter(x => x);
    if (results.length > 0){
      this.errorElement.textContent = results.join('. ');
      this.submitButton.disabled = true;
    } else {
      this.errorElement.textContent = "";
      this.submitButton.disabled = false;
    }
  }

  protected onChanged(field: string, newValue: string){
    this.events.emit<OnChanged>(ViewEvents.inputChanged, {fieldName: field, newValue: newValue});
  }

  protected abstract submit(): void;
}