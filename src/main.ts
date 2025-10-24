import { BasketModel } from './components/Models/basketModel';
import { CatalogModel } from './components/Models/catalogModel';
import { Api } from './components/base/Api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { DataSource } from './components/communication/dataSource';
import { EventEmitter } from './components/base/Events';
import { HeaderView } from './components/Views/headerView';
import { cloneTemplate, ensureElement } from './utils/utils';
import { GalleryView } from './components/Views/galleryView';
import { GalleryCard } from './components/Views/Cards/galleryCard';
import { IProductID } from './components/Views/Cards/baseCard';
import { ModalView } from './components/Views/modalView';
import { ButtonMode, FullCard } from './components/Views/Cards/fullCard';
import { BasketModalContent } from './components/Views/ModalContent/basketModalContent';
import { BasketCard } from './components/Views/Cards/basketCard';
import { OrderFormModalContent } from './components/Views/ModalContent/orderFormModalContent';
import { BuyerModel } from './components/Models/buyerModel';
import { OnChanged } from './components/Views/ModalContent/baseFormModalContent';
import { ContantactsFormModalContent } from './components/Views/ModalContent/contactsFormModalContent';
import { SuccessWindow } from './components/Views/ModalContent/successModalContent';
import { ModelEvents, ViewEvents } from './types';

const api = new Api(API_URL);
const dataSource = new DataSource(api);

const events = new EventEmitter();

const headerView = new HeaderView(ensureElement<HTMLElement>('.header'), events);
const galleryView = new GalleryView(ensureElement<HTMLElement>('.gallery'));
const modalView = new ModalView(ensureElement<HTMLElement>('.modal'), events);

const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketWindowTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const catalogModel = new CatalogModel(events);
const baketModel = new BasketModel(events);
const buyerModel = new BuyerModel(events);

let activeModal : null | 
                  FullCard | 
                  BasketModalContent | 
                  OrderFormModalContent | 
                  ContantactsFormModalContent 
= null;

function renderFullProductWindow() {
  if (activeModal && !(activeModal instanceof FullCard))
  {
    //Уже открыто другое окно
    return;
  }

  const product = catalogModel.productDetailed;
  if (!product) {
    //Продукт не выбран - закрываем если открыли
    modalView.visible = false;
    return;
  }

  if (!activeModal) {
    //Никакое не открыто - открываем
    const cardElement = cloneTemplate<HTMLElement>(previewCardTemplate);
    activeModal = new FullCard(cardElement, events);
    modalView.content = activeModal.render();
  }

  const isInBasket = baketModel.isInBasket(product.id);  
  activeModal.render({
    id: product.id,
    title: product.title,
    imageUrl: `${CDN_URL}/${product.image}`,
    category: product.category,
    price: product.price,
    text: product.description,
    buttonMode: product.price ?
                  isInBasket ? 
                    ButtonMode.remove :
                    ButtonMode.add
                  : ButtonMode.disabled});
    
    modalView.visible = true;
}

function renderBasketWindow() {
  if (activeModal && !(activeModal instanceof BasketModalContent))
  {
    return;//Уже открыто другое окно
  }
  if (!activeModal) {
    //Никакое не открыто - открываем
    const basketWindowElement = cloneTemplate<HTMLElement>(basketWindowTemplate);
    activeModal = new BasketModalContent(basketWindowElement, events);
    modalView.content = activeModal.render();  
  }

  const cards: HTMLElement[] = [];
  for (let ix = 0; ix < baketModel.products.length; ix++) {
    const product = baketModel.products[ix];
    const cardElement = cloneTemplate<HTMLElement>(basketCardTemplate);
    const card = new BasketCard(cardElement, events);
    cards.push(card.render({
      id: product.id,
      index: ix+1,
      price: product.price,
      title: product.title
    }))
  }
  activeModal.render({
    total: baketModel.getTotalPrice(),
    cards: cards
  });
  modalView.visible = true;
}

function renderOrderWindow() {
  if (activeModal && !(activeModal instanceof OrderFormModalContent)){
    return;
  }
  if (!activeModal){
    const orderElement = cloneTemplate<HTMLElement>(orderTemplate);
    activeModal = new OrderFormModalContent(orderElement, events);
    modalView.content = activeModal.render();
  }
  activeModal.render({
    payment: buyerModel.payment,
    address: buyerModel.address,
    validationResult: buyerModel.validate()
  });
  modalView.visible = true;
}

function renderContcatWindow() {
  if (activeModal && !(activeModal instanceof ContantactsFormModalContent)){
    return;
  }
  if (!activeModal) {
    const contactsElement = cloneTemplate<HTMLElement>(contactsTemplate);
    activeModal = new ContantactsFormModalContent(contactsElement, events);
    modalView.content = activeModal.render();
  }
  activeModal.render({
    email: buyerModel.email,
    phone: buyerModel.phone,
    validationResult: buyerModel.validate()
  });
  modalView.visible = true;

}

events.on(ModelEvents.basketChanged, () => {
  headerView.counter = baketModel.getTotalCount();
  if (activeModal instanceof FullCard) {
    renderFullProductWindow();
  } else if (activeModal instanceof BasketModalContent) {
    renderBasketWindow();
  }
});

events.on(ModelEvents.buyerChanged, () => {
  if (activeModal instanceof OrderFormModalContent) {
    renderOrderWindow();
  } else if (activeModal instanceof ContantactsFormModalContent) {
    renderContcatWindow();
  }
});

events.on(ModelEvents.productsChanged, () => {
  const cards : HTMLElement[] = [];
  for (const product of catalogModel.products){
      const cardElement = cloneTemplate<HTMLElement>(catalogTemplate);
      const card = new GalleryCard(cardElement, events).render({
        id: product.id,
        title: product.title,
        imageUrl: `${CDN_URL}/${product.image}`,
        category: product.category,
        price: product.price
      });
      cards.push(card);
  }
  galleryView.cards = cards;
});

events.on(ModelEvents.productSelected, () => {
  renderFullProductWindow();
});

events.on(ViewEvents.headerBasketClick, () => {
  renderBasketWindow();
});

events.on(ViewEvents.modalClose, () => {
    activeModal = null;
    modalView.visible = false;
});

events.on<IProductID>(ViewEvents.basketCardClick, productId => {
  const product = catalogModel.getProduct(productId.id);
  if (product){
    baketModel.deleteProduct(product);
  }
});

events.on<IProductID>(ViewEvents.fullCardClick, productId => {
  const product = catalogModel.getProduct(productId.id);
  if (product){
    if (baketModel.isInBasket(product.id)) {
      baketModel.deleteProduct(product);
    } else {
      baketModel.addProduct(product);
    }
  }
});

events.on<IProductID>(ViewEvents.galleryClick, productId => {
  const product = catalogModel.getProduct(productId.id);
  if (product != null){
    catalogModel.productDetailed = product;
  }
});

events.on<OnChanged>(ViewEvents.inputChanged, changeData => {
  switch (changeData.fieldName) {
    case 'address':
      buyerModel.address = changeData.newValue;
      break;
    case 'payment':
      switch (changeData.newValue){
        case 'card':
        case 'cash':
          buyerModel.payment = changeData.newValue;
          break;
        default:
          throw new Error(`Плохой payment: ${changeData.newValue}`);
      }
      break;
    case 'email':
      buyerModel.email = changeData.newValue;
      break;
    case 'phone':
      buyerModel.phone = changeData.newValue;
      break;
    default:
      throw new Error(`Плохое имя поля: ${changeData.fieldName}`);
  }
});

events.on(ViewEvents.basketSubmit, () => {
  activeModal = null;
  renderOrderWindow();
});

events.on(ViewEvents.orderSubmit, () => {
  activeModal = null;
  renderContcatWindow();
});

events.on(ViewEvents.contactsSubmit, async () => {
  try {
    const result = await dataSource.placeOrder({
      address: buyerModel.address,
      email: buyerModel.email,
      payment: buyerModel.payment,
      phone: buyerModel.phone,
      items: baketModel.products.map(x => x.id),
      total: baketModel.getTotalPrice()
    });
    if (result.error) {
      console.error(`Ошибка при отпраке заказа ${result.error}`);
    } else if (!result.total) {
      console.error('Ошибка при отпраке заказа: нет суммы списания');
    }
    else {
      const successElement = cloneTemplate<HTMLElement>(successTemplate);
      const successWindow = new SuccessWindow(successElement, events);
      modalView.content = successWindow.render({
        total:result.total});
      modalView.visible = true;
      baketModel.clear();
      buyerModel.clear();
    }
  } catch (error){
    console.error(error);
  }});

events.on(ViewEvents.successSubmit, () => {
  modalView.visible = false;
});


try {
  const products = await dataSource.getProducts();
  catalogModel.products = products.items;
} catch (error){
  console.error(error);
};

