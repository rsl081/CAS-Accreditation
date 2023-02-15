import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccreditorRoutingModule } from './accreditor-routing.module';
import { AccreHomeComponent } from './accre-home/accre-home.component';
import { AccreDashboardComponent } from './accre-dashboard/accre-dashboard.component';
import { AccreditorEditProfileComponent } from './accreditor-edit-profile/accreditor-edit-profile.component';
import { AccreSidebarComponent } from './accre-sidebar/accre-sidebar.component';
import { AccreFilesComponent } from './accre-files/accre-files.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationService } from 'src/app/_services/navigation.service';
import { ViewportService } from 'src/app/_services/viewport.service';
import { AccreParametersComponent } from './accre-parameters/accre-parameters.component';
import { AccreLevelsComponent } from './accre-levels/accre-levels.component';
import { AccreLevelComponent } from './accre-levels/accre-level/accre-level.component';
import { AccreParameterComponent } from './accre-parameters/accre-parameter/accre-parameter.component';
import { AccreAreasComponent } from './accre-areas/accre-areas.component';
import { AccreAreaComponent } from './accre-areas/accre-area/accre-area.component';
import { AccreKeywordsComponent } from './accre-keywords/accre-keywords.component';
import { AccreKeywordComponent } from './accre-keywords/accre-keyword/accre-keyword.component';
import { AccreSysimpleoutptsComponent } from './accre-sysimpleoutpts/accre-sysimpleoutpts.component';
import { AccreSysimpleoutptComponent } from './accre-sysimpleoutpts/accre-sysimpleoutpt/accre-sysimpleoutpt.component';
import { AccreSchemesComponent } from './accre-schemes/accre-schemes.component';
import { AccreSchemeComponent } from './accre-schemes/accre-scheme/accre-scheme.component';

@NgModule({
  declarations: [
    AccreHomeComponent,
    AccreDashboardComponent,
    AccreditorEditProfileComponent,
    AccreSidebarComponent,
    AccreFilesComponent,
    AccreParametersComponent,
    AccreLevelsComponent,
    AccreLevelComponent,
    AccreParameterComponent,
    AccreAreasComponent,
    AccreAreaComponent,
    AccreKeywordsComponent,
    AccreKeywordComponent,
    AccreSysimpleoutptsComponent,
    AccreSysimpleoutptComponent,
    AccreSchemesComponent,
    AccreSchemeComponent,
  ],
  imports: [
    CommonModule,
    AccreditorRoutingModule,
    SharedModule,
  ],
  providers: [NavigationService, ViewportService],

})
export class AccreditorModule { }
