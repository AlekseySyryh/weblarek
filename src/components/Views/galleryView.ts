import { Component } from "../base/Component";

interface GalleryData {
  cards: HTMLElement[];
}

export class GalleryView extends Component<GalleryData>{
  
  constructor(container: HTMLElement){
    super(container);
  }
  set cards(data:HTMLElement[]){
    this.container.replaceChildren(...data);
  }
}