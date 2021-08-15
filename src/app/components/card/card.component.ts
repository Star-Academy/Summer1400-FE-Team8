import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Song} from "../../interfaces/interfaces";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit
{

  @Input() public song! : Song ;

  Tamam = () =>

  {
    console.log("Tamam");
  }


  constructor() { }

  ngOnInit(): void {
  }

}
