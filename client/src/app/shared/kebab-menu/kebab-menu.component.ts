import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDashboardCard } from '../models/dashboard-card';
import { AreaService } from 'src/app/_services/area.service';
import { LevelService } from 'src/app/_services/level.service';
import { ParameterService } from 'src/app/_services/parameter.service';
import { KeywordService } from 'src/app/_services/keyword.service';

@Component({
  selector: 'app-kebab-menu',
  templateUrl: './kebab-menu.component.html',
  styleUrls: ['./kebab-menu.component.css']
})
export class KebabMenuComponent implements OnInit {

  constructor(
    private renderer: Renderer2, 
    private levelService: LevelService,
    private keywordService: KeywordService,
    private areaService: AreaService,
    private parameterService: ParameterService
  ) { }

  @Input() cardInfo!: IDashboardCard;
  @ViewChild('kebab', {static: true}) kebabMenu!: ElementRef;
  @ViewChild('dropdown', {static: true}) dropdown!: ElementRef;
  baseUrl = environment.apiUrl;
  isKebabActive = false;
  showEditDialog = false;

  ngOnInit(): void {
    this.listenToOutsideClick();
  }

  toggleMenu(): void {
    this.isKebabActive = !this.isKebabActive;
  }

  toggleEditDialog(){
    this.showEditDialog = !this.showEditDialog;
  }

  onEdit(){
    this.toggleEditDialog();
  }

  onDelete(){
    switch(this.cardInfo.type){
      case 'level':
        this.levelService.deleteLevel(this.cardInfo.id).subscribe({
          next: () =>{
            this.levelService.updateNeeded.next();
          }
        });
        break;
      case 'keyword':
        this.keywordService.deleteKeyword(this.cardInfo.id).subscribe({
          next: () =>{
            this.keywordService.updateNeeded.next();
          }
        });
        break;
      case 'area':
        this.areaService.deleteArea(this.cardInfo.id).subscribe({
          next: () =>{
            this.areaService.updateNeeded.next();
          }
        });
        break;
      case 'parameter':
        this.parameterService.deleteParameter(this.cardInfo.id).subscribe({
          next: () =>{
            this.parameterService.updateNeeded.next();
          }
        });
        break;
      default:
        alert('There was a problem proccessing your request');
    }
  }

  deleteErrorCallback(error: any){
    alert(error.message);
  }

  listenToOutsideClick(): void {
     this.renderer.listen('window', 'click',(ev:Event)=>{
      if(ev.target !== this.kebabMenu.nativeElement && ev.target !== this.dropdown.nativeElement){
        this.isKebabActive = false;
      }
    });
  }

}
