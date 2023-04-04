import {Subject} from "rxjs";
import {FiltersWithTimeout} from "./filters-with-timeout";

export class Filters {
  private _priceMax?:number
  private _priceMin?:number
  private _forms?: Set<string>
  private _lengthMin?:number
  private _lengthMax?:number
  private _widthMin?:number
  private _widthMax?:number
  private _heightMin?:number
  private _heightMax?:number
  private _diameterMin?:number
  private _diameterMax?:number
  private _furnitureTypeId?:number
  private _inputTimeout: FiltersWithTimeout
  private _zeroTimeout: FiltersWithTimeout

  onChanged: Subject<FiltersWithTimeout> = new Subject<FiltersWithTimeout>()

  constructor() {
    this._furnitureTypeId = 0
    this._forms = new Set<string>(['rectangle', 'round'])
    this._priceMax = undefined
    this._priceMin= undefined
    this._lengthMin= undefined
    this._lengthMax= undefined
    this._widthMin = undefined
    this._widthMax = undefined
    this._heightMin= undefined
    this._heightMax= undefined
    this._diameterMin = undefined
    this._diameterMax = undefined
    this._inputTimeout = { filters: this, timeout: 1000 }
    this._zeroTimeout = { filters: this, timeout: 0 }
  }

  get priceMax(): number | undefined {
    return this._priceMax;
  }

  set priceMax(value: number | undefined ) {
    this._priceMax = value;
    this.onChanged.next(this._inputTimeout)
  }

  get priceMin(): number | undefined  {
    return this._priceMin;
  }

  set priceMin(value: number | undefined) {
    this._priceMin = value;
    this.onChanged.next(this._inputTimeout)
  }

  get lengthMin(): number | undefined {
    return this._lengthMin;
  }

  set lengthMin(value: number | undefined) {
    this._lengthMin = value;
    this.onChanged.next(this._inputTimeout)
  }

  get lengthMax(): number | undefined {
    return this._lengthMax;
  }

  set lengthMax(value: number | undefined) {
    this._lengthMax = value;
    this.onChanged.next(this._inputTimeout)
  }

  get widthMin(): number | undefined {
    return this._widthMin;
  }

  set widthMin(value: number | undefined) {
    this._widthMin = value;
    this.onChanged.next(this._inputTimeout)
  }

  get widthMax(): number | undefined {
    return this._widthMax;
  }

  get forms(): Set<string> | undefined {
    return this._forms;
  }

  set widthMax(value: number | undefined) {
    this._widthMax = value;
    this.onChanged.next(this._inputTimeout)
  }

  get heightMin(): number | undefined {
    return this._heightMin;
  }

  set heightMin(value: number | undefined) {
    this._heightMin = value;
    this.onChanged.next(this._inputTimeout)
  }

  get heightMax(): number | undefined {
    return this._heightMax;
  }

  set heightMax(value: number | undefined) {
    this._heightMax = value;
    this.onChanged.next(this._inputTimeout)
  }

  get diameterMin(): number | undefined {
    return this._diameterMin;
  }

  set diameterMin(value: number | undefined) {
    this._diameterMin = value;
    this.onChanged.next(this._inputTimeout)
  }

  get diameterMax(): number | undefined {
    return this._diameterMax;
  }

  set diameterMax(value: number | undefined) {
    this._diameterMax = value;
    this.onChanged.next(this._inputTimeout)
  }

  get furnitureTypeId(): number | undefined {
    return this._furnitureTypeId;
  }

  set furnitureTypeId(value: number | undefined) {
    this._furnitureTypeId = value;
    this.onChanged.next(this._zeroTimeout)
  }

  public addForm(form:string) {
    this._forms?.add(form)
    this.onChanged.next(this._zeroTimeout)
  }

  public removeForm(form:string) {
    this._forms?.delete(form)
    this.onChanged.next(this._zeroTimeout)
  }

  setDefaults() {
    this._furnitureTypeId = 0
    this._forms = new Set<string>(['rectangle', 'round'])
    this._priceMax = undefined
    this._priceMin= undefined
    this._lengthMin= undefined
    this._lengthMax= undefined
    this._widthMin = undefined
    this._widthMax = undefined
    this._heightMin= undefined
    this._heightMax= undefined
    this._diameterMin = undefined
    this._diameterMax = undefined

    this.onChanged.next(this._zeroTimeout)
  }
}
