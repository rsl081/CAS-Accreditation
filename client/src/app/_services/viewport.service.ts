import { Injectable } from '@angular/core';

function nativeWindow() : any {
  // return the global native browser window object
  return window.innerWidth;
}

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  // 640px is the minimum width for tailwind's sm breakpoint prefix
  smallDevice = 640;
  
  get breakpoint() : string {
    if (nativeWindow() > this.smallDevice){
      return 'desktop';
    }else{
      return 'mobile';
    }
  }
}
