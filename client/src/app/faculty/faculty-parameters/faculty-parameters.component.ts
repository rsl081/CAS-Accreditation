import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IParameter } from 'src/app/shared/models/parameter';
import { FacultyService } from 'src/app/_services/faculty.service';
import { ParameterService } from 'src/app/_services/parameter.service';

@Component({
  selector: 'app-faculty-parameters',
  templateUrl: './faculty-parameters.component.html',
  styleUrls: ['./faculty-parameters.component.css'],
})
export class FacultyParametersComponent implements OnInit {
  
  query: string = '';
  parameters: IParameter[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private parameterService: ParameterService,
    private toaster: ToastrService,
    public facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['areaId'];
    this.fetchParametersByAreaId();
    this.parameterService.updateNeeded.subscribe(()=>{
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

}
