import { ViewEvents } from "../../../types";
import { IEvents } from "../../base/Events";
import { ImageCard, ImageCardData } from "./imageCard";

export class GalleryCard extends ImageCard<ImageCardData> {
  constructor(container: HTMLElement, events: IEvents){
    super(container, events);
    container.addEventListener('click', ()=>this.onButtonClick());
  }

  protected onButtonClick(): void {
    this.emit(ViewEvents.galleryClick);
  }
}