import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccreditorGuard } from '../_guards/accreditor.guard';
import { AccreAreasComponent } from './accre-areas/accre-areas.component';
import { AccreDashboardComponent } from './accre-dashboard/accre-dashboard.component';
import { AccreFilesComponent } from './accre-files/accre-files.component';
import { AccreHomeComponent } from './accre-home/accre-home.component';
import { AccreLevelsComponent } from './accre-levels/accre-levels.component';
import { AccreParametersComponent } from './accre-parameters/accre-parameters.component';
import { AccreditorEditProfileComponent } from './accreditor-edit-profile/accreditor-edit-profile.component';

const routes: Routes = [
  {
    path: 'accreditor',
    component: AccreHomeComponent,
    data: {breadcrumb: 'Accreditor'},
    canActivate: [AccreditorGuard],
    children: [
      {
        path: '',
        redirectTo: 'level',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AccreDashboardComponent,
        children: [
          {
            path: 'level',
            component: AccreLevelsComponent,
            children: [
              {
                path: 'area',
                component: AccreAreasComponent,
                data: {breadcrumb: 'Areas'},
                children: [
                  {
                    path: 'parameter',
                    component: AccreParametersComponent,
                    data: {breadcrumb: 'Parameters'},
                    children: [
                      {
                        path: 'files',
                        component: AccreFilesComponent,
                        data: {breadcrumb: 'Files'},
                      },
                    ],
                  },
                ],
              },
            ]
          }
        ],
      },
      {
        path: 'edit-profile',
        component: AccreditorEditProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccreditorRoutingModule { }
