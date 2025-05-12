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
  selector: 'app-signup',
  imports: [ButtonModule,InputTextModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
    userForm !: FormGroup
    errorMessage : string = ""

  username : string  = ""
  email : string = ""
  phone : string = ""
  password : string =  ""


  constructor( private router : Router, private fb : FormBuilder  , private apiService : ApiSerivice ){}

  
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username : ['',Validators.required],
      email : ['',[Validators.required, Validators.email]],
      phone : ['',[Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(4)]],

    })
  }



  onSubmit() {
    try {
      console.log("entered")

      if(this.userForm.invalid){
        console.log("hahah")
        this.userForm.markAllAsTouched()
        return
      }
  
      const formUser = this.userForm.value

      console.log(formUser)

      this.apiService.signup(formUser).subscribe(
        (response : any) => {
          console.log(response)
          if(response.success){
            console.log("enetered succes")
            this.router.navigate(['/'])
         }
        },
        (error) => {
          console.log(error)
           this.errorMessage = error.error.message || 'Login failed';

        }
      )
    
    } catch (error) {
       console.log(error)
    }
  }
   
}
