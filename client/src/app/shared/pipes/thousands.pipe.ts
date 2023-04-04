import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})
export class ThousandsPipe implements PipeTransform {

  transform(value: number): string {
    var arr = value.toString().split("");
    let string = "";
    let count = 0;
    for(let i=arr.length-1; i>=0; i--){
      if(count<3){
        string =  arr[i] + string;
        count = count+1;
      }
      else{
        string = " " + string;
        count=0;
        i=i+1;
      }
    }

    return string
  }
}
