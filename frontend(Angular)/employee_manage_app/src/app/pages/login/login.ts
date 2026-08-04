import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj = {
    email: '', contactNo: ''
  }

  http = inject(HttpClient);  // injecting HttpClient to make HTTP requests for api calls
  router = inject(Router);  // injecting Router to navigate to different pages after successful login

  onLogin() {
    this.http.post('https://localhost:7038/api/EmployeeMaster/login', this.loginObj).subscribe({
      next: (result: any) => {
        //console.log("Result -> ", result);
        localStorage.setItem('empLoginUser', JSON.stringify(result.data));  // storing the token in local storage for future use
        this.router.navigateByUrl("/dashboard");
      },
      error: (error: any) => {
        console.log("Error -> ", error);
      }
    })
  }
}
