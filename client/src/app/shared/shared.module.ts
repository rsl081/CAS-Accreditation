import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAddCardComponent } from './dashboard-add-card/dashboard-add-card.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { OverlayComponent } from './overlay/overlay.component';
import { KebabMenuComponent } from './kebab-menu/kebab-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardEditDialogComponent } from './dashboard-edit-dialog/dashboard-edit-dialog.component';
import { DisabledButtonDirective } from './_directives/disabled-button.directive';
import { SelectableCardComponent } from './selectable-card/selectable-card.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardMetricsCardComponent } from './dashboard-metrics-card/dashboard-metrics-card.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileTableRowComponent } from './file-table-row/file-table-row.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { EditFileDialogComponent } from './edit-file-dialog/edit-file-dialog.component';
import { EditProfileComponent } from './image-uploader/edit-profile.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AlertMessageComponent } from './alert-message/error-alert-message.component';
import { FileTableComponent } from './file-table/file-table.component';
import { MoveFileDialogComponent } from './move-file-dialog/move-file-dialog.component';
import { FileSortButtonGroupComponent } from './file-sort-button-group/file-sort-button-group.component';
import { FacultyTableComponent } from './faculty-table/faculty-table.component';
import { FacultyTableRowComponent } from './faculty-table-row/faculty-table-row.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AlertMessageComponent,
    DashboardCardComponent,
    DashboardAddCardComponent,
    BreadcrumbComponent,
    HamburgerMenuComponent,
    DashboardDialogComponent,
    OverlayComponent,
    KebabMenuComponent,
    DashboardEditDialogComponent,
    DisabledButtonDirective,
    SelectableCardComponent,
    TextInputComponent,
    PageNotFoundComponent,
    DashboardMetricsCardComponent,
    FileTableRowComponent,
    EmailConfirmationComponent,
    FileUploaderComponent,
    EditFileDialogComponent,
    EditProfileComponent,
    SearchBarComponent,
    FileTableComponent,
    MoveFileDialogComponent,
    FileSortButtonGroupComponent,
    FacultyTableComponent,
    FacultyTableRowComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FileUploadModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertMessageComponent,
    DashboardAddCardComponent,
    DashboardCardComponent,
    BreadcrumbComponent,
    HamburgerMenuComponent,
    DashboardDialogComponent,
    OverlayComponent,
    KebabMenuComponent,
    DashboardEditDialogComponent,
    DisabledButtonDirective,
    SelectableCardComponent,
    TextInputComponent,
    PageNotFoundComponent,
    DashboardMetricsCardComponent,
    FileUploadModule,
    FileTableRowComponent,
    FileUploaderComponent,
    EditFileDialogComponent,
    EditProfileComponent,
    SearchBarComponent,
    FileTableComponent,
    MoveFileDialogComponent,
    FileSortButtonGroupComponent,
    FacultyTableComponent,
    FacultyTableRowComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
