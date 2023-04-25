import {Injectable} from "@angular/core";
import {FurnitureRich} from "../interfaces/furnitureRich";

@Injectable()
export class Utils {
  public createRange(length: number): number[] {
    let array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = i
    }
    return array
  }

  public getMock():FurnitureRich {
    return {
      id: 0,
      title: "Стол прямоугольный Заглушка",
      description: "",
      form: "Прямоугольный",
      price: 28000,
      priority: 1,
      length: 160,
      width: 80,
      height: 50,
      diameter: 0,
      furnitureType: {id: 1, name: ""},
      images: [
        {
          link: "https://drive.google.com/uc?export=view&id=1xbSbrtD01j_jz97XQiGuiX_3zaZ9FJSi",
          isThumbnail: true
        }]}
  }
}
