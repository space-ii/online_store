import { makeAutoObservable } from "mobx";
import PageStore from "./PageStore"; // импортируем

export default class BrandStore {
  constructor() {
    this._brands = [];
    this._selectedBrand = {};
    this._pageStore = new PageStore(); // создаем экземпляр класса PageStore
    makeAutoObservable(this);
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setSelectedBrand(brand) {
    this._pageStore.setPage(1); // вызываем метод setPage(1) экземпляра класса PageStore
    this._selectedBrand = brand;
  }

  get brands() {
    return this._brands;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }
}
