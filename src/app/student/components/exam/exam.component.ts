import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/auth/sarvices/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/sarvices/auth.service';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  id:any;
  subject:any 
  user:any;
  studentInfo:any;
  examData:any;
  total:number = 0;
  showResult:boolean = false;
  usersubject:any[]=[];
  validExam:boolean = true;
  constructor(private route: ActivatedRoute , private service:DoctorService , private toaster:ToastrService , private auth:AuthService) {
    this.id = this.route.snapshot.paramMap.get('id');
   this.getsubject();
   this.getLogInUser();
  
   }


  ngOnInit(): void {
  }
  getsubject(){
    this.service.getSubjects(this.id).subscribe(res => {
      this.subject = res;
  }) }
   getLogInUser(){
     this.auth.getRole().subscribe(res=> {
      this.user = res
      this.getUserData();
    })
  }
getUserData(){
  this.auth.getStudent(this.user.userId).subscribe((res: any) => {
    this.studentInfo = res;
    this.usersubject = res?.subjects ? res?.subjects : [];
    this.checkValidExam();
  })
}
    getAnswer(event: any){
      let value = event.value,
      questionIndex = event.source.name;
      this.subject.questions[questionIndex].studentAnswer = value;
      console.log(event)
    }
     
    checkValidExam(){
      for(let x in this.usersubject){  
        if(this.usersubject[x].id == this.id){ 
          this.total = this.usersubject[x].degree
          this.validExam = false;
          this.toaster.warning('لقد قمت بأداء هذا الامتحان من قبل , النتيجة محفوظة في ملفك الشخصي');
        }
      }
    }
    removeQuestion(index: number){
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions
    }
  this.service.updateSubject(model, this.id).subscribe(res => {
    this.toaster.success('تم حذف السؤال بنجاح');
  });
 }
 getResult(){
  this.total = 0
  for(let x in this.subject.questions){
    if(this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer){
      this.total++;
    }
   }
   this.showResult = true;
   this.usersubject.push({ 
    name: this.subject.name,
     id:this.id,
     degree:this.total
    })
    const model = {
   username: this.studentInfo.username,
   email: this.studentInfo.email,
    password: this.studentInfo.password,
   subjects: this.usersubject,
    }
    this.auth.updateStudent(this.user.userId, model).subscribe(res => {
      this.toaster.success('تم حفظ النتيجة بنجاح');
 
 })
   console.log(this.total);}
}
