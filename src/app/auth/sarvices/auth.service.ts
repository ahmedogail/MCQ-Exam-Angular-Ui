import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
user:any = new Subject;
  createUser(model:any) {
    return this.http.post(environment.baseApi+'students', model);
  }

  login(model:any){
    return this.http.put(environment.baseApi+'login/1', model)
  }
  
  getUser(type:string){
    return this.http.get(environment.baseApi+type);
  }
  getRole(){
    return this.http.get(environment.baseApi+'login/1');
  }
   updateStudent(id:number , model:any){
    return this.http.put(environment.baseApi + "students/"+id , model) 
   }

getStudent(id: any) {
  return this.http.get(environment.baseApi + 'students/' + id);
}
}
