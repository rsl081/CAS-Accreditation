import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IParameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/_services/parameter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accre-parameters',
  templateUrl: './accre-parameters.component.html',
  styleUrls: ['./accre-parameters.component.css']
})
export class AccreParametersComponent implements OnInit {

  baseURL = environment.apiUrl;
  query: string = '';
  parameters: IParameter[] = []
  showDialog = false;

  constructor(
    private route: ActivatedRoute, 
    private parameterService: ParameterService,
    private toaster: ToastrService
  ) { }
  
  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['areaId'];
    this.fetchParametersByAreaId();
  }

  fetchParametersByAreaId(): void{
    this.parameterService.getParametersByAreaId(this.query)
    .subscribe({
      next: response => this.parameters = response.data,
      error: error => this.toaster.error(error.message)
    })
  }

}
