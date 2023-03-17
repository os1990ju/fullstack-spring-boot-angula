import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso:string[]=['Typescript','javascript','Java SE','C#'];
  mostrar:boolean = true;
  setMostrar():void {
    this.mostrar= (this.mostrar==true)? false:true
  }
  constructor(){

  }
}
