import {Injectable} from '@angular/core';

@Injectable()
export class InfoData {
  koridor1;

  constructor() {

    this.koridor1 = [
      {
        id : 0,
        name : "GWW",
      },
      {
        id : 1,
        name : "BERLIN",
      },
      {
        id : 2,
        name : "MIPA",
      },
      {
        id : 3,
        name : "ASTRI",
      },
      {
        id : 4,
        name : "TANOTO",
      },
      {
        id : 5,
        name : "MENWA",
      },
      {
        id : 6,
        name : "FAHUTAN",
      },
      {
        id : 7,
        name : "ASRAMA INTER",
      },
      {
        id : 8,
        name : "ALHURR",
      },
      {
        id : 9,
        name : "GOR",
      },
      {
        id : 10,
        name : "FPIK",
      },
      {
        id : 11,
        name : "FKH",
      }
    ];

  }

  getData(){
    return this.koridor1;
  }



}
