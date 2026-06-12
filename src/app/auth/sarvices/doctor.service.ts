import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) { }
  createSubject(model:any){
    return this.http.post(environment.baseApi + 'subjects',model);
  }
  updateSubject(model:any , id:any){
    return this.http.put(environment.baseApi + `subjects/${id}`, model);
  }
  getAllSubjects(){
    return this.http.get(environment.baseApi + `subjects`);
  }
  getSubjects(id:any){
    return this.http.get(environment.baseApi + `subjects/${id}`)
  }
  deleteSubject(id:any){
    return this.http.delete(environment.baseApi +'subjects/'+id)
  }
  getStudent(id:number){
   return this.http.get(environment.baseApi + "students/"+id)
  }
 
   getRole(){
    return this.http.get(environment.baseApi + 'login/1')
     }
   }
