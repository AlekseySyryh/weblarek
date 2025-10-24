import { ensureElement } from "../../../utils/utils";
import { BaseCard, BaseCardData } from "./baseCard";
import { categoryMap } from "../../../utils/constants";
import { IEvents } from "../../base/Events";

export interface ImageCardData extends BaseCardData {
  imageUrl: string;
  category: string;
}

export abstract class ImageCard<T extends ImageCardData> extends BaseCard<T> {
  private readonly _image: HTMLImageElement;
  private readonly _category: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLElement>('.card__category', container);
  }

  set imageUrl(url: string) {
      this.setImage(this._image, url, '');
  }
  
  set category(category: string){
    this._category.textContent = category;
    Object.entries(categoryMap).forEach(([key,value]) => {
      if (category === key){
        this._category.classList.add(value);
      } else {
        this._category.classList.remove(value);
      }
    });
  }
}