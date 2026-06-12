import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/sarvices/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  
  // المتغير الأساسي المربوط بجدول الـ HTML
  dataSource: any[] = [];
  displayedColumns: string[];

  constructor(private service: AuthService) {
    // تحديد أسماء الأعمدة المتطابقة مع الـ HTML
    this.displayedColumns = ['position', 'name', 'subject', 'degree'];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.service.getUser('students').subscribe((res: any) => {
      const localArray: any[] = []; // مصفوفة مؤقتة لتجميع البيانات بأمان

      // الدوران حول كل طالب قادم من السيرفر (db.json)
      res.forEach((student: any) => {
        // التأكد من أن الطالب قد دخل امتحانات ولديه مصفوفة مواد
        if (student.subjects && student.subjects.length > 0) {
          student.subjects.forEach((subItem: any) => {
            localArray.push({
              position: student.id,
              name: student.username,
              subject: subItem.name,     // اسم المادة
              degree: subItem.degree     // درجة الطالب
            });
          });
        } else {
          // إذا كان الطالب مسجلاً جديداً ولم يختبر في أي مادة بعد
          localArray.push({
            position: student.id,
            name: student.username,
            subject: 'لم يختبر بعد',
            degree: '---'
          });
        }
      });

      // إسناد المصفوفة النظيفة والمجهزة للـ dataSource دفعة واحدة
      this.dataSource = localArray;
      console.log('جدول الطلاب جاهز ومستقر:', this.dataSource);
    });
  }
}