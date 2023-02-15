import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IKeyword } from 'src/app/shared/models/keyword';
import { KeywordService } from 'src/app/_services/keyword.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accre-keywords',
  templateUrl: './accre-keywords.component.html',
  styleUrls: ['./accre-keywords.component.css'],
})
export class AccreKeywordsComponent implements OnInit {
  
  baseURL = environment.apiUrl;
  query: string = '';
  keywords: IKeyword[] = [];
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private keywordService: KeywordService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['levelId'];
    this.fetchKeywordsByLevelId();
    this.keywordService.updateNeeded.subscribe(() => {
      this.fetchKeywordsByLevelId();
    });
  }

  fetchKeywordsByLevelId(): void {
    this.keywordService.getKeywordByLevelId(this.query).subscribe({
      next: (response) => (this.keywords = response.data),
      error: (error) => this.toaster.error(error.message),
    });
  }

  toggleAddKeywordDialog() {
    this.showDialog = !this.showDialog;
  }
}
