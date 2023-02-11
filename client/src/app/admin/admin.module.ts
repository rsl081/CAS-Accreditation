import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFilesComponent } from './admin-files/admin-files.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLevelsComponent } from './admin-levels/admin-levels.component';
import { AdminCreateAccountComponent } from './admin-create-account/admin-create-account.component';
import { AdminEditProfileComponent } from './admin-edit-profile/admin-change-pass.component';
import { AdminSummaryGenComponent } from './admin-summary-gen/admin-summary-gen.component';
import { AdminAreasComponent } from './admin-areas/admin-areas.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';
import { NavigationService } from 'src/app/_services/navigation.service';
import { ViewportService } from 'src/app/_services/viewport.service';
import { OverlayService } from 'src/app/_services/overlay.service';
import { AdminLevelComponent } from './admin-levels/admin-level/admin-level.component';
import { AdminAreaComponent } from './admin-areas/admin-area/admin-area.component';
import { AdminParameterComponent } from './admin-parameters/admin-parameter/admin-parameter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminFacultyRegSelectAreaComponent } from './admin-faculty-reg-select-area/admin-faculty-reg-select-area.component';
import { AdminFacultyRegSummaryComponent } from './admin-faculty-reg-summary/admin-faculty-reg-summary.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminLevelsComponent,
    AdminFilesComponent,
    AdminHomeComponent,
    AdminCreateAccountComponent,
    AdminEditProfileComponent,
    AdminSummaryGenComponent,
    AdminAreasComponent,
    AdminSidebarComponent,
    AdminParametersComponent,
    AdminLevelComponent,
    AdminAreaComponent,
    AdminParameterComponent,
    AdminFacultyRegSelectAreaComponent,
    AdminFacultyRegSummaryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NavigationService, ViewportService, OverlayService],
  exports: [
    AdminHomeComponent,
  ],
})

export class AdminModule {}
