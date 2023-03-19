import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model:any={};
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm= this.fb.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchvalues('password')]],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],

    })
  }

  //------Custom validation------------
  matchvalues(matchTo: string): ValidatorFn{
    return (control: AbstractControl)=>{
      return control?.value===control?.parent?.controls[matchTo].value ? null : {isMatching:true}
    }
  }

  register(){
    console.log(this.registerForm.value)
  // this.accountService.register(this.model).subscribe(response=>{
  //   console.log(response);
  //   this.cancel();
  // },error=>{
  //   console.log(error);
  //   this.toastr.error(error.error)
  // })
  }  
  cancel(){
    this.cancelRegister.emit(false)
  }

 
}
