import { getDebugName, makeAutoObservable } from "mobx";
import { useEffect } from "react";
import PageStore from "./PageStore";

export default class TypeStore {
  constructor() {
    this._types = [];
    this._selectedType = {};
    this._pageStore = new PageStore();
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setSelectedType(type) {
    this._pageStore.setPage(1);
    this._selectedType = type;
  }

  get types() {
    return this._types;
  }

  get selectedType() {
    return this._selectedType;
  }
}
