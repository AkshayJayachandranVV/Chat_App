import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FormGroup , Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiSerivice } from '../../constraints/apiSerivice';
import { Router,RouterModule} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ButtonModule,InputTextModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
   userForm !: FormGroup
   errMessage : string = ""

    constructor(private route : Router , private apiService : ApiSerivice , private fb : FormBuilder) {}


    email : string = ""
    password : string =  ""


    ngOnInit(): void {
      this.userForm = this.fb.group({
        email : ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
  
      })
    }
  
  
  onSubmit(){
    try {
      console.log("entered")

      const formUser = this.userForm.value


      console.log(formUser)

      if(this.userForm.invalid){
        console.log("here")
        this.userForm.markAllAsTouched()
        return
      }



      this.apiService.login(formUser).subscribe(
        (response : any) => {
          console.log(response)
          if(response.success){
            console.log("success")
            this.route.navigate(['/home'])
          }
        },
        (error) => {
          console.log(error)
          this.errMessage =  error.error.message || 'Login failed';
        }
      )

    } catch (error) {
      console.log(error)
    }
  }

  

}
