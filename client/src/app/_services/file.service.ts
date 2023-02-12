import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFile, IFileRoot } from '../shared/models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>(); 
  editFileShow = new Subject<IFile>();
  editFileClosed = new Subject<void>();
  moveFileShow = new Subject<IFile>();
  moveFileClosed = new Subject<void>();
  onSearch = new Subject<string>();
  onSortName = new Subject<string>();
  onSortFileName = new Subject<string>();

  constructor(private http: HttpClient) { }

  getTotalFiles(){
    return this.http.get<IFileRoot>(this.baseURL+'files').pipe(
      map(file => file.count)
    );
  }
  
  getAllFiles(){
    return this.http.get<IFileRoot>(this.baseURL+'files').pipe(
      map(file => file.data)
    );
  }

  getFileRepoById(id: string){
    return this.http.get(this.baseURL+'files/repo?fileId='+id);
  }

  getTotalFilesBySchemeId(schemeId: string){
    return this.http.get<IFileRoot>(this.baseURL+'files?schemeId='+schemeId).pipe(
      map(file  => file.count)
    );
  }

  getFilesBySchemeId(schemeId: string){
    return this.http.get<IFileRoot>(this.baseURL+'files?schemeId='+schemeId).pipe(
      map(file => file.data)
    );
  }

  createFile(body: {}){
    return this.http.post<IFile>(this.baseURL+'files', body);
  }

  removeFile(id: string){
    return this.http.delete<IFile>(this.baseURL+'files/'+id);
  }

  updateFile(id: string, body: {}){
    return this.http.put<IFile>(this.baseURL+'files/'+id, body);
  }

  deleteFileRepo(fileRepoId: string){
    return this.http.delete(this.baseURL+'files/delete-file-repo/'+fileRepoId);
  }

  searchFile(key: string){
    return this.http.get<IFileRoot>(this.baseURL+'files?search='+key);
  }

  searchFileBySchemeId(key: string, schemeId: string){
    return this.http.get<IFileRoot>(this.baseURL+'files?schemeId='+schemeId+'&search='+key);
  }

  sortName(method: string){
    if(method === 'Ascending'){
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=nameAsc');
    }else{
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=nameDesc');
    }
  }

  sortFileName(method: string){
    if(method === 'Ascending'){
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=fileNameAsc');
    }else{
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=fileNameDesc');
    }
  }

  sortNameOnSelectedScheme(method: string, schemeId: string){
    if(method === 'Ascending'){
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=nameAsc&schemeId='+schemeId);
    }else{
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=nameDesc&schemeId='+schemeId);
    }
  }

  sortFileNameOnSelectedScheme(method: string, schemeId: string){
    if(method === 'Ascending'){
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=fileNameAsc&schemeId='+schemeId);
    }else{
      return this.http.get<IFileRoot>(this.baseURL+'files?sort=fileNameDesc&schemeId='+schemeId);
    }
  }

}
