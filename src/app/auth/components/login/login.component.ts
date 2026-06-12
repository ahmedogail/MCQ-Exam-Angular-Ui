import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../sarvices/auth.service';
import { ToastrService } from 'ngx-toastr';
//import { Subscription } from 'rxjs';
//import { service} from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup
  users:any[]=[];
  type:string='students'
    constructor(private fb: FormBuilder,
       private authService: AuthService,
       private router: Router,
       private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getUsers()
    this.createForm()
  }

  createForm(){
    this.loginForm=this.fb.group({
        type:[this.type],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }
  getRole(event:any){
    this.type = event.value;
    this.getUsers()
  }
  getUsers(){
    this.authService.getUser(this.type).subscribe((res: any)=> {
      this.users = res
      console.log(this.type)
    });
  }


submit() {
  // 1. البحث عن المستخدم في القائمة التي تم جلبها من السيرفر
  let index = this.users.findIndex(item => 
    item.email === this.loginForm.value.email && 
    item.password === this.loginForm.value.password
  );

  // 2. التصحيح: إذا كان الـ index لا يساوي -1 (أي تم العثور على المستخدم)
  if (index !== -1) {
    // نجاح تسجيل الدخول
    const model = {
      username: this.users[index].username,
      role: this.type,
      userId: this.users[index].id
    }

    this.authService.login(model).subscribe(res => {
      this.authService.user.next(res);
      this.toaster.success('تم تسجيل الدخول بنجاح', "", {
        timeOut: 3000,
        closeButton: true,
      });
      this.router.navigate(['/subjects']);
    });

  } else {
    // 3. فشل تسجيل الدخول: المستخدم غير موجود أو البيانات غلط
    this.toaster.error("الإيميل أو كلمة المرور غير صحيحة", "", {
      timeOut: 3000,
      closeButton: true,
    });
  }
}

}
