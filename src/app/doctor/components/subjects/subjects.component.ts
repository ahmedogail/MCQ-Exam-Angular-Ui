import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/sarvices/auth.service';
import { DoctorService } from 'src/app/auth/sarvices/doctor.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  constructor(private sarvic: DoctorService , private auth:AuthService , private toaster:ToastrService) { }
subjects:any[] = [];
user:any ={}

ngOnInit(): void {
  this.getSubjects();
  this.getUserInfo();
  }
getSubjects(){
  this.sarvic.getAllSubjects().subscribe((res:any) => {
    this.subjects = res
  })
}
getUserInfo(){
  this.auth.getRole().subscribe(res=> {
    this.user = res
  })}
  deleteSubject(index:number){
    let id = this.subjects[index].id;
    this.subjects.splice(index,1);
    this.sarvic.deleteSubject(id).subscribe(res => {
      this.toaster.success('تم حذف المادة بنجاح')

    })
}

}
