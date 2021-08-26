import {AfterContentInit, AfterViewInit, ElementRef, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Song} from "../../interfaces/interfaces";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit , AfterViewInit
{
  @ViewChildren('allItems') buttonElement!: QueryList<ElementRef>;
  @Input() public songs! : Song[] ;

  constructor() { }

  ngOnInit(): void {
  }
  async ngAfterViewInit(): Promise<void>
  {
    this.buttonElement.changes.subscribe(()=>{
      this.buttonElement.forEach((e , i )=>{
        e.nativeElement.onmouseover = ()=>{
          alert(i);
        }
      });
    });
  }

}
