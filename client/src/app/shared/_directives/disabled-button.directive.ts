import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisabledBtn]'
})
export class DisabledButtonDirective implements OnInit {

  @Input() disabledBackgroundColor: string;
  @Input() enabledBackgroundColor: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.pointerEvents') pointerEvents: string;

  constructor() { }

  ngOnInit(): void { }

  @Input() set appDisabledBtn(condition: boolean){
    if(condition){
      this.backgroundColor = this.disabledBackgroundColor;
      this.pointerEvents = 'none';
    }else{
      this.backgroundColor = this.enabledBackgroundColor;
      this.pointerEvents = 'auto';
    }
  }

}