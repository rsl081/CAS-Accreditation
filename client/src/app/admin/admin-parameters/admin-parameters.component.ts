import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IParameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/_services/parameter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-parameters',
  templateUrl: './admin-parameters.component.html',
  styleUrls: ['./admin-parameters.component.css']
})
export class AdminParametersComponent implements OnInit {

  baseURL = environment.apiUrl;
  query: string = '';
  parameters: IParameter[] = []
  showDialog = false;

  constructor(
    private route: ActivatedRoute, 
    private parameterService: ParameterService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['areaId'];
    this.fetchParametersByAreaId();
    this.parameterService.updateNeeded.subscribe(() =>{
      this.fetchParametersByAreaId();
    });
  }

  fetchParametersByAreaId(): void{
    this.parameterService.getParametersByAreaId(this.query)
    .subscribe({
      next: response => this.parameters = response.data,
      error: error => this.toaster.error(error.message)
    })
  }

  toggleAddParameterDialog(){
    this.showDialog = !this.showDialog;
  }

}
