import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyAreasComponent } from './faculty-areas/faculty-areas.component';
import { FacultyDashboardComponent } from './faculty-dashboard/faculty-dashboard.component';
import { FacultyEditProfileComponent } from './faculty-edit-profile/faculty-edit-profile.component';
import { FacultyFilesComponent } from './faculty-files/faculty-files.component';
import { FacultyHomeComponent } from './faculty-home/faculty-home.component';
import { FacultyParametersComponent } from './faculty-parameters/faculty-parameters.component';
import { FacultyGuard } from '../_guards/faculty.guard';
import { FacultyLevelsComponent } from './faculty-levels/faculty-levels.component';


const routes: Routes = [
  {
    path: 'faculty',
    component: FacultyHomeComponent, 
    data: {breadcrumb: 'Faculty'},
    canActivate: [FacultyGuard],
    children: [
      {
        path: '',
        redirectTo: 'level',
        pathMatch: 'full',
      },
      {
        path: '',
        component: FacultyDashboardComponent,
        children: [
          {
            path: 'level',
            component: FacultyLevelsComponent,
            data: {breadcrumb: 'Levels'},
            children: [
              {
                path: 'area',
                component: FacultyAreasComponent,
                data: {breadcrumb: 'Areas'},
                children: [
                  {
                    path: 'parameter',
                    component: FacultyParametersComponent,
                    data: {breadcrumb: 'Parameters'},
                    children: [
                      {
                        path: 'files',
                        component: FacultyFilesComponent,
                        data: {breadcrumb: 'Files'},
                      },
                    ],
                  },
                ],
              },
            ]
          },
        ],
      },
      {
        path: 'edit-profile',
        component: FacultyEditProfileComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
