import {FurnitureType} from "./furniture-type";

export interface Furniture {
  title: string
  form: string
  price: number
  length: number
  width: number
  height: number
  diameter: number
  description: string
  furnitureType: FurnitureType
  priority: number
}
