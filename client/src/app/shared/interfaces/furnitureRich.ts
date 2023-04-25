import {Image} from "./image";
import {Furniture} from "./furniture";

export interface FurnitureRich extends Furniture {
  id?: number
  images: Image[]
}
