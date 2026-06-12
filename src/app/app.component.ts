import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/sarvices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service:AuthService){}
   

  ngOnInit(): void {
    this.getUserDate();
  }
  getUserDate(){
    this.service.getRole().subscribe(res=>{
      this.service.user.next(res);
    })
  }
  
}