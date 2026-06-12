import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../sarvices/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
userForm!:FormGroup
students:any[]=[]
username:string=''
  constructor(private fd: FormBuilder,
     private authService: AuthService,
     private router: Router,
     private toaster: ToastrService) { }
  ngOnInit(): void {
   this.creatForm()
   this.getStudents()
  }
creatForm(){
this.userForm=this.fd.group({
 username:['',[Validators.required]],
 email:['',[Validators.required,Validators.email]],
 password:['',[Validators.required]],
 confirmpassword:['',[Validators.required]],
})
}
getStudents(){
  this.authService.getUser('students').subscribe((res:any)=>{
    this.students = res
  })
}
submit(){
  const model = {
   username:this.userForm.value.username,
   email:this.userForm.value.email,
   password:this.userForm.value.password,    
  }
  let index = this.students.findIndex(item => item.email == this.userForm.value.email)
  console.log(index);
  if(index !== -1){
    this.toaster.error('الايميل موجود مسبقا',"",{
      disableTimeOut:false,
      titleClass:"toaster-title",
      messageClass:"toaster-message",
      timeOut:5000,
      closeButton:true,
    })
  }else{
         this.authService.createUser(model).subscribe((res:any)=>{
    this.toaster.success('تم التسجيل بنجاح',"",{
       disableTimeOut:false,
      titleClass:"toaster-title",
      messageClass:"toaster-message",
      timeOut:5000,
      closeButton:true,
    })
    const model = {
      username: this.username,
      role: 'students',
      userId: res.id
    }

    this.authService.login(model).subscribe(res => {
      this.authService.user.next(res);
    });
    this.router.navigate(['/subjects'])
  })
  }
 
}
}
