import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IKeywordRoot } from '../shared/models/keyword';

@Injectable({
  providedIn: 'root',
})
export class KeywordService {

  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  addKeyword(body: {}) {
    return this.http.post(this.baseURL + 'keywords', body);
  }

  updateKeyword(id: string, body: {}) {
    return this.http.put(this.baseURL + 'keywords/' + id, body);
  }

  deleteKeyword(id: string) {
    return this.http.delete(this.baseURL + 'keywords/' + id);
  }

  getAllKeywords() {
    return this.http
      .get<IKeywordRoot>(this.baseURL + 'keywords')
      .pipe(map((file) => file.data));
  }

  getKeywordByLevelId(levelId: string){
    return this.http.get<IKeywordRoot>(this.baseURL+'keywords?levelId='+levelId)
  }


}
