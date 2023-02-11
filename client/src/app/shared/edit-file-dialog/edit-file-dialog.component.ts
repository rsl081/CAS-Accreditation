import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayService } from 'src/app/_services/overlay.service';
import { IFile } from '../models/file';

@Component({
  selector: 'app-edit-file-dialog',
  templateUrl: './edit-file-dialog.component.html',
  styleUrls: ['./edit-file-dialog.component.css']
})
export class EditFileDialogComponent implements OnInit {

  @Input() file: IFile;
  @Output() dialogClosed = new EventEmitter<void>();
  
  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
    // notify home component that the overlay is active 
    this.overlayService.showOverlay.emit();
  }

  closeDialog(){
    this.dialogClosed.emit();
    // notify home component that the overlay is inactive
    this.overlayService.hideOverlay.emit();
  }

}