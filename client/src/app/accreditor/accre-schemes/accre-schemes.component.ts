import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IScheme } from 'src/app/shared/models/scheme';
import { SchemeService } from 'src/app/_services/scheme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accre-schemes',
  templateUrl: './accre-schemes.component.html',
  styleUrls: ['./accre-schemes.component.css'],
})
export class AccreSchemesComponent implements OnInit {
  
  baseURL = environment.apiUrl;
  query: string = '';
  schemes: IScheme[] = [];
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private schemeService: SchemeService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['systemId'];

    this.fetchSchemeBySysImpleOutptId();
    this.schemeService.updateNeeded.subscribe(() => {
      this.fetchSchemeBySysImpleOutptId();
    });
  }

  fetchSchemeBySysImpleOutptId(): void {
    this.schemeService.getSchemesBySysImpleOutptId(this.query).subscribe({
      next: (response) => (this.schemes = response.data),
      error: (error) => this.toaster.error(error.message),
    });
  }

  toggleAddSchemeDialog() {
    this.showDialog = !this.showDialog;
  }

  
}
