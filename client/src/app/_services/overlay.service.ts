import { EventEmitter, Injectable,} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  showOverlay = new EventEmitter<void>();
  hideOverlay = new EventEmitter<void>();
  
  constructor() { }

}
