import {FurnitureType} from "./furniture-type";
import {Image} from "./image";

export interface Furniture {
  title: string
  form: string
  images: Image[]
  price: number
  length: number
  width: number
  height: number
  diameter: number
  description: string
  furnitureType: FurnitureType
  priority: number
}
