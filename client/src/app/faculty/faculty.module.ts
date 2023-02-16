import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyRestrictedFilesComponent } from './faculty-restricted-files/faculty-restricted-files.component';
import { FacultyRestrictedFileTableComponent } from './faculty-restricted-files/faculty-restricted-file-table/faculty-restricted-file-table.component';
import { FacultyRestrictedFileSearchBarComponent } from './faculty-restricted-files/faculty-restricted-file-search-bar/faculty-restricted-file-search-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FacultyHomeComponent } from './faculty-home/faculty-home.component';
import { FacultyEditProfileComponent } from './faculty-edit-profile/faculty-edit-profile.component';
import { FacultySidebarComponent } from './faculty-sidebar/faculty-sidebar.component';
import { FacultyDashboardComponent } from './faculty-dashboard/faculty-dashboard.component';
import { FacultyAreasComponent } from './faculty-areas/faculty-areas.component';
import { FacultyFilesComponent } from './faculty-files/faculty-files.component';
import { FacultyParametersComponent } from './faculty-parameters/faculty-parameters.component';
import { NavigationService } from 'src/app/_services/navigation.service';
import { ViewportService } from 'src/app/_services/viewport.service';
import { FacultyAreaComponent } from './faculty-areas/faculty-area/faculty-area.component';
import { FacultyParameterComponent } from './faculty-parameters/faculty-parameter/faculty-parameter.component';
import { FacultyLevelsComponent } from './faculty-levels/faculty-levels.component';
import { FacultyLevelComponent } from './faculty-levels/faculty-level/faculty-level.component';
import { FacultySysimpleoutptsComponent } from './faculty-sysimpleoutpts/faculty-sysimpleoutpts.component';
import { FacultySysimpleoutptComponent } from './faculty-sysimpleoutpts/faculty-sysimpleoutpt/faculty-sysimpleoutpt.component';
import { FacultySchemesComponent } from './faculty-schemes/faculty-schemes.component';
import { FacultySchemeComponent } from './faculty-schemes/faculty-scheme/faculty-scheme.component';

@NgModule({
  declarations: [
    FacultyRestrictedFilesComponent,
    FacultyRestrictedFileTableComponent,
    FacultyRestrictedFileSearchBarComponent,
    FacultyHomeComponent,
    FacultyEditProfileComponent,
    FacultySidebarComponent,
    FacultyDashboardComponent,
    FacultyAreasComponent,
    FacultyFilesComponent,
    FacultyParametersComponent,
    FacultyAreaComponent,
    FacultyParameterComponent,
    FacultyLevelsComponent,
    FacultyLevelComponent,
    FacultySysimpleoutptsComponent,
    FacultySysimpleoutptComponent,
    FacultySchemesComponent,
    FacultySchemeComponent,
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    SharedModule
  ],
  exports: [
    FacultySidebarComponent
  ],
  providers: [NavigationService, ViewportService]
})
export class FacultyModule { }
