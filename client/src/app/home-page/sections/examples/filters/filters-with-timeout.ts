import {Filters} from "./filters";

export interface FiltersWithTimeout {
  timeout:number
  filters: Filters
}
