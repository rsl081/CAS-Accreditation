import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccreditorGuard } from '../_guards/accreditor.guard';
import { AccreAreasComponent } from './accre-areas/accre-areas.component';
import { AccreDashboardComponent } from './accre-dashboard/accre-dashboard.component';
import { AccreFilesComponent } from './accre-files/accre-files.component';
import { AccreHomeComponent } from './accre-home/accre-home.component';
import { AccreKeywordsComponent } from './accre-keywords/accre-keywords.component';
import { AccreLevelsComponent } from './accre-levels/accre-levels.component';
import { AccreParametersComponent } from './accre-parameters/accre-parameters.component';
import { AccreSchemesComponent } from './accre-schemes/accre-schemes.component';
import { AccreSysimpleoutptsComponent } from './accre-sysimpleoutpts/accre-sysimpleoutpts.component';
import { AccreditorEditProfileComponent } from './accreditor-edit-profile/accreditor-edit-profile.component';

const routes: Routes = [
  {
    path: 'accreditor',
    component: AccreHomeComponent,
    data: { breadcrumb: 'Accreditor' },
    canActivate: [AccreditorGuard],
    children: [
      {
        path: '',
        redirectTo: 'program',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AccreDashboardComponent,
        children: [
          {
            path: 'program',
            component: AccreLevelsComponent,
            data: { breadcrumb: 'Programs' },
            children: [
              {
                path: 'keyword',
                component: AccreKeywordsComponent,
                data: { breadcrumb: 'Keywords' },
                children: [
                  {
                    path: 'area',
                    component: AccreAreasComponent,
                    data: { breadcrumb: 'Areas' },
                    children: [
                      {
                        path: 'parameter',
                        component: AccreParametersComponent,
                        data: { breadcrumb: 'Parameters' },
                        children: [
                          {
                            path: 'systems',
                            component: AccreSysimpleoutptsComponent,
                            data: { breadcrumb: 'SIO' },
                            children:[{
                                path: 'schemes',
                                component: AccreSchemesComponent,
                                data: { breadcrumb: 'Schemes' },
                                children: [
                                  {
                                    path: 'files',
                                    component: AccreFilesComponent,
                                    data: { breadcrumb: 'Files' },
                                  },
                                ],
                            }]
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
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
