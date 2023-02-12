import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISysImpleOutpt } from 'src/app/shared/models/sysimpleoutpt';
import { SysimpleoutptService } from 'src/app/_services/sysimpleoutpt.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-sysimpleoupts',
  templateUrl: './admin-sysimpleoupts.component.html',
  styleUrls: ['./admin-sysimpleoupts.component.css'],
})
export class AdminSysimpleouptsComponent implements OnInit {
  baseURL = environment.apiUrl;
  query: string = '';
  systems: ISysImpleOutpt[] = [];
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private systemService: SysimpleoutptService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['paramId'];
    console.log('test' + this.query);
    this.fetchSystemsByParameterId();
    this.systemService.updateNeeded.subscribe(() => {
      this.fetchSystemsByParameterId();
    });
  }

  fetchSystemsByParameterId(): void {
    this.systemService.getSysImpleOutptsByParameterId(this.query).subscribe({
      next: (response) => (this.systems = response.data),
      error: (error) => this.toaster.error(error.message),
    });
  }

  toggleAddSystemDialog() {
    this.showDialog = !this.showDialog;
  }
}
