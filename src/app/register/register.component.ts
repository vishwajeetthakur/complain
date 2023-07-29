import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import{ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Observable } from "rxjs";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [],
})
export class RegisterComponent {

  constructor(private builder: FormBuilder,private toastr: ToastrService,
    private service:AuthService,private router:Router){
      sessionStorage.clear();

  }

  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email:this.builder.control('',Validators.required),
    gender:this.builder.control('male'),
    file: this.builder.control(''),
    role:this.builder.control(''),

    d:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(10)])),
    
    isactive:this.builder.control(false),
  }); 

  proceedregisteration(){
    if(this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe(res =>{
         this.toastr.success('Please contact admin for enable access','Registered Successfully');
         this.router.navigate(['login']);
      });
    }else{
      this.toastr.warning('please enter valid data')
    }
  }
  func(){
    var d=new Date().getTime();
  }
}
