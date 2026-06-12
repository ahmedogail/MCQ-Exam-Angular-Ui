import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/auth/sarvices/doctor.service';
@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  name = new FormControl("");
  questionForm!:FormGroup;
  questions:any[] = []
  correctNum:any;
  id:any;
  subjectName= "";
  startAdd:boolean = false;
  preview:boolean = false;
  stepperIndex = 0;
  i=0;
  constructor(private fb:FormBuilder , private toaster:ToastrService , private doctorService: DoctorService

  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.questionForm = this.fb.group({
      question: 
      ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['' , [Validators.required]],
      correctAnswer: ['']
    });
  }
  
  createQuestion(){
    if (this.questionForm.invalid) {
      this.toaster.error('يرجى ملء جميع الحقول');
      return;
    }

    if (this.correctNum) {
      const correctAnswerKey = typeof this.correctNum === 'string' ? this.correctNum : `answer${this.correctNum}`;
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctNum]
      };
      this.questions.push(model);
      this.questionForm.reset();
      this.correctNum = null;
    } else {
      this.toaster.error('يرجى اختيار الاجابة الصحيحة');
    }
    console.log(this.questions);
  }
  start(){
    if(this.name.value == ""){
      this.toaster.error('يرجى ادخال اسم المادة');
    } else {
      this.subjectName = this.name.value;
      this.startAdd = true;
    }
    if(this.startAdd){
      this.stepperIndex = 1;
    }
  }
  deleteQuestion(index: number) {
  this.questions.splice(index, 1); // يحذف عنصر واحد من المصفوفة عند هذا الترتيب
  this.toaster.warning("تم حذف السؤال من القائمة");
}
  clearForm(){this.questionForm.reset(); // تصفير خانات السؤال والاختيارات
  this.correctNum = null;    // إلغاء تحديد الإجابة الصحيحة تماماً}
  }
  cancel(){
    this.questionForm.reset()
    this.questions = [];
    this.name.reset();
    this.stepperIndex = 0;
    this.startAdd = false;
  }
  getCorrect(event:any){
    this.correctNum = event.value;
  }
  submit(){
    const model = {
      name: this.subjectName,
      questions: this.questions,
    }

    this.doctorService.updateSubject(model, this.id).subscribe((res:any) => {
    this.preview = true;
    this.id = res.id;
    })
    if(this.preview){
      this.stepperIndex = 2;
    }
  } 
  removeQuestion(index: number){
    this.questions.splice(index, 1);
    const model = {
      name: this.subjectName,
      questions: this.questions
    };
    this.doctorService.updateSubject(model, this.id).subscribe((res:any) => {
      this.toaster.success("تم حذف السؤال من المادة بنجاح");
    });
  }
}
