import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IArea } from '../models/area';

@Component({
  selector: 'app-selectable-card',
  templateUrl: './selectable-card.component.html',
  styleUrls: ['./selectable-card.component.css']
})
export class SelectableCardComponent implements OnInit {

  @Input() areaInfo!: IArea;
  @Output() cardSelected = new EventEmitter<IArea>();
  @Output() cardUnselected = new EventEmitter<IArea>();
  @ViewChild('card', {static: true}) card!: ElementRef;
  @HostBinding('style.backgroundColor') bg?: string;
  wasSelected = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onSelect(){
    if(!this.wasSelected){
      this.setSelectedStyle();
      this.wasSelected = true;
      this.cardSelected.emit(this.areaInfo);
    }else{
      this.setDefaultStyle();
      this.wasSelected = false;
      this.cardUnselected.emit(this.areaInfo);
    }
  }

  setDefaultStyle(){
    this.renderer.setStyle(this.card.nativeElement, 'backgroundColor', '#ffedd5');
    this.renderer.setStyle(this.card.nativeElement, 'border', '1px solid #f96332');
    this.renderer.setStyle(this.card.nativeElement, 'color', '#f96332');
  }

  setSelectedStyle(){
    this.renderer.setStyle(this.card.nativeElement, 'backgroundColor', '#f96332');
    this.renderer.setStyle(this.card.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.card.nativeElement, 'color', '#ffffff');
  }

}