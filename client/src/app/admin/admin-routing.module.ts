import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditProfileComponent } from './admin-edit-profile/admin-change-pass.component';
import { AdminCreateAccountComponent } from './admin-create-account/admin-create-account.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminSummaryGenComponent } from './admin-summary-gen/admin-summary-gen.component';
import { AdminAreasComponent } from './admin-areas/admin-areas.component';
import { AdminLevelsComponent } from './admin-levels/admin-levels.component';
import { AdminParametersComponent } from './admin-parameters/admin-parameters.component';
import { AdminFilesComponent } from './admin-files/admin-files.component';
import { AdminFacultyRegSelectAreaComponent } from './admin-faculty-reg-select-area/admin-faculty-reg-select-area.component';
import { AdminFacultyRegSummaryComponent } from './admin-faculty-reg-summary/admin-faculty-reg-summary.component';
import { AdminGuard } from '../_guards/admin.guard';
import { AdminKeywordsComponent } from './admin-keywords/admin-keywords.component';
import { AdminSysimpleouptsComponent } from './admin-sysimpleoupts/admin-sysimpleoupts.component';
import { AdminSchemesComponent } from './admin-schemes/admin-schemes.component';


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminHomeComponent,
    data: { breadcrumb: 'Admin' },
    children: [
      {
        path: '',
        redirectTo: 'level',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AdminDashboardComponent,
        children: [
          {
            path: 'level',
            component: AdminLevelsComponent,
            data: { breadcrumb: 'Programs' },
            children: [
              {
                path: 'area',
                component: AdminAreasComponent,
                data: { breadcrumb: 'Areas' },
                children: [
                  {
                    path: 'parameter',
                    component: AdminParametersComponent,
                    data: { breadcrumb: 'Parameters' },
                    children: [
                      {
                        path: 'systems',
                        component: AdminSysimpleouptsComponent,
                        data: { breadcrumb: 'SIO' },
                        children: [
                          {
                            path: 'schemes',
                            component: AdminSchemesComponent,
                            data: { breadcrumb: 'Schemes' },
                            children: [
                              {
                                path: 'files',
                                component: AdminFilesComponent,
                                data: { breadcrumb: 'Files' },
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
            // children: [
            //   {
            //     path: 'keyword',
            //     component: AdminKeywordsComponent,
            //     data: { breadcrumb: 'Keywords' },
            //   },
            // ],
          },
        ],
      },
      {
        path: 'create-account',
        component: AdminCreateAccountComponent,
        data: { breadcrumb: 'Account Registration' },
        children: [
          {
            path: 'select-area',
            component: AdminFacultyRegSelectAreaComponent,
            data: { breadcrumb: 'Select Area' },
            children: [
              {
                path: 'summary',
                component: AdminFacultyRegSummaryComponent,
                data: { breadcrumb: 'Summary' },
              },
            ],
          },
        ],
      },
      {
        path: 'summary-gen',
        component: AdminSummaryGenComponent,
      },
      {
        path: 'change-pass',
        component: AdminEditProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
